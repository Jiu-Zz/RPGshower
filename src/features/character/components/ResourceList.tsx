import type { CharacterResource } from "../characterTypes";
import { ResourceBar } from "./ResourceBar";

type ResourceListProps = {
  resources: CharacterResource[];
};

export function ResourceList({ resources }: ResourceListProps) {
  return (
    <section className="card-section">
      <h3>资源</h3>

      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceBar key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
