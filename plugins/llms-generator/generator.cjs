const fs = require('fs/promises');
const path = require('path');
const yaml = require('js-yaml');

const SITE_URL = 'https://docs.aqara.com';
const VERSION_NAME = 'Beta';
const SIDEBAR_PATH = path.join(
  'versioned_sidebars',
  `version-${VERSION_NAME}-sidebars.json`,
);
const EN_DOCS_ROOT = path.join('versioned_docs', `version-${VERSION_NAME}`);
const ZH_DOCS_ROOT = path.join(
  'i18n',
  'zh',
  'docusaurus-plugin-content-docs',
  `version-${VERSION_NAME}`,
);
const STATIC_ROOT = 'static';

const PRODUCT_CONFIG = [
  {
    sidebarKey: 'aqaraStudioSidebar',
    slug: 'aqara-studio',
    names: {en: 'Aqara Studio', zh: 'Aqara Studio'},
    description: {
      en: 'Spatial intelligence documentation for deployment, integration, automation, operation, and developer tooling.',
      zh: '面向空间智能系统的文档索引，覆盖部署、集成、自动化、运维和开发者工具。',
    },
    recommendedDocIds: [
      'aqara-studio/overview/introduction',
      'aqara-studio/overview/core-concepts',
      'aqara-studio/developer-guide',
      'aqara-studio/set-up-mcp-server',
    ],
  },
  {
    sidebarKey: 'aqaraDeveloperSidebar',
    slug: 'aqara-developer',
    names: {en: 'Aqara Developer', zh: 'Aqara Developer'},
    description: {
      en: 'Cloud API, Studio local API, and data model documentation for developers integrating with Aqara.',
      zh: '面向开发者的 Aqara 文档索引，涵盖云 API、Studio 本地 API 与数据模型规范。',
    },
    recommendedDocIds: [
      'aqara-developer/introduction',
      'aqara-developer/aiot-api/introduction',
      'aqara-developer/data-export-api/introduction',
      'aqara-developer/aqara-data-model-specification/core-concepts',
    ],
  },
  {
    sidebarKey: 'aqaraLifeSidebar',
    slug: 'aqara-life',
    names: {en: 'Aqara Life', zh: 'Aqara Life'},
    description: {
      en: 'A compact entry point for Aqara Life documentation.',
      zh: 'Aqara Life 文档的精简入口索引。',
    },
    recommendedDocIds: ['aqara-life/overview'],
  },
  {
    sidebarKey: 'aqaraOpenLinkSidebar',
    slug: 'aqara-openlink',
    names: {en: 'Aqara OpenLink', zh: 'Aqara OpenLink'},
    description: {
      en: 'Module, protocol, and onboarding documentation for OpenLink smart module integrations.',
      zh: '面向 OpenLink 智能模组集成的模块、协议与接入流程文档索引。',
    },
    recommendedDocIds: [
      'aqara-openlink/overview',
      'aqara-openlink/aqara-empowerment-communication-protocol',
    ],
  },
];

const UI_TEXT = {
  en: {
    siteTitle: 'Aqara Documentation Center',
    siteDescription:
      'A language-model-friendly index for the Aqara documentation center.',
    rootLanguageNote:
      'This index is written for English docs. For Simplified Chinese docs, use the localized root index.',
    otherLocaleRootLabel: 'Other language root index',
    productIndexes: 'Product indexes',
    startHere: 'Recommended starting points',
    allDocs: 'All sidebar-listed docs',
    noDocs: 'No eligible docs were found for this locale.',
  },
  zh: {
    siteTitle: 'Aqara 文档中心',
    siteDescription: '面向语言模型的 Aqara 文档中心索引。',
    rootLanguageNote:
      '此索引面向简体中文文档；如需英文文档，请使用英文根索引。',
    otherLocaleRootLabel: '其他语言的根索引',
    productIndexes: '产品索引',
    startHere: '推荐优先阅读',
    allDocs: '侧边栏收录的全部文档',
    noDocs: '当前语言下没有可导出的文档。',
  },
};

function toPosixPath(inputPath) {
  return inputPath.split(path.sep).join('/');
}

function stripKnownDocSuffixes(docId) {
  return docId.replace(/\.(api|tag|info)$/u, '');
}

function isMarkdownFile(filePath) {
  return filePath.endsWith('.md') || filePath.endsWith('.mdx');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, {recursive: true});
}

async function writeTextFile(outputPath, content) {
  await ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, content, 'utf8');
}

async function listMarkdownFiles(rootDir) {
  const entries = await fs.readdir(rootDir, {withFileTypes: true});
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(rootDir, entry.name);
      if (entry.isDirectory()) {
        return listMarkdownFiles(absolutePath);
      }
      return isMarkdownFile(entry.name) ? [absolutePath] : [];
    }),
  );
  return files.flat();
}

function parseFrontMatter(source) {
  if (!source.startsWith('---')) {
    return {data: {}, body: source};
  }

  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u);
  if (!match) {
    return {data: {}, body: source};
  }

  const rawYaml = match[1];
  const body = source.slice(match[0].length);

  try {
    return {data: yaml.load(rawYaml) || {}, body};
  } catch {
    return {data: {}, body};
  }
}

function extractHeading(body) {
  const match = body.match(/^\s*#\s+(.+)$/mu);
  return match ? match[1].trim() : null;
}

function cleanMarkdownBody(body) {
  return body
    .replace(/^\s*import\s.+$/gmu, '')
    .replace(/^\s*export\s.+$/gmu, '')
    .trim();
}

function createDocId(relativePath, frontMatter) {
  if (typeof frontMatter.id === 'string' && frontMatter.id.trim()) {
    const dirName = path.posix.dirname(relativePath);
    const docId = frontMatter.id.trim();
    return dirName === '.' ? docId : `${dirName}/${docId}`;
  }

  const withoutExtension = relativePath.replace(/\.(md|mdx)$/u, '');
  return stripKnownDocSuffixes(withoutExtension);
}

function createPermalink(locale, docId) {
  const localePrefix = locale === 'zh' ? '/zh' : '';
  return `${localePrefix}/docs/${docId}`;
}

function titleFromMetadata(frontMatter, body, docId) {
  if (typeof frontMatter.title === 'string' && frontMatter.title.trim()) {
    return frontMatter.title.trim();
  }

  const heading = extractHeading(body);
  if (heading) {
    return heading;
  }

  const fallback = docId.split('/').pop() || docId;
  return fallback
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function buildDocMap(rootDir, locale) {
  const files = await listMarkdownFiles(rootDir);
  const entries = await Promise.all(
    files.map(async (absolutePath) => {
      const relativePath = toPosixPath(path.relative(rootDir, absolutePath));
      const source = await fs.readFile(absolutePath, 'utf8');
      const {data, body} = parseFrontMatter(source);
      const docId = createDocId(relativePath, data);
      const permalink = createPermalink(locale, docId);
      const title = titleFromMetadata(data, body, docId);
      const cleanedBody = cleanMarkdownBody(body);

      return [
        docId,
        {
          docId,
          title,
          locale,
          permalink,
          absoluteUrl: `${SITE_URL}${permalink}`,
          frontMatter: data,
          body: cleanedBody,
        },
      ];
    }),
  );

  return new Map(entries);
}

function collectDocIdsFromSidebar(items, accumulator = []) {
  for (const item of items) {
    if (typeof item === 'string') {
      accumulator.push(item);
      continue;
    }

    if (item?.type === 'doc' && typeof item.id === 'string') {
      accumulator.push(item.id);
    }

    if (item?.link?.type === 'doc' && typeof item.link.id === 'string') {
      accumulator.push(item.link.id);
    }

    if (Array.isArray(item?.items)) {
      collectDocIdsFromSidebar(item.items, accumulator);
    }
  }

  return accumulator;
}

function dedupeOrdered(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

function buildProductDocs(sidebarItems, docMap) {
  const orderedDocIds = dedupeOrdered(collectDocIdsFromSidebar(sidebarItems));
  return orderedDocIds
    .map((docId) => docMap.get(docId))
    .filter(Boolean);
}

function productLlmsPath(locale, slug) {
  return locale === 'zh' ? `/zh/${slug}/llms.txt` : `/${slug}/llms.txt`;
}

function rootLlmsPath(locale) {
  return locale === 'zh' ? '/zh/llms.txt' : '/llms.txt';
}

function formatDocLine(doc) {
  return `- ${doc.title}: ${doc.absoluteUrl}`;
}

function renderProductIndex(product, docs, locale) {
  const text = UI_TEXT[locale];
  const recommendedDocs = product.recommendedDocIds
    .map((docId) => docs.find((doc) => doc.docId === docId))
    .filter(Boolean);

  const lines = [
    `# ${product.names[locale]}`,
    `> ${product.description[locale]}`,
    '',
    `## ${text.startHere}`,
  ];

  if (recommendedDocs.length > 0) {
    lines.push(...recommendedDocs.map((doc) => formatDocLine(doc)));
  } else {
    lines.push(`- ${text.noDocs}`);
  }

  lines.push('', `## ${text.allDocs}`);

  if (docs.length > 0) {
    lines.push(...docs.map((doc) => formatDocLine(doc)));
  } else {
    lines.push(`- ${text.noDocs}`);
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

function renderRootIndex(products, locale) {
  const text = UI_TEXT[locale];
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const lines = [
    `# ${text.siteTitle}`,
    `> ${text.siteDescription}`,
    '',
    text.rootLanguageNote,
    '',
    `- ${text.otherLocaleRootLabel}: ${SITE_URL}${rootLlmsPath(otherLocale)}`,
    '',
    `## ${text.productIndexes}`,
  ];

  for (const product of products) {
    lines.push(
      `- ${product.names[locale]}: ${SITE_URL}${productLlmsPath(
        locale,
        product.slug,
      )}`,
    );
  }

  const recommended = products
    .flatMap((product) => product.docs.slice(0, 2))
    .slice(0, 6);

  lines.push('', `## ${text.startHere}`);

  if (recommended.length > 0) {
    lines.push(...recommended.map((doc) => formatDocLine(doc)));
  } else {
    lines.push(`- ${text.noDocs}`);
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

async function cleanupGeneratedArtifacts(siteDir) {
  const legacyExportDir = path.join(siteDir, STATIC_ROOT, 'llms-pages');
  await fs.rm(legacyExportDir, {recursive: true, force: true});
  await fs.rm(path.join(siteDir, STATIC_ROOT, 'llms-manifest.json'), {
    force: true,
  });
  await fs.rm(path.join(siteDir, STATIC_ROOT, 'zh', 'llms-manifest.json'), {
    force: true,
  });
}

async function generateLlmsArtifacts(siteDir) {
  const sidebarSource = await fs.readFile(path.join(siteDir, SIDEBAR_PATH), 'utf8');
  const sidebars = JSON.parse(sidebarSource);
  const [enDocMap, zhDocMap] = await Promise.all([
    buildDocMap(path.join(siteDir, EN_DOCS_ROOT), 'en'),
    buildDocMap(path.join(siteDir, ZH_DOCS_ROOT), 'zh'),
  ]);

  await cleanupGeneratedArtifacts(siteDir);

  const localizedProducts = {en: [], zh: []};

  for (const locale of ['en', 'zh']) {
    const docMap = locale === 'zh' ? zhDocMap : enDocMap;

    for (const product of PRODUCT_CONFIG) {
      const docs = buildProductDocs(sidebars[product.sidebarKey] || [], docMap);
      const productRecord = {...product, docs};
      localizedProducts[locale].push(productRecord);

      const outputPath = path.join(
        siteDir,
        STATIC_ROOT,
        productLlmsPath(locale, product.slug).replace(/^\//u, ''),
      );
      await writeTextFile(outputPath, renderProductIndex(productRecord, docs, locale));
    }

    const rootOutputPath = path.join(
      siteDir,
      STATIC_ROOT,
      rootLlmsPath(locale).replace(/^\//u, ''),
    );
    await writeTextFile(rootOutputPath, renderRootIndex(localizedProducts[locale], locale));
  }
}

module.exports = {
  generateLlmsArtifacts,
  PRODUCT_CONFIG,
  productLlmsPath,
  rootLlmsPath,
};
