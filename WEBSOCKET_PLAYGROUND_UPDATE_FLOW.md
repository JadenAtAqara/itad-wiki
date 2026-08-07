# WebSocket Playground 更新流程

本文说明：当您更新以下 AsyncAPI YAML 文件后，如何同步更新 WebSocket Playground 相关页面内容。

- 中文源文件：`asyncapi/data-export-api/zh/asyncapi-AqaraLife-websocket.yaml`
- 英文源文件：`asyncapi/data-export-api/en/asyncapi-AqaraLife-websocket.yaml`

## 整体关系

- YAML 文件是 WebSocket Playground 的源数据。
- `npm run gen-asyncapi-playground-specs` 会根据 YAML 自动生成前端使用的数据文件。
- WebSocket Playground 页面本身读取生成后的数据文件，而不是手工维护的消息描述。

## 对应页面

- 中文页面：`i18n/zh/docusaurus-plugin-content-docs/version-Beta/aqara-developer/data-export-api/websocket-api/index.mdx`
  - 基于中文 YAML：`asyncapi/data-export-api/zh/asyncapi-AqaraLife-websocket.yaml`

- 英文页面：`versioned_docs/version-Beta/aqara-developer/data-export-api/websocket-api/index.mdx`
  - 基于英文 YAML：`asyncapi/data-export-api/en/asyncapi-AqaraLife-websocket.yaml`

## 更新步骤

1. 修改中文 YAML 文件。

```bash
asyncapi/data-export-api/zh/asyncapi-AqaraLife-websocket.yaml
```

2. 修改英文 YAML 文件。

```bash
asyncapi/data-export-api/en/asyncapi-AqaraLife-websocket.yaml
```

3. 运行生成脚本，重建 WebSocket Playground 所需的数据文件。

```bash
npm run gen-asyncapi-playground-specs
```

4. 如需本地预览页面，启动开发环境。

```bash
npm run start
```

5. 如需做完整校验，执行生产构建。

```bash
npm run build
```

## 生成结果

执行 `npm run gen-asyncapi-playground-specs` 后，会自动更新以下文件：

- `src/components/AsyncApiWebSocketPlayground/spec.zh.generated.ts`
- `src/components/AsyncApiWebSocketPlayground/spec.en.generated.ts`

这两个文件会被 WebSocket Playground 组件直接读取。

## 自动同步的内容

只要这些内容写在 YAML 里，运行生成脚本后就会自动同步到页面：

- 顶部接口描述
- Server 默认值与说明
- 可发送 message 列表
- 可接收 message 列表
- Message 标题、摘要、描述
- Example 示例
- Payload schema
- 参数说明文字
- `required`
- `nullable`
- `enum`

## 只改 YAML 就够的场景

以下场景通常不需要改前端组件代码：

- 新增 message
- 删除 message
- 修改 message 描述
- 新增参数
- 删除参数
- 修改参数说明
- 修改 schema 结构
- 修改 example 示例

## 仍需要改代码的场景

以下场景通常不只是改 YAML，还需要改 Playground 组件代码：

- 修改页面布局
- 修改步骤划分
- 修改按钮交互
- 修改自动鉴权逻辑
- 修改自动 ping 保活逻辑
- 为某类 message 增加特殊表单或特殊交互

## 推荐执行方式

每次修改完 YAML 后，至少执行以下命令：

```bash
npm run gen-asyncapi-playground-specs
npm run build
```

这样可以确保：

- 中文和英文 Playground 数据已同步更新
- 页面可以正常编译
- 没有因为 schema 变化导致渲染异常

## 备注

当前 WebSocket Playground 已切换为“按语言分别读取各自 YAML 生成结果”的模式：

- 中文页面读取中文生成结果
- 英文页面读取英文生成结果

因此后续维护时，应优先修改 YAML，再运行生成脚本，而不是直接手改生成文件。
