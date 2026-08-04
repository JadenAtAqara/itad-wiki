# llms.txt Maintenance Guide

本文档说明本项目中 `llms.txt` 的创建方式、配置入口、生成逻辑与后续维护方法。

## Overview

本项目中的 `llms.txt` 不是手写维护的，而是由生成器自动产出。

当前会生成以下几类文件：

- 站点级英文索引：`/llms.txt`
- 站点级中文索引：`/zh/llms.txt`
- 产品级英文索引：`/{product}/llms.txt`
- 产品级中文索引：`/zh/{product}/llms.txt`

当前已支持的产品包括：

- `aqara-studio`
- `aqara-developer`
- `aqara-life`
- `aqara-openlink`

## Source Of Truth

`llms.txt` 的内容来自以下几个位置：

1. 文档侧边栏结构：
   `versioned_sidebars/version-Beta-sidebars.json`

2. 英文文档源文件：
   `versioned_docs/version-Beta`

3. 中文文档源文件：
   `i18n/zh/docusaurus-plugin-content-docs/version-Beta`

4. 产品级补充配置：
   `plugins/llms-generator/generator.cjs`

其中最重要的一条原则是：

**只有出现在 `versioned_sidebars/version-Beta-sidebars.json` 中的文档，才会进入生成后的 `llms.txt`。**

## Generator Files

与 `llms.txt` 相关的核心实现文件如下：

- 生成逻辑：
  `plugins/llms-generator/generator.cjs`

- Docusaurus 插件入口：
  `plugins/llms-generator/index.cjs`

- 插件注册位置：
  `docusaurus.config.ts`

### generator.cjs 负责什么

`plugins/llms-generator/generator.cjs` 负责：

- 扫描英文和中文文档源目录
- 解析 Markdown / MDX front matter
- 从 sidebar 中筛选允许进入 `llms.txt` 的文档
- 生成站点级和产品级的中英文 `llms.txt`
- 输出到 `static/` 和 `static/zh/`

### index.cjs 负责什么

`plugins/llms-generator/index.cjs` 负责：

- 在 Docusaurus 构建开始时调用生成器
- 在中文构建产物输出后，将中文 `llms.txt` 正确复制到 `build/zh/...`

这一步很重要，因为 Docusaurus 的 i18n 构建会让静态文件路径表现得和源码目录不完全一致。

## How llms.txt Is Generated

生成流程如下：

1. 读取 `versioned_sidebars/version-Beta-sidebars.json`
2. 提取每个产品 sidebar 中出现的 doc id
3. 扫描英文与中文文档目录
4. 根据 doc id 匹配实际文档标题和链接
5. 生成：
   - `static/llms.txt`
   - `static/zh/llms.txt`
   - `static/{product}/llms.txt`
   - `static/zh/{product}/llms.txt`
6. 构建后再将中文版本覆盖到最终 `build/zh/...`

## How To Update Existing llms.txt

如果你只是更新现有产品文档，通常不需要手改任何 `llms.txt` 文件。

### 场景 1：只是改文档内容

例如修改：

- 标题
- 描述
- 页面内容
- 文档链接路径

你只需要改对应的 `.md` 或 `.mdx` 文件，然后重新构建：

```bash
npm run build
```

### 场景 2：要让某篇文档进入或移出 llms.txt

你需要修改：

`versioned_sidebars/version-Beta-sidebars.json`

因为生成器只收录 sidebar 中出现过的页面。

改完之后重新构建：

```bash
npm run build
```

### 场景 3：要调整“推荐优先阅读”

你需要修改：

`plugins/llms-generator/generator.cjs`

中的 `PRODUCT_CONFIG`，例如：

- `recommendedDocIds`
- `description.en`
- `description.zh`
- `names.en`
- `names.zh`

改完后重新构建：

```bash
npm run build
```

## Manual Regeneration Without Full Build

如果只想重生成 `static` 下的 `llms.txt`，不跑完整站点构建，可以执行：

```bash
node -e "require('./plugins/llms-generator/generator.cjs').generateLlmsArtifacts(process.cwd())"
```

这适合在你只想检查生成结果时使用。

注意：

- 这一步只会更新 `static/...`
- 不会自动生成最终 `build/...`
- 如果你要验证最终站点输出，仍然应执行 `npm run build`

## How To Add A New Product From Scratch

如果未来需要新增一套产品文档，并自动生成对应的 `llms.txt`，建议按下面步骤执行。

### Step 1: Add docs

新增英文文档到：

`versioned_docs/version-Beta/{new-product}`

新增中文文档到：

`i18n/zh/docusaurus-plugin-content-docs/version-Beta/{new-product}`

### Step 2: Add the product sidebar

在：

`versioned_sidebars/version-Beta-sidebars.json`

里新增一组 sidebar，例如：

```json
"aqaraNewProductSidebar": [
  "aqara-new-product/introduction"
]
```

如果页面没有进入这份 sidebar，它就不会进入生成后的 `llms.txt`。

### Step 3: Register the product in PRODUCT_CONFIG

在：

`plugins/llms-generator/generator.cjs`

的 `PRODUCT_CONFIG` 中新增一项，例如：

```js
{
  sidebarKey: 'aqaraNewProductSidebar',
  slug: 'aqara-new-product',
  names: {en: 'Aqara New Product', zh: 'Aqara 新产品'},
  description: {
    en: 'Documentation index for Aqara New Product.',
    zh: 'Aqara 新产品文档索引。',
  },
  recommendedDocIds: [
    'aqara-new-product/introduction',
  ],
}
```

字段说明：

- `sidebarKey`：对应 sidebar JSON 中的 key
- `slug`：最终生成路径中的产品段名
- `names`：`llms.txt` 展示名称
- `description`：`llms.txt` 顶部简述
- `recommendedDocIds`：推荐优先阅读的页面

### Step 4: Update post-build copy list

在：

`plugins/llms-generator/index.cjs`

中的 `filesToCopy` 数组里新增新产品：

```js
path.join('aqara-new-product', 'llms.txt')
```

这一步不能省略。

否则中文构建产物下的：

`build/zh/aqara-new-product/llms.txt`

不会被正确覆盖。

### Step 5: Build

执行：

```bash
npm run build
```

### Step 6: Verify

重点检查以下文件：

- `build/aqara-new-product/llms.txt`
- `build/zh/aqara-new-product/llms.txt`

并确认：

- 英文版内容为英文
- 中文版内容为中文
- 页面链接是否正确
- 推荐文档是否正确

## Current Output Paths

当前建议以以下路径为准：

### English

- `build/llms.txt`
- `build/aqara-studio/llms.txt`
- `build/aqara-developer/llms.txt`
- `build/aqara-life/llms.txt`
- `build/aqara-openlink/llms.txt`

### Chinese

- `build/zh/llms.txt`
- `build/zh/aqara-studio/llms.txt`
- `build/zh/aqara-developer/llms.txt`
- `build/zh/aqara-life/llms.txt`
- `build/zh/aqara-openlink/llms.txt`

## Rules And Constraints

当前项目内 `llms.txt` 的维护规则如下：

- 不手写维护最终产物，统一通过生成器生成
- 不在 `llms.txt` 中收录 sidebar 未出现的页面
- 中英文分别从各自文档源目录生成
- 新增产品时，除了 `PRODUCT_CONFIG`，还必须同步更新 `filesToCopy`
- 产品级 `llms.txt` 当前不再包含 `Site root index` / `站点根索引`

## Recommended Workflow

日常维护建议采用下面的工作流：

1. 更新文档内容
2. 更新 `version-Beta-sidebars.json`（如有必要）
3. 更新 `PRODUCT_CONFIG`（如有必要）
4. 运行 `npm run build`
5. 检查 `build/.../llms.txt`

## Troubleshooting

### 中文 llms.txt 看起来还是英文

优先检查：

- `build/zh/{product}/llms.txt` 是否已经是中文
- `plugins/llms-generator/index.cjs` 中 `filesToCopy` 是否包含该产品
- 中文源文档是否存在于 `i18n/zh/...`

### 某篇文档没有进入 llms.txt

优先检查：

- 这篇文档是否出现在 `versioned_sidebars/version-Beta-sidebars.json`
- doc id 是否和 sidebar 中引用一致

### 推荐优先阅读不对

优先检查：

- `plugins/llms-generator/generator.cjs` 中 `recommendedDocIds`

## Suggested Future Improvement

如果后续产品数量继续增加，建议进一步把：

- `PRODUCT_CONFIG`
- `filesToCopy`

统一抽到同一个共享配置源，避免新增产品时需要改两个文件。
