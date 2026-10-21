export const projectFilters = ["all", "data", "web", "geospatial", "language", "media"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export function isProjectFilter(value: string | undefined): value is ProjectFilter {
  return projectFilters.some((filter) => filter === value);
}

export function matchesProject(categories: string, filter: ProjectFilter): boolean {
  return filter === "all" || categories.split(/\s+/).includes(filter);
}

export function projectCountLabel(visible: number, total: number): string {
  const label = `${visible} ${visible === 1 ? "project" : "projects"}`;
  return visible === total ? label : `${label} of ${total}`;
}
