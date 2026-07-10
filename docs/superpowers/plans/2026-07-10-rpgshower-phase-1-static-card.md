# RPGshower Phase 1 Static Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable RPGshower React app and turn the default Vite template into a styled, componentized static character card.

**Architecture:** Start with the standard Vite React TypeScript structure, then reshape the app into a small learning-friendly frontend. Phase 1 intentionally avoids state, routing, JSON import/export, Zod, CodeMirror, and form libraries; it teaches project setup, React entry points, JSX, CSS, data objects, TypeScript types, props, and component splitting.

**Tech Stack:** Vite, React, TypeScript, npm, plain CSS.

---

## Scope

This plan covers the first learning phase only:

- Create the Vite React TypeScript project in the existing repository root.
- Verify the default app runs.
- Replace the default template with an RPGshower app shell.
- Build a static character card.
- Move role data into a TypeScript sample object.
- Add TypeScript types for the character model.
- Split the character card into focused components.
- Verify build output.

This plan does not add:

- React state.
- Form editing.
- JSON import/export.
- Runtime validation with Zod.
- JSON editor.
- React Router.
- Tailwind CSS.
- Backend storage.

Those belong in later phases.

## Reference Inputs

- Design spec: `docs/superpowers/specs/2026-07-10-rpgshower-v0-design.md`
- Official Vite command pattern: `npm create vite@latest . -- --template react-ts`
- Local environment already checked on 2026-07-10:
  - Node.js: `v24.18.0`
  - npm: `11.16.0`

## File Structure After This Plan

```text
D:\Code\RPGshower\
  docs\
    superpowers\
      specs\
        2026-07-10-rpgshower-v0-design.md
      plans\
        2026-07-10-rpgshower-phase-1-static-card.md
  index.html
  package.json
  package-lock.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  src\
    App.css
    App.tsx
    main.tsx
    vite-env.d.ts
    data\
      sampleCharacter.ts
    features\
      character\
        characterTypes.ts
        components\
          AttributeGrid.tsx
          CharacterCard.tsx
          CharacterHeader.tsx
          EquipmentList.tsx
          ResourceBar.tsx
          SkillList.tsx
```

## File Responsibilities

- `package.json`: Project scripts and dependencies created by Vite.
- `src/main.tsx`: Browser entry point. Mounts the React app into `#root`.
- `src/App.tsx`: Phase 1 root component. Imports sample data and renders the card.
- `src/App.css`: Phase 1 global app styling. Kept in one file while learning CSS and layout basics.
- `src/data/sampleCharacter.ts`: One example character used to render the static page.
- `src/features/character/characterTypes.ts`: TypeScript types for the v0 character model subset used in Phase 1.
- `src/features/character/components/CharacterCard.tsx`: Assembles the full static character card from smaller components.
- `src/features/character/components/CharacterHeader.tsx`: Renders avatar initial, name, title, summary, tags, and basics.
- `src/features/character/components/ResourceBar.tsx`: Renders one resource progress bar.
- `src/features/character/components/AttributeGrid.tsx`: Renders the character attributes.
- `src/features/character/components/EquipmentList.tsx`: Renders equipment cards.
- `src/features/character/components/SkillList.tsx`: Renders skill cards.

## Teaching Notes For This Phase

Before or while executing each task, explain the relevant concept briefly:

- Task 1: Node, npm, Vite, local development server.
- Task 2: React entry point, root component, JSX, CSS import.
- Task 3: Static UI and semantic component markup.
- Task 4: Data-driven rendering with objects and arrays.
- Task 5: TypeScript type aliases and how they describe data shape.
- Task 6: Components and props.
- Task 7: Build verification and git checkpointing.

## Task 1: Create The Vite React TypeScript Project

**Files:**
- Create through Vite: `index.html`
- Create through Vite: `package.json`
- Create through Vite: `package-lock.json`
- Create through Vite: `tsconfig.json`
- Create through Vite: `tsconfig.app.json`
- Create through Vite: `tsconfig.node.json`
- Create through Vite: `vite.config.ts`
- Create through Vite: `src\App.tsx`
- Create through Vite: `src\App.css`
- Create through Vite: `src\main.tsx`
- Create through Vite: `src\index.css`
- Create through Vite: `src\vite-env.d.ts`
- Create through Vite: `src\assets\react.svg`
- Create through Vite: `public\vite.svg`

- [ ] **Step 1: Verify Node and npm versions**

Run:

```powershell
node --version
npm --version
```

Expected:

```text
Node.js is v20.19.0 or newer, or v22.12.0 or newer.
npm prints a version number.
```

Current known local result:

```text
v24.18.0
11.16.0
```

- [ ] **Step 2: Create the Vite project in the repository root**

Run from `D:\Code\RPGshower`:

```powershell
npm create vite@latest . -- --template react-ts
```

Expected:

```text
Vite creates a React + TypeScript app in the current directory.
```

If Vite asks whether to continue because the directory is not empty, answer yes. The directory already contains `docs` and `.git`, which must be kept.

- [ ] **Step 3: Install dependencies**

Run:

```powershell
npm install
```

Expected:

```text
node_modules is created.
package-lock.json is created or updated.
npm reports no fatal errors.
```

- [ ] **Step 4: Run the default development server**

Run:

```powershell
npm run dev
```

Expected:

```text
VITE prints a local URL, usually http://localhost:5173/.
The browser can open the default Vite React page.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 5: Run the default production build**

Run:

```powershell
npm run build
```

Expected:

```text
TypeScript and Vite build complete successfully.
dist is created.
```

- [ ] **Step 6: Commit the scaffold**

Run:

```powershell
git status --short
git add index.html package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts src public
git commit -m "chore: scaffold Vite React app"
```

Expected:

```text
Git creates a commit containing the Vite scaffold.
```

## Task 2: Replace The Default Template With An RPGshower App Shell

**Files:**
- Modify: `src\App.tsx`
- Modify: `src\App.css`
- Modify: `src\main.tsx`
- Delete: `src\index.css`
- Delete: `src\assets\react.svg`
- Delete: `public\vite.svg`

- [ ] **Step 1: Replace `src\main.tsx`**

Use this exact content:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Replace `src\App.tsx`**

Use this exact content:

```tsx
function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>
        <div className="topbar-actions">
          <button type="button">导入 JSON</button>
          <button type="button">导出 JSON</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <h2>编辑区</h2>
          <p>后续这里会加入基础表单和 JSON 编辑器。</p>
        </aside>

        <section className="preview-panel">
          <h2>角色预览</h2>
          <p>下一步我们会把静态角色卡放在这里。</p>
        </section>
      </section>
    </main>
  );
}

export default App;
```

- [ ] **Step 3: Replace `src\App.css`**

Use this exact content:

```css
:root {
  color: #1f2937;
  background: #eef2f6;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2937;
  cursor: pointer;
  font: inherit;
  padding: 0.65rem 0.9rem;
}

button:hover {
  border-color: #64748b;
}

.app-shell {
  min-height: 100vh;
  padding: 1.5rem;
}

.topbar {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 0 auto 1.5rem;
  max-width: 1180px;
}

.eyebrow {
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
  margin-bottom: 0;
}

.topbar-actions {
  display: flex;
  gap: 0.75rem;
}

.workspace {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(260px, 340px) minmax(0, 1fr);
  margin: 0 auto;
  max-width: 1180px;
}

.editor-panel,
.preview-panel {
  background: #ffffff;
  border: 1px solid #dbe3ec;
  border-radius: 8px;
  min-height: 320px;
  padding: 1.25rem;
}

.editor-panel p,
.preview-panel p {
  color: #64748b;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .app-shell {
    padding: 1rem;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .workspace {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Delete unused Vite demo assets**

Delete:

```text
src\index.css
src\assets\react.svg
public\vite.svg
```

- [ ] **Step 5: Run build**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 6: Run the dev server and verify visually**

Run:

```powershell
npm run dev
```

Expected:

```text
The page shows RPGshower, two toolbar buttons, an editor panel, and a preview panel.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 7: Commit the app shell**

Run:

```powershell
git status --short
git add src/App.tsx src/App.css src/main.tsx src/index.css src/assets/react.svg public/vite.svg
git commit -m "feat: add RPGshower app shell"
```

Expected:

```text
Git creates a commit for the app shell cleanup.
```

## Task 3: Build A Static Character Card In `App.tsx`

**Files:**
- Modify: `src\App.tsx`
- Modify: `src\App.css`

- [ ] **Step 1: Replace `src\App.tsx` with static card markup**

Use this exact content:

```tsx
function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>
        <div className="topbar-actions">
          <button type="button">导入 JSON</button>
          <button type="button">导出 JSON</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <h2>编辑区</h2>
          <p>后续这里会加入基础表单和 JSON 编辑器。</p>
        </aside>

        <section className="preview-panel" aria-label="角色预览">
          <article className="character-card">
            <header className="character-header">
              <div className="avatar-initial">艾</div>
              <div className="character-title">
                <p className="eyebrow">流浪法师</p>
                <h2>艾琳</h2>
                <p className="character-summary">
                  一位寻找失落星图的年轻法师。她把旅途中的传闻、星象和古老符文都记录在随身笔记里。
                </p>
                <div className="tag-list" aria-label="角色标签">
                  <span>法师</span>
                  <span>旅行者</span>
                  <span>星象</span>
                </div>
              </div>
            </header>

            <section className="card-section">
              <h3>基础信息</h3>
              <dl className="basic-grid">
                <div>
                  <dt>种族</dt>
                  <dd>人类</dd>
                </div>
                <div>
                  <dt>职业</dt>
                  <dd>法师</dd>
                </div>
                <div>
                  <dt>等级</dt>
                  <dd>5</dd>
                </div>
                <div>
                  <dt>出身</dt>
                  <dd>北境</dd>
                </div>
                <div>
                  <dt>阵营</dt>
                  <dd>中立善良</dd>
                </div>
              </dl>
            </section>

            <section className="card-section">
              <h3>资源</h3>
              <div className="resource-list">
                <div className="resource">
                  <div className="resource-label">
                    <span>生命</span>
                    <strong>32 / 45</strong>
                  </div>
                  <div className="resource-track">
                    <div className="resource-fill resource-fill-red" style={{ width: "71%" }} />
                  </div>
                </div>
                <div className="resource">
                  <div className="resource-label">
                    <span>法力</span>
                    <strong>18 / 30</strong>
                  </div>
                  <div className="resource-track">
                    <div className="resource-fill resource-fill-blue" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            </section>

            <section className="card-section">
              <h3>属性</h3>
              <div className="attribute-grid">
                <div>
                  <span>力量</span>
                  <strong>8</strong>
                </div>
                <div>
                  <span>敏捷</span>
                  <strong>12</strong>
                </div>
                <div>
                  <span>体质</span>
                  <strong>10</strong>
                </div>
                <div>
                  <span>智力</span>
                  <strong>17</strong>
                </div>
                <div>
                  <span>感知</span>
                  <strong>14</strong>
                </div>
                <div>
                  <span>魅力</span>
                  <strong>11</strong>
                </div>
              </div>
            </section>

            <section className="card-section two-column-section">
              <div>
                <h3>装备</h3>
                <ul className="item-list">
                  <li>
                    <strong>星纹法杖</strong>
                    <span>武器 · 已装备</span>
                    <p>镶嵌着微光星石的长杖。</p>
                  </li>
                  <li>
                    <strong>旧皮革笔记</strong>
                    <span>工具</span>
                    <p>记录星象、传闻和未完成的地图。</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3>技能</h3>
                <ul className="item-list">
                  <li>
                    <strong>星火术</strong>
                    <span>熟练 · 3 法力</span>
                    <p>召唤一束星火攻击目标。</p>
                  </li>
                  <li>
                    <strong>星图解读</strong>
                    <span>专家</span>
                    <p>根据星象和古地图推断道路、季节与异常现象。</p>
                  </li>
                </ul>
              </div>
            </section>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
```

- [ ] **Step 2: Append card styles to `src\App.css`**

Append this exact content to the end of `src\App.css`:

```css
.character-card {
  color: #1f2937;
}

.character-header {
  align-items: flex-start;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar-initial {
  align-items: center;
  aspect-ratio: 1;
  background: #314158;
  border-radius: 8px;
  color: #f8fafc;
  display: flex;
  flex: 0 0 88px;
  font-size: 2.5rem;
  font-weight: 800;
  justify-content: center;
}

.character-title h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.character-summary {
  color: #475569;
  line-height: 1.7;
  margin-bottom: 0.8rem;
  max-width: 68ch;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-list span {
  background: #e0f2fe;
  border: 1px solid #bae6fd;
  border-radius: 999px;
  color: #075985;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.25rem 0.55rem;
}

.card-section {
  border-top: 1px solid #e2e8f0;
  padding: 1.25rem 0;
}

.card-section h3 {
  font-size: 1rem;
  margin: 0 0 0.9rem;
}

.basic-grid,
.attribute-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.basic-grid {
  margin: 0;
}

.basic-grid div,
.attribute-grid div {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.8rem;
}

dt,
.attribute-grid span {
  color: #64748b;
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

dd,
.attribute-grid strong {
  color: #0f172a;
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0;
}

.resource-list {
  display: grid;
  gap: 0.85rem;
}

.resource-label {
  display: flex;
  font-size: 0.92rem;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.resource-track {
  background: #e2e8f0;
  border-radius: 999px;
  height: 0.75rem;
  overflow: hidden;
}

.resource-fill {
  border-radius: inherit;
  height: 100%;
}

.resource-fill-red {
  background: #e11d48;
}

.resource-fill-blue {
  background: #2563eb;
}

.two-column-section {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.item-list {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.item-list li {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.85rem;
}

.item-list strong,
.item-list span {
  display: block;
}

.item-list span {
  color: #64748b;
  font-size: 0.82rem;
  margin-top: 0.2rem;
}

.item-list p {
  color: #475569;
  line-height: 1.6;
  margin: 0.55rem 0 0;
}

@media (max-width: 760px) {
  .character-header {
    flex-direction: column;
  }

  .two-column-section {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Build and inspect**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 4: Run the dev server and verify visually**

Run:

```powershell
npm run dev
```

Expected:

```text
The preview panel shows a complete static character card for 艾琳 with header, basics, resources, attributes, equipment, and skills.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 5: Commit the static card**

Run:

```powershell
git status --short
git add src/App.tsx src/App.css
git commit -m "feat: build static character card"
```

Expected:

```text
Git creates a commit for the static card.
```

## Task 4: Move Character Content Into A Sample Data Object

**Files:**
- Create: `src\data\sampleCharacter.ts`
- Modify: `src\App.tsx`

- [ ] **Step 1: Create `src\data`**

Run:

```powershell
New-Item -ItemType Directory -Force -Path src\data | Out-Null
```

Expected:

```text
src\data exists.
```

- [ ] **Step 2: Create `src\data\sampleCharacter.ts`**

Use this exact content:

```ts
export const sampleCharacter = {
  schemaVersion: "0.1.0",
  id: "ailin-wandering-mage",
  profile: {
    name: "艾琳",
    title: "流浪法师",
    avatarText: "艾",
    summary:
      "一位寻找失落星图的年轻法师。她把旅途中的传闻、星象和古老符文都记录在随身笔记里。",
    tags: ["法师", "旅行者", "星象"],
  },
  basics: {
    species: "人类",
    className: "法师",
    level: "5",
    origin: "北境",
    alignment: "中立善良",
  },
  resources: [
    {
      id: "hp",
      label: "生命",
      current: 32,
      max: 45,
      color: "red",
    },
    {
      id: "mp",
      label: "法力",
      current: 18,
      max: 30,
      color: "blue",
    },
  ],
  attributes: [
    { id: "strength", label: "力量", value: 8 },
    { id: "dexterity", label: "敏捷", value: 12 },
    { id: "constitution", label: "体质", value: 10 },
    { id: "intelligence", label: "智力", value: 17 },
    { id: "wisdom", label: "感知", value: 14 },
    { id: "charisma", label: "魅力", value: 11 },
  ],
  equipment: [
    {
      id: "staff",
      name: "星纹法杖",
      type: "武器",
      description: "镶嵌着微光星石的长杖。",
      equipped: true,
      tags: ["法器"],
    },
    {
      id: "journal",
      name: "旧皮革笔记",
      type: "工具",
      description: "记录星象、传闻和未完成的地图。",
      equipped: false,
      tags: ["资料"],
    },
  ],
  skills: [
    {
      id: "starfire",
      name: "星火术",
      level: "熟练",
      cost: "3 法力",
      description: "召唤一束星火攻击目标。",
      tags: ["法术", "攻击"],
    },
    {
      id: "star-map-reading",
      name: "星图解读",
      level: "专家",
      cost: "",
      description: "根据星象和古地图推断道路、季节与异常现象。",
      tags: ["知识", "探索"],
    },
  ],
};
```

- [ ] **Step 3: Replace `src\App.tsx` to render from `sampleCharacter`**

Use this exact content:

```tsx
import { sampleCharacter } from "./data/sampleCharacter";

function App() {
  const character = sampleCharacter;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>
        <div className="topbar-actions">
          <button type="button">导入 JSON</button>
          <button type="button">导出 JSON</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <h2>编辑区</h2>
          <p>后续这里会加入基础表单和 JSON 编辑器。</p>
        </aside>

        <section className="preview-panel" aria-label="角色预览">
          <article className="character-card">
            <header className="character-header">
              <div className="avatar-initial">{character.profile.avatarText}</div>
              <div className="character-title">
                <p className="eyebrow">{character.profile.title}</p>
                <h2>{character.profile.name}</h2>
                <p className="character-summary">{character.profile.summary}</p>
                <div className="tag-list" aria-label="角色标签">
                  {character.profile.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </header>

            <section className="card-section">
              <h3>基础信息</h3>
              <dl className="basic-grid">
                <div>
                  <dt>种族</dt>
                  <dd>{character.basics.species}</dd>
                </div>
                <div>
                  <dt>职业</dt>
                  <dd>{character.basics.className}</dd>
                </div>
                <div>
                  <dt>等级</dt>
                  <dd>{character.basics.level}</dd>
                </div>
                <div>
                  <dt>出身</dt>
                  <dd>{character.basics.origin}</dd>
                </div>
                <div>
                  <dt>阵营</dt>
                  <dd>{character.basics.alignment}</dd>
                </div>
              </dl>
            </section>

            <section className="card-section">
              <h3>资源</h3>
              <div className="resource-list">
                {character.resources.map((resource) => {
                  const percent =
                    resource.max > 0 ? Math.round((resource.current / resource.max) * 100) : 0;

                  return (
                    <div className="resource" key={resource.id}>
                      <div className="resource-label">
                        <span>{resource.label}</span>
                        <strong>
                          {resource.current} / {resource.max}
                        </strong>
                      </div>
                      <div className="resource-track">
                        <div
                          className={`resource-fill resource-fill-${resource.color}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card-section">
              <h3>属性</h3>
              <div className="attribute-grid">
                {character.attributes.map((attribute) => (
                  <div key={attribute.id}>
                    <span>{attribute.label}</span>
                    <strong>{attribute.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="card-section two-column-section">
              <div>
                <h3>装备</h3>
                <ul className="item-list">
                  {character.equipment.map((item) => (
                    <li key={item.id}>
                      <strong>{item.name}</strong>
                      <span>
                        {item.type}
                        {item.equipped ? " · 已装备" : ""}
                      </span>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>技能</h3>
                <ul className="item-list">
                  {character.skills.map((skill) => (
                    <li key={skill.id}>
                      <strong>{skill.name}</strong>
                      <span>
                        {[skill.level, skill.cost].filter(Boolean).join(" · ")}
                      </span>
                      <p>{skill.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
```

- [ ] **Step 4: Build and verify**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 5: Run the dev server and verify visually**

Run:

```powershell
npm run dev
```

Expected:

```text
The page looks the same as Task 3, but content is now rendered from sampleCharacter.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 6: Commit data-driven rendering**

Run:

```powershell
git status --short
git add src/App.tsx src/data/sampleCharacter.ts
git commit -m "feat: render character card from sample data"
```

Expected:

```text
Git creates a commit for sample data rendering.
```

## Task 5: Add Character TypeScript Types

**Files:**
- Create: `src\features\character\characterTypes.ts`
- Modify: `src\data\sampleCharacter.ts`

- [ ] **Step 1: Create feature directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path src\features\character | Out-Null
```

Expected:

```text
src\features\character exists.
```

- [ ] **Step 2: Create `src\features\character\characterTypes.ts`**

Use this exact content:

```ts
export type ResourceColor = "red" | "blue" | "green" | "amber" | "violet" | "slate";

export type CharacterProfile = {
  name: string;
  title: string;
  avatarText: string;
  summary: string;
  tags: string[];
};

export type CharacterBasics = {
  species: string;
  className: string;
  level: string;
  origin: string;
  alignment: string;
};

export type CharacterResource = {
  id: string;
  label: string;
  current: number;
  max: number;
  color: ResourceColor;
};

export type CharacterAttribute = {
  id: string;
  label: string;
  value: number | string;
};

export type CharacterEquipment = {
  id: string;
  name: string;
  type: string;
  description: string;
  equipped: boolean;
  tags: string[];
};

export type CharacterSkill = {
  id: string;
  name: string;
  level: string;
  cost: string;
  description: string;
  tags: string[];
};

export type Character = {
  schemaVersion: string;
  id: string;
  profile: CharacterProfile;
  basics: CharacterBasics;
  resources: CharacterResource[];
  attributes: CharacterAttribute[];
  equipment: CharacterEquipment[];
  skills: CharacterSkill[];
};
```

- [ ] **Step 3: Annotate `sampleCharacter` with `Character`**

Replace the first line of `src\data\sampleCharacter.ts`:

```ts
export const sampleCharacter = {
```

with:

```ts
import type { Character } from "../features/character/characterTypes";

export const sampleCharacter: Character = {
```

The rest of the file stays the same.

- [ ] **Step 4: Run TypeScript build**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 5: Commit type definitions**

Run:

```powershell
git status --short
git add src/features/character/characterTypes.ts src/data/sampleCharacter.ts
git commit -m "feat: add character data types"
```

Expected:

```text
Git creates a commit for character types.
```

## Task 6: Split The Character Card Into Components

**Files:**
- Create: `src\features\character\components\CharacterCard.tsx`
- Create: `src\features\character\components\CharacterHeader.tsx`
- Create: `src\features\character\components\ResourceBar.tsx`
- Create: `src\features\character\components\AttributeGrid.tsx`
- Create: `src\features\character\components\EquipmentList.tsx`
- Create: `src\features\character\components\SkillList.tsx`
- Modify: `src\App.tsx`

- [ ] **Step 1: Create components directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path src\features\character\components | Out-Null
```

Expected:

```text
src\features\character\components exists.
```

- [ ] **Step 2: Create `ResourceBar.tsx`**

Use this exact content:

```tsx
import type { CharacterResource } from "../characterTypes";

type ResourceBarProps = {
  resource: CharacterResource;
};

export function ResourceBar({ resource }: ResourceBarProps) {
  const percent = resource.max > 0 ? Math.round((resource.current / resource.max) * 100) : 0;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="resource">
      <div className="resource-label">
        <span>{resource.label}</span>
        <strong>
          {resource.current} / {resource.max}
        </strong>
      </div>
      <div className="resource-track">
        <div
          className={`resource-fill resource-fill-${resource.color}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `CharacterHeader.tsx`**

Use this exact content:

```tsx
import type { CharacterBasics, CharacterProfile } from "../characterTypes";

type CharacterHeaderProps = {
  basics: CharacterBasics;
  profile: CharacterProfile;
};

export function CharacterHeader({ basics, profile }: CharacterHeaderProps) {
  return (
    <>
      <header className="character-header">
        <div className="avatar-initial">{profile.avatarText}</div>
        <div className="character-title">
          <p className="eyebrow">{profile.title}</p>
          <h2>{profile.name}</h2>
          <p className="character-summary">{profile.summary}</p>
          <div className="tag-list" aria-label="角色标签">
            {profile.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="card-section">
        <h3>基础信息</h3>
        <dl className="basic-grid">
          <div>
            <dt>种族</dt>
            <dd>{basics.species}</dd>
          </div>
          <div>
            <dt>职业</dt>
            <dd>{basics.className}</dd>
          </div>
          <div>
            <dt>等级</dt>
            <dd>{basics.level}</dd>
          </div>
          <div>
            <dt>出身</dt>
            <dd>{basics.origin}</dd>
          </div>
          <div>
            <dt>阵营</dt>
            <dd>{basics.alignment}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Create `AttributeGrid.tsx`**

Use this exact content:

```tsx
import type { CharacterAttribute } from "../characterTypes";

type AttributeGridProps = {
  attributes: CharacterAttribute[];
};

export function AttributeGrid({ attributes }: AttributeGridProps) {
  return (
    <section className="card-section">
      <h3>属性</h3>
      <div className="attribute-grid">
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <span>{attribute.label}</span>
            <strong>{attribute.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `EquipmentList.tsx`**

Use this exact content:

```tsx
import type { CharacterEquipment } from "../characterTypes";

type EquipmentListProps = {
  equipment: CharacterEquipment[];
};

export function EquipmentList({ equipment }: EquipmentListProps) {
  return (
    <div>
      <h3>装备</h3>
      <ul className="item-list">
        {equipment.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <span>
              {item.type}
              {item.equipped ? " · 已装备" : ""}
            </span>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 6: Create `SkillList.tsx`**

Use this exact content:

```tsx
import type { CharacterSkill } from "../characterTypes";

type SkillListProps = {
  skills: CharacterSkill[];
};

export function SkillList({ skills }: SkillListProps) {
  return (
    <div>
      <h3>技能</h3>
      <ul className="item-list">
        {skills.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.name}</strong>
            <span>{[skill.level, skill.cost].filter(Boolean).join(" · ")}</span>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 7: Create `CharacterCard.tsx`**

Use this exact content:

```tsx
import type { Character } from "../characterTypes";
import { AttributeGrid } from "./AttributeGrid";
import { CharacterHeader } from "./CharacterHeader";
import { EquipmentList } from "./EquipmentList";
import { ResourceBar } from "./ResourceBar";
import { SkillList } from "./SkillList";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <CharacterHeader basics={character.basics} profile={character.profile} />

      <section className="card-section">
        <h3>资源</h3>
        <div className="resource-list">
          {character.resources.map((resource) => (
            <ResourceBar key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <AttributeGrid attributes={character.attributes} />

      <section className="card-section two-column-section">
        <EquipmentList equipment={character.equipment} />
        <SkillList skills={character.skills} />
      </section>
    </article>
  );
}
```

- [ ] **Step 8: Replace `src\App.tsx`**

Use this exact content:

```tsx
import { sampleCharacter } from "./data/sampleCharacter";
import { CharacterCard } from "./features/character/components/CharacterCard";

function App() {
  const character = sampleCharacter;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>
        <div className="topbar-actions">
          <button type="button">导入 JSON</button>
          <button type="button">导出 JSON</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <h2>编辑区</h2>
          <p>后续这里会加入基础表单和 JSON 编辑器。</p>
        </aside>

        <section className="preview-panel" aria-label="角色预览">
          <CharacterCard character={character} />
        </section>
      </section>
    </main>
  );
}

export default App;
```

- [ ] **Step 9: Build and verify**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 10: Run the dev server and verify visually**

Run:

```powershell
npm run dev
```

Expected:

```text
The page looks the same as Task 4, but the card is now assembled from components.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 11: Commit component split**

Run:

```powershell
git status --short
git add src/App.tsx src/features/character/components
git commit -m "feat: split character card into components"
```

Expected:

```text
Git creates a commit for the component split.
```

## Task 7: Final Phase 1 Verification

**Files:**
- No code files should be changed in this task.

- [ ] **Step 1: Run production build**

Run:

```powershell
npm run build
```

Expected:

```text
Build completes successfully.
```

- [ ] **Step 2: Run development server**

Run:

```powershell
npm run dev
```

Expected:

```text
Vite prints a local URL.
The browser shows the RPGshower app shell and componentized static character card.
```

Stop the server with `Ctrl+C` after verification.

- [ ] **Step 3: Check git status**

Run:

```powershell
git status --short
```

Expected:

```text
Only intentionally generated ignored files are absent from the output.
The working tree is clean after committed changes.
```

- [ ] **Step 4: Record Phase 1 completion**

If all previous checks pass, no code change is required. Report these facts:

```text
Phase 1 complete.
The app can run locally.
The production build passes.
The page renders a static, data-driven, componentized character card.
```

## Self-Review

Spec coverage:

- The plan implements the first learning slice from the design spec: project creation, app shell, static role card, data object, TypeScript types, and component splitting.
- The plan intentionally defers state, forms, archive page, JSON import/export, Zod validation, CodeMirror, routing, Tailwind CSS, and backend work to later phases.

Marker scan:

- No unresolved markers remain in this plan.

Type consistency:

- `sampleCharacter` uses the `Character` type from `src\features\character\characterTypes.ts`.
- Component props import the same specific types from `characterTypes.ts`.
- Resource color class names match `resource-fill-red` and `resource-fill-blue` styles used by the sample data.
