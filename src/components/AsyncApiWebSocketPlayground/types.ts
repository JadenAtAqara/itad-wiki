export type JsonSchema = {
  type?: string | string[];
  description?: string;
  summary?: string;
  enum?: Array<string | number | null>;
  default?: unknown;
  format?: string;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  required?: string[];
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  additionalProperties?: boolean | JsonSchema;
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  [key: string]: unknown;
};

export type MessageExample = {
  name: string;
  payload: unknown;
};

export type MessageDefinition = {
  name?: string;
  title: string;
  summary?: string;
  description?: string;
  examples: MessageExample[];
  payloadSchema: JsonSchema;
};

export type PlaygroundServer = {
  id: string;
  label: string;
  description: string;
  protocol: "ws" | "wss";
  hostDefault: string;
  pathname: string;
};

export type OperationGroup = {
  id: string;
  action: "send" | "receive";
  messages: string[];
};

export type PlaygroundSpec = {
  title: string;
  version: string;
  description: string;
  servers: PlaygroundServer[];
  operations: OperationGroup[];
  messages: Record<string, MessageDefinition>;
};
