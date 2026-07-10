import type { CharacterBasics, CharacterProfile } from "../characterTypes";

type CharacterHeaderProps = {
  // basics 是基础档案信息，比如种族、职业、等级。
  basics: CharacterBasics;

  // profile 是角色头部展示信息，比如名字、称号、简介。
  profile: CharacterProfile;
};

export function CharacterHeader({ basics, profile }: CharacterHeaderProps) {
  return (
    <>
      {/* 角色卡顶部：头像、称号、名字、简介、标签 */}
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

      {/* 基础信息区域 */}
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
