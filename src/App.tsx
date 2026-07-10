import "./App.css";

function App() {
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
        <section className="preview-panel">
          <h2>角色预览</h2>
          <p>下一步放入静态角色卡</p>
        </section>
      </section>
    </main>
  );
}

export default App;
