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
        <section className="preview-panel" aria-label="角色预览">
          <article className="character-card">
            <header className="character-header">
              <div className="avater-initial">艾</div>
              <div className="character-tital">
                <p className="eyebrow">流浪法师</p>
                <h2>艾琳</h2>
                <p className="character-summary">
                  一位寻找失落星图的年轻法师，她把旅途中的传闻，星象和古老符文都记录在随身笔记里
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
                  <dt>人类</dt>
                </div>
                <div>
                  <dt>职业</dt>
                  <dt>法师</dt>
                </div>
                <div>
                  <dt>等级</dt>
                  <dt>5</dt>
                </div>
                <div>
                  <dt>阵营</dt>
                  <dt>中立善良</dt>
                </div>
              </dl>
            </section>

            <section className="card-section">
              <h3>资源</h3>

              <div className="resource-list">
                <div className="resource">
                  <div className="resource_label">
                    <span>生命</span>
                    <strong>32 / 45</strong>
                  </div>
                  <div className="resource-track">
                    <div
                      className="resource-fill resource-fill-red"
                      style={{ width: "71%" }}
                    />
                  </div>
                </div>

                <div className="resource">
                  <div className="resource_label">
                    <span>法力</span>
                    <strong>18 / 30</strong>
                  </div>
                  <div className="resource-track">
                    <div
                      className="resource-fill resource-fill-blue"
                      style={{ width: "60%" }}
                    />
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

            {/* 装备和技能区域：左右两列展示 */}
            <section className="card-section two-column-section">
              {/* 装备列表 */}
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

              {/* 技能列表 */}
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
