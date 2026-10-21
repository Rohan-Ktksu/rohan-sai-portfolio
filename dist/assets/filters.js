export const projectFilters = ["all", "data", "web", "geospatial", "language", "media"];
export function isProjectFilter(value) {
    return projectFilters.some((filter) => filter === value);
}
export function matchesProject(categories, filter) {
    return filter === "all" || categories.split(/\s+/).includes(filter);
}
export function projectCountLabel(visible, total) {
    const label = `${visible} ${visible === 1 ? "project" : "projects"}`;
    return visible === total ? label : `${label} of ${total}`;
}
