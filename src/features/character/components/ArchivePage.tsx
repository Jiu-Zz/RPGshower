import type { ReactNode } from "react";
import type { CharacterArchive } from "../characterTypes";

type ArchivePageProps = {
  archive: CharacterArchive;
};

function ArchiveSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="archive-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function EmptyArchiveText() {
  return <p className="archive-empty">暂无内容</p>;
}

export function ArchivePage({ archive }: ArchivePageProps) {
  return (
    <article className="archive-page">
      <header className="archive-page-header">
        <p className="eyebrow">角色档案</p>
        <h2>人物记录</h2>
        <p>把角色经历、动机和关系集中在一处，方便创作和跑团时快速查阅。</p>
      </header>

      <div className="archive-overview-grid">
        <ArchiveSection title="背景">
          {archive.background ? <p>{archive.background}</p> : <EmptyArchiveText />}
        </ArchiveSection>

        <ArchiveSection title="外貌">
          {archive.appearance ? <p>{archive.appearance}</p> : <EmptyArchiveText />}
        </ArchiveSection>

        <ArchiveSection title="性格">
          {archive.personality ? <p>{archive.personality}</p> : <EmptyArchiveText />}
        </ArchiveSection>

        <ArchiveSection title="备注">
          {archive.notes ? <p>{archive.notes}</p> : <EmptyArchiveText />}
        </ArchiveSection>
      </div>

      <ArchiveSection title="目标">
        {archive.goals.length > 0 ? (
          <ul className="archive-list">
            {archive.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        ) : (
          <EmptyArchiveText />
        )}
      </ArchiveSection>

      <ArchiveSection title="人物关系">
        {archive.relationships.length > 0 ? (
          <ul className="archive-list archive-card-list">
            {archive.relationships.map((relationship) => (
              <li key={relationship.id}>
                <strong>{relationship.name}</strong>
                <span>{relationship.relation}</span>
                <p>{relationship.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyArchiveText />
        )}
      </ArchiveSection>

      <ArchiveSection title="经历">
        {archive.timeline.length > 0 ? (
          <ol className="archive-list archive-timeline">
            {archive.timeline.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>
                <p>{event.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyArchiveText />
        )}
      </ArchiveSection>
    </article>
  );
}
