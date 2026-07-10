# RPGshower v0 设计文档

日期：2026-07-10

## 目标

RPGshower v0 是一个规则无关的角色展示与编辑原型，可用于跑团、小说创作、原创世界观设定和一般角色设计。第一版采用 JSON 优先的工作流：角色由一份 JSON 文件描述，应用把它渲染成清晰的 Web 角色卡；用户可以通过基础表单编辑常用字段，也可以通过 JSON 编辑器编辑完整数据；最后可以把当前角色导出为 JSON。

这个项目同时是一个学习项目。开发必须按小步骤推进，每一步都能运行、能看到结果，并解释相关的 Web/React 概念。

## 第一版范围

第一版包含：

- 导入角色 JSON 文件。
- 展示角色卡主页：头像、基础信息、资源条、属性、装备、技能。
- 展示档案子页面：背景、外貌、性格、目标、人物关系、经历、备注。
- 通过基础表单编辑常用字段。
- 通过 JSON 编辑器编辑完整角色数据。
- 导出当前角色为 JSON 文件。

第一版不包含：

- 用户登录。
- 后端数据库。
- 多人协作。
- 具体规则系统的自动计算，例如战斗、骰点、派生属性。
- AI 生成角色。
- 图片上传和媒体管理系统。

## 技术方案

使用 Vite 构建一个 React + TypeScript 单页应用。

第一阶段使用：

- Vite：创建项目、启动本地开发服务器、生产打包。
- React：构建界面组件。
- TypeScript：定义角色数据类型，减少代码错误。

后续在需要对应功能时再引入：

- React Router：让 `/`、`/archive` 等 URL 对应不同页面。
- Zod：在运行时校验导入的 JSON。
- React Hook Form：表单复杂后用于管理基础编辑表单。
- CodeMirror：实现完整 JSON 编辑器。
- Tailwind CSS：快速构建清晰、可维护的界面样式。
- lucide-react：提供导入、导出、编辑、切换等图标。

第一版不使用 Next.js、Redux、Zustand、认证系统或后端服务。等核心角色展示流程验证后，再决定是否接数据库和账号系统。

## 学习式开发方式

开发时不一次性完成全部功能。每一步都包含：

- 本步目标。
- 要学习的概念。
- 最小代码改动。
- 可运行结果。
- 简短复盘。

初始实施顺序：

1. 创建 Vite React TypeScript 项目。
2. 清理默认模板，创建 RPGshower 应用外壳。
3. 编写静态角色卡。
4. 把写死的角色内容移动到示例数据对象。
5. 添加 TypeScript 角色数据类型。
6. 拆分角色卡组件。
7. 添加当前角色的 React state。
8. 添加基础字段编辑表单。
9. 添加“角色卡 / 档案”视图切换。
10. 添加 JSON 导出。
11. 添加 JSON 导入。
12. 添加 Zod 校验。
13. 添加 JSON 编辑器。
14. 整理为按功能划分的项目结构。

## 角色数据模型

角色 JSON 采用“固定核心字段 + 灵活数组 + 扩展区”的结构。这样既能展示通用角色卡，又不会绑定某个具体跑团规则。

示例结构：

```json
{
  "schemaVersion": "0.1.0",
  "id": "example-character",
  "profile": {
    "name": "艾琳",
    "title": "流浪法师",
    "avatarUrl": "",
    "summary": "一位寻找失落星图的年轻法师。",
    "tags": ["法师", "旅行者", "星象"]
  },
  "basics": {
    "species": "人类",
    "className": "法师",
    "level": "5",
    "origin": "北境",
    "alignment": "中立善良"
  },
  "resources": [
    {
      "id": "hp",
      "label": "生命",
      "current": 32,
      "max": 45,
      "color": "red"
    },
    {
      "id": "mp",
      "label": "法力",
      "current": 18,
      "max": 30,
      "color": "blue"
    }
  ],
  "attributes": [
    {
      "id": "strength",
      "label": "力量",
      "value": 8
    },
    {
      "id": "intelligence",
      "label": "智力",
      "value": 17
    }
  ],
  "equipment": [
    {
      "id": "staff",
      "name": "星纹法杖",
      "type": "武器",
      "description": "镶嵌着微光星石的长杖。",
      "equipped": true,
      "tags": ["法器"]
    }
  ],
  "skills": [
    {
      "id": "starfire",
      "name": "星火术",
      "level": "熟练",
      "cost": "3 法力",
      "description": "召唤一束星火攻击目标。",
      "tags": ["法术", "攻击"]
    }
  ],
  "archive": {
    "background": "出生于北境边城，自幼对星象敏感。",
    "appearance": "银灰色长发，常披深蓝斗篷。",
    "personality": "冷静、好奇，但不轻易信任他人。",
    "goals": ["寻找失落星图", "查明导师失踪的真相"],
    "relationships": [
      {
        "id": "mentor",
        "name": "塞拉斯",
        "relation": "导师",
        "description": "失踪的星象学者。"
      }
    ],
    "timeline": [
      {
        "id": "event-1",
        "title": "离开北境",
        "description": "踏上寻找导师的旅程。"
      }
    ],
    "notes": "可补充作者或主持人备注。"
  },
  "extensions": {}
}
```

设计规则：

- `resources` 使用数组，用于支持生命、法力、体力、理智、护盾、灵感或任意自定义资源。
- `attributes` 使用数组，用于支持不同规则系统或原创属性体系。
- `equipment` 和 `skills` 在 v0 中只做描述展示，不做规则计算。
- `archive` 服务档案子页面，承载叙事资料。
- `extensions` 预留给未来的规则系统扩展。
- `schemaVersion` 必须保留，方便未来升级 JSON 格式。

## 目标项目结构

v0 功能逐步完成后，项目目标结构如下：

```text
src/
  app/
    App.tsx
    routes.tsx
  data/
    sampleCharacter.ts
  features/
    character/
      characterSchema.ts
      characterTypes.ts
      characterStore.ts
      importExport.ts
      components/
        CharacterLayout.tsx
        CharacterHeader.tsx
        ResourceBar.tsx
        AttributeGrid.tsx
        EquipmentList.tsx
        SkillList.tsx
        ArchivePage.tsx
        BasicInfoForm.tsx
        JsonEditorPanel.tsx
  shared/
    components/
      Button.tsx
      Tabs.tsx
      EmptyState.tsx
    utils/
      cn.ts
  styles/
    globals.css
```

这个结构是目标，不是第一步就要全部创建。项目会从 Vite 的最小结构开始，随着功能增加逐渐长成这个样子。

目录职责：

- `app`：应用级组合，例如根组件和路由配置。
- `data`：示例数据或静态数据。
- `features/character`：所有角色相关的类型、校验、导入导出、状态辅助逻辑和界面组件。
- `shared`：不绑定角色功能的通用组件和工具函数。
- `styles`：全局样式。

## 界面设计

RPGshower 打开后直接进入工作台，不做营销首页。

桌面端布局：

- 顶部工具栏：产品名、导入 JSON、导出 JSON、视图切换。
- 左侧：编辑区。
- 右侧：实时预览区。

移动端布局：

- 顶部工具栏。
- 预览区。
- 编辑区。

角色卡主页包含：

- 头像、姓名、称号、简介、标签。
- 基础信息。
- 资源条，例如生命、法力、体力。
- 属性网格。
- 装备列表。
- 技能列表。

档案子页面包含：

- 背景。
- 外貌。
- 性格。
- 目标。
- 人物关系。
- 时间线/经历。
- 备注。

视觉风格应像一个实用的创作和跑团工具：清晰、精致、信息密度适中。可以有克制的幻想感，但按钮、表单和导航应保持熟悉、直接、易用。

## 数据流

v0 数据流：

```text
示例 JSON 或导入 JSON
  -> 解析
  -> 校验
  -> 存为当前 React state
  -> 渲染角色卡或档案页
  -> 通过表单或 JSON 编辑器更新
  -> 更新 React state
  -> 重新渲染预览
  -> 导出 JSON
```

应用的核心状态是当前角色对象。

展示组件不关心数据来自示例数据、JSON 文件还是未来数据库。它们只接收类型明确的 props 并负责渲染。

未来接后端时可以复用同样的界面边界：

```text
数据库/API
  -> 角色对象
  -> React state
  -> 现有展示组件
```

## 路由

路由用于把 URL 地址映射到页面。v0 一开始先用本地状态做“角色卡 / 档案”切换，帮助学习组件、props、state 和条件渲染。

理解这些概念后，再引入 React Router：

```text
/        -> 角色卡主页
/archive -> 角色档案页
```

未来可扩展为：

```text
/characters/:id
/characters/:id/archive
/characters/:id/editor
```

## 错误处理

应用遇到以下情况时不能崩溃：

- 选择的文件不是合法 JSON。
- JSON 语法合法，但不符合角色数据结构。
- 资源字段出现非法值，例如 `current` 或 `max` 不是数字。
- JSON 编辑器中存在非法 JSON。

错误提示应显示在导入区或编辑区附近。导入或编辑失败时，不能破坏最后一份合法角色数据。

## 测试和验证

早期学习步骤可以通过浏览器手动验证。

随着功能增加，需要加入：

- TypeScript 类型检查。
- 生产构建检查。
- 浏览器手动测试：角色卡、档案页、表单编辑、JSON 导入、JSON 导出、校验错误。
- 针对导入导出和 schema 校验的单元测试。

## 后续扩展

设计应允许未来扩展，而不需要重写核心角色展示器：

- 后端数据库和用户账号。
- 角色库与搜索。
- 公开分享页面。
- 规则系统模板。
- 存放在 `extensions` 中的规则专属字段。
- 头像和参考图等媒体管理。
- 骰点和跑团会话模式。
- 人物关系图。
- AI 辅助生成角色。

这些能力不进入 v0 范围，避免第一版过重。v0 的重点是学习 React Web 应用开发，并验证 JSON 驱动的通用角色展示体验。
