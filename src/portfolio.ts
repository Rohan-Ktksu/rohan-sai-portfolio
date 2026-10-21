import { isProjectFilter, matchesProject, projectCountLabel } from "./filters.js";

function setupProjectFilters(): void {
  const controls = document.querySelector<HTMLElement>("[data-project-filters]");
  const cards = [...document.querySelectorAll<HTMLElement>(".project[data-categories]")];
  const count = document.querySelector<HTMLElement>("[data-project-count]");
  if (!controls || cards.length === 0) return;

  const buttons = [...controls.querySelectorAll<HTMLButtonElement>("button[data-filter]")];
  controls.hidden = false;
  if (count) count.textContent = projectCountLabel(cards.length, cards.length);

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (!isProjectFilter(filter)) return;
      let visible = 0;
      for (const card of cards) {
        const show = matchesProject(card.dataset.categories ?? "", filter);
        card.hidden = !show;
        if (show) visible += 1;
      }
      for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
      if (count) count.textContent = projectCountLabel(visible, cards.length);
    });
  }
}

function setupNavigation(): void {
  const menu = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const nav = document.querySelector<HTMLElement>("#site-nav");
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!menu || !nav || !header) return;
  header.classList.add("has-menu");
  menu.hidden = false;
  const mobile = window.matchMedia("(max-width: 700px)");

  function setOpen(open: boolean): void {
    if (!menu || !nav) return;
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    menu.textContent = open ? "Close" : "Menu";
  }

  menu.addEventListener("click", () => setOpen(menu.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      menu.focus();
    }
  });
  document.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof Node && !header.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener("change", () => setOpen(false));

  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const entries = links.flatMap((link) => {
    const section = document.getElementById(link.hash.slice(1));
    return section ? [{ link, section }] : [];
  });
  if (!("IntersectionObserver" in window)) return;
  const positions = new Map<Element, boolean>();
  const observer = new IntersectionObserver((changes) => {
    for (const change of changes) positions.set(change.target, change.isIntersecting);
    const active = entries.find(({ section }) => positions.get(section));
    if (!active) return;
    for (const { link } of entries) {
      if (link === active.link) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-12% 0px -52% 0px", threshold: 0 });
  for (const { section } of entries) observer.observe(section);
}

function setupEmailCopy(): void {
  const button = document.querySelector<HTMLButtonElement>("[data-copy-email]");
  const email = document.querySelector<HTMLAnchorElement>(".email-link");
  const status = document.querySelector<HTMLElement>("[data-copy-status]");
  if (!button || !email || !status || !navigator.clipboard || !window.isSecureContext) return;
  button.hidden = false;
  button.addEventListener("click", async () => {
    const address = email.getAttribute("href")?.replace(/^mailto:/, "");
    if (!address || button.disabled) return;
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = "Email address copied.";
    } catch {
      status.textContent = "Couldn’t copy. You can select the email address or click it to get in touch.";
    } finally {
      button.disabled = false;
    }
  });
}

setupProjectFilters();
setupNavigation();
setupEmailCopy();
