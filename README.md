# RPGshower

基于 React、TypeScript、Vite 和 Zod 的通用角色卡工具，用 JSON 描述跑团、小说或原创世界观中的角色。目前是支持基础编辑和 JSON 文件导入导出的前端原型。

当前应用版本：`0.2.0-alpha.1`。v0 单角色工作台已完成，当前开始实施 v1 本地角色资料库；版本实施顺序见 [版本实施计划](docs/version-plan.md)，逐步变更见 [CHANGELOG](CHANGELOG.md)。

## 当前功能

- 预览角色身份、基础档案、资源条、属性、装备和技能。
- 在“角色卡 / 档案”视图之间切换，查看背景、外貌、性格、目标、人物关系、经历和备注。
- 实时编辑姓名、称号、简介、基础档案、资源数值和属性值。
- 使用完整 JSON 编辑器修改任意角色字段，应用前会进行 JSON 语法和 Schema 校验。
- 资源值统一限制为非负数；当前值超过最大值时，表单会自动截断，JSON 会拒绝导入。
- 导入 JSON 并进行 Zod 校验；失败时显示错误，保留当前角色。
- 导出当前角色 JSON，包含档案 `archive` 和扩展区 `extensions`。
- 使用浏览器本地角色资料库保存多个角色，支持新建、复制、切换、归档、恢复和删除。
- 角色资料库自动保存到当前浏览器，刷新页面后会恢复已保存角色。

装备、技能和标签的专用表单编辑尚未实现，可通过完整 JSON 编辑器修改。档案内容当前为只读展示。角色资料库存储在当前浏览器的 `localStorage` 中，不同浏览器或设备之间不会自动同步；需要跨设备传输时请导出 JSON。

## 本地开发

使用 Node.js 22.18+ 或 24 LTS（推荐）。在项目目录执行：

```sh
npm ci
npm run dev
```

打开终端显示的本地地址。其他检查命令：

```sh
npm test
npm run lint
npm run build
```

测试使用 Node.js 内置测试运行器，覆盖数据兼容、校验、JSON 往返和文档示例。

## 角色 JSON

完整 JSON 示例见 [v0 设计文档](docs/superpowers/specs/2026-07-10-rpgshower-v0-design.md#角色数据模型)。应用默认角色位于 [sampleCharacter.ts](src/data/sampleCharacter.ts)，运行时结构以 [characterSchema.ts](src/features/character/characterSchema.ts) 为准，TypeScript 类型从 Schema 推导。

| 字段 | 内容 |
| --- | --- |
| `schemaVersion` | 当前仅接受字符串 `"0.1.0"` |
| `id` | 角色标识 |
| `profile` / `basics` | 展示信息和基础档案；头像使用 `avatarText` |
| `resources` / `attributes` | 资源和属性数组 |
| `equipment` / `skills` | 装备和技能数组 |
| `archive` | 背景、外貌、性格、目标、人物关系、经历和备注 |
| `extensions` | 自定义 JSON 对象，可包含嵌套对象、数组和 JSON 基本值 |

### 兼容规则

- 本次是 `0.1.0` 的兼容性补全，不改变版本号。旧文件可以省略 `archive` 和 `extensions`，导入时分别补齐空档案和空对象。
- `archive` 内缺省的文本补为空字符串，目标、关系和经历补为空数组；显式填写错误类型（例如 `null`）仍会报错。
- 关系条目包含 `id`、`name`、`relation`、`description`；经历条目包含 `id`、`title`、`description`，均为字符串。
- 缺少版本号或使用其他版本时拒绝导入，不尝试猜测格式。未来不兼容版本需要先实现迁移逻辑。
- 核心对象中未定义的字段会被 Zod 移除；自定义数据应放在 `extensions` 内，校验和导出会保留其 JSON 结构。
- 资源的 `current` 和 `max` 允许小数，但都不能小于 0，且 `current` 不能超过 `max`。

## 后续步骤

v0 单角色工作台已经完成，当前开始实施 v1 本地角色资料库。具体范围、进度和验收标准见 [版本实施计划](docs/version-plan.md)；世界观、规则扩展、协作和开放生态等长期方向见 [长期产品路线图](docs/long-term-roadmap.md)。

更完整的目标见 [设计文档](docs/superpowers/specs/2026-07-10-rpgshower-v0-design.md)。这是一个按小步骤推进的学习项目，设计目标不代表全部功能已经实现。
