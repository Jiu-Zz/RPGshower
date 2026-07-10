import "./App.css";
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
            {/* 角色卡顶部：头像、称号、名字、简介、标签 */}
            <header className="character-header">
              {/* 从角色数据中读取头像文字 */}
              <div className="avatar-initial">
                {character.profile.avatarText}
              </div>

              <div className="character-title">
                <p className="eyebrow">{character.profile.title}</p>
                <h2>{character.profile.name}</h2>

                <p className="character-summary">{character.profile.summary}</p>

                {/* 用 map 把 tags 数组转换成多个 span */}
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

            {/* 资源区域：从 character.resources 数组生成 */}
            <section className="card-section">
              <h3>资源</h3>

              <div className="resource-list">
                {character.resources.map((resource) => {
                  // 计算当前资源百分比。
                  // 例如生命 32 / 45，大约是 71%。
                  const percent =
                    resource.max > 0
                      ? Math.round((resource.current / resource.max) * 100)
                      : 0;

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

            {/* 属性区域：从 character.attributes 数组生成 */}
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

            {/* 装备和技能区域：从 equipment / skills 数组生成 */}
            <section className="card-section two-column-section">
              {/* 装备列表 */}
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

              {/* 技能列表 */}
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
