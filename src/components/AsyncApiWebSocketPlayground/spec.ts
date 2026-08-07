import specEn from "./spec.en.generated";
import specZh from "./spec.zh.generated";
import type { PlaygroundSpec } from "./types";

export type {
  JsonSchema,
  MessageDefinition,
  MessageExample,
  OperationGroup,
  PlaygroundServer,
  PlaygroundSpec,
} from "./types";

export function getPlaygroundSpec(locale?: string): PlaygroundSpec {
  return locale === "zh" ? specZh : specEn;
}
