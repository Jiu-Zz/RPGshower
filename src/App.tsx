import "./App.css";
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
          <button type="button">导入JSON</button>
          <button type="button">导出JSON</button>
        </div>
      </header>

      <section className="workspace">
        <aside>
          <h2>编辑区</h2>
          <p>后续会加入基础表单和 JSON 编辑器</p>
        </aside>
        <section className="preview-panel" aria-label="角色预览">
          <CharacterCard character={character} />
        </section>
      </section>
    </main>
  );
}

export default App;
