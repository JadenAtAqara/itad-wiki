import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

const rootDir = process.cwd();

const inputFiles = [
  {
    locale: "zh",
    input: path.join(
      rootDir,
      "asyncapi/data-export-api/zh/asyncapi-AqaraLife-websocket.yaml"
    ),
    output: path.join(
      rootDir,
      "src/components/AsyncApiWebSocketPlayground/spec.zh.generated.ts"
    ),
  },
  {
    locale: "en",
    input: path.join(
      rootDir,
      "asyncapi/data-export-api/en/asyncapi-AqaraLife-websocket.yaml"
    ),
    output: path.join(
      rootDir,
      "src/components/AsyncApiWebSocketPlayground/spec.en.generated.ts"
    ),
  },
];

const serverLabels = {
  zh: {
    remoteAccess: "远程访问",
    local: "局域网 / 本地",
  },
  en: {
    remoteAccess: "Remote Access",
    local: "Local / LAN",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeInto(target, source) {
  for (const [key, value] of Object.entries(source ?? {})) {
    if (key === "required") {
      target.required = Array.from(
        new Set([...(target.required ?? []), ...value])
      );
    } else if (key === "properties") {
      target.properties = { ...(target.properties ?? {}) };
      for (const [propertyKey, propertyValue] of Object.entries(value)) {
        target.properties[propertyKey] = propertyValue;
      }
    } else if (Array.isArray(value)) {
      target[key] = value;
    } else if (
      value &&
      typeof value === "object" &&
      !("$ref" in value) &&
      !(
        "type" in value &&
        Object.keys(value).length <= 4 &&
        !("properties" in value) &&
        !("items" in value)
      )
    ) {
      target[key] = { ...(target[key] ?? {}), ...value };
    } else {
      target[key] = value;
    }
  }
}

function createResolver(document) {
  function dereference(ref) {
    return ref
      .slice(2)
      .split("/")
      .reduce((current, key) => current[key], document);
  }

  function getConditionalPropertyVariants(parts) {
    const variantsByProperty = new Map();
    const conditionalParts = new Set();

    for (const part of parts) {
      const conditionProperties = part?.if?.properties;
      const thenProperties = part?.then?.properties;

      if (!conditionProperties || !thenProperties) {
        continue;
      }

      const selectors = Object.values(conditionProperties).filter(
        (property) => Array.isArray(property?.enum) && property.enum.length > 0
      );

      if (selectors.length !== 1) {
        continue;
      }

      conditionalParts.add(part);

      for (const [propertyName, propertySchema] of Object.entries(
        thenProperties
      )) {
        const variants = variantsByProperty.get(propertyName) ?? [];

        for (const selectorValue of selectors[0].enum) {
          variants.push({
            title: String(selectorValue),
            schema: propertySchema,
          });
        }

        variantsByProperty.set(propertyName, variants);
      }
    }

    return { conditionalParts, variantsByProperty };
  }

  function resolve(schema, seen = new Set()) {
    if (!schema || typeof schema !== "object") {
      return schema;
    }

    if (schema.$ref) {
      if (seen.has(schema.$ref)) {
        return { $ref: schema.$ref };
      }
      seen.add(schema.$ref);
      return resolve(clone(dereference(schema.$ref)), seen);
    }

    if (schema.allOf) {
      const { conditionalParts, variantsByProperty } =
        getConditionalPropertyVariants(schema.allOf);
      const schemaWithoutAllOf = clone(schema);
      delete schemaWithoutAllOf.allOf;
      const parts = [
        resolve(schemaWithoutAllOf, new Set(seen)),
        ...schema.allOf
          .filter((part) => !conditionalParts.has(part))
          .map((part) => resolve(part, new Set(seen))),
      ];
      const merged = {};
      for (const part of parts) {
        mergeInto(merged, part);
      }

      for (const [propertyName, variants] of variantsByProperty) {
        merged.properties = { ...(merged.properties ?? {}) };
        merged.properties[propertyName] = {
          ...(merged.properties[propertyName] ?? {}),
          oneOf: variants.map(({ title, schema: variantSchema }) => ({
            ...resolve(variantSchema, new Set(seen)),
            title,
          })),
        };
      }

      return merged;
    }

    if (Array.isArray(schema)) {
      return schema.map((item) => resolve(item, new Set(seen)));
    }

    const output = {};
    for (const [key, value] of Object.entries(schema)) {
      output[key] = resolve(value, new Set(seen));
    }

    return output;
  }

  return resolve;
}

function createSpec(document, locale) {
  const resolve = createResolver(document);
  const localeServerLabels = serverLabels[locale] ?? serverLabels.en;

  return {
    title: document.info.title,
    version: document.info.version,
    description: document.info.description,
    servers: Object.entries(document.servers).map(([id, server]) => ({
      id,
      label: localeServerLabels[id] ?? id,
      description: server.description,
      protocol: server.protocol,
      hostDefault:
        server.variables?.host?.default ??
        server.host?.replace("{host}", "").replace("{port}", "") ??
        "",
      pathname: server.pathname,
    })),
    operations: Object.entries(document.operations).map(([id, operation]) => ({
      id,
      action: operation.action,
      messages: (operation.messages ?? []).map((message) =>
        message.$ref.split("/").pop()
      ),
    })),
    messages: Object.fromEntries(
      Object.entries(document.components.messages).map(([name, message]) => [
        name,
        {
          name: message.name,
          title: message.title,
          summary: message.summary,
          description: message.description,
          examples: message.examples ?? [],
          payloadSchema: resolve(message.payload),
        },
      ])
    ),
  };
}

function toModuleSource(variableName, spec) {
  return `/* eslint-disable */\n// This file is autogenerated by scripts/generate-asyncapi-playground-specs.mjs\nimport type { PlaygroundSpec } from "./types";\n\nconst ${variableName} = ${JSON.stringify(
    spec,
    null,
    2
  )} satisfies PlaygroundSpec;\n\nexport default ${variableName};\n`;
}

for (const file of inputFiles) {
  const document = yaml.load(fs.readFileSync(file.input, "utf8"));
  const spec = createSpec(document, file.locale);
  const variableName =
    file.locale === "zh"
      ? "aqaraLifeWebSocketSpecZh"
      : "aqaraLifeWebSocketSpecEn";
  fs.writeFileSync(file.output, toModuleSource(variableName, spec));
  console.log(`Generated ${path.relative(rootDir, file.output)}`);
}
