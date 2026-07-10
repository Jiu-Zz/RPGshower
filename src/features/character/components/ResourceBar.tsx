import type { CharacterResource } from "../characterTypes";

type ResourceBarProps = {
  // resource 是这个组件需要的数据。
  // 比如生命、法力、理智都可以用同一个 ResourceBar 显示。
  resource: CharacterResource;
};

export function ResourceBar({ resource }: ResourceBarProps) {
  // 根据 current / max 计算百分比。
  const percent =
    resource.max > 0 ? Math.round((resource.current / resource.max) * 100) : 0;

  // 防止进度条超过 100% 或小于 0%。
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
