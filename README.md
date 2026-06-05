# ChloeTest

一个简单的 Playwright + TypeScript 自动化测试框架示例，内置多语言测试项目配置。

## 目录结构

```text
.
├── playwright.config.ts        # Playwright 全局配置
├── tests/
│   ├── fixtures/test.ts        # 封装语言 fixture 和 expect
│   ├── i18n/languages.ts       # 支持的语言和翻译文案
│   ├── pages/demo.page.ts      # Page Object 示例
│   └── i18n.spec.ts            # 多语言示例用例
└── tsconfig.json
```

## 快速开始

```bash
npm install
npx playwright install
npm test
```

默认会运行 `en-US` 和 `zh-CN` 两个语言项目。测试报告会按 project 展示，例如
`chromium-en-US`、`chromium-zh-CN`。

## 常用命令

```bash
npm test                 # 运行所有配置语言
npm run test:i18n        # 明确运行 en-US 和 zh-CN
npm run test:en          # 只运行英文
npm run test:zh          # 只运行中文
npm run test:headed      # 有头模式运行
npm run test:ui          # 打开 Playwright UI
npm run report           # 查看 HTML 报告
npm run typecheck        # TypeScript 类型检查
```

也可以通过环境变量指定语言：

```bash
TEST_LANGUAGES=en-US,zh-CN npm test
TEST_LANGUAGES=zh-CN npm test
```

## 添加新语言

1. 在 `tests/i18n/languages.ts` 的 `translations` 中新增语言键和值，例如 `fr-FR`。
2. 如果希望默认运行该语言，把它加入 `defaultLanguages`。
3. 运行 `TEST_LANGUAGES=fr-FR npm test` 验证新语言。

## 连接真实站点

框架已经在 `playwright.config.ts` 中读取 `BASE_URL`：

```bash
BASE_URL=https://example.com npm test
```

后续可以把示例中的 `DemoPage.open()` 替换为真实页面导航，例如：

```ts
await page.goto("/");
```
