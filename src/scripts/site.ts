// Small progressive enhancements: mobile menu, header border, active nav item, sticky call panel.
// Everything works as plain anchors and links without this script.
const root = document.documentElement;
const header = document.querySelector<HTMLElement>("[data-header]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");
const panel = document.querySelector<HTMLElement>("[data-callbar]");
// The panel hides at rest only once this script runs; without it the panel simply stays visible.
if (panel && "IntersectionObserver" in window) root.setAttribute("data-js-callbar", "");

function setMenu(open: boolean) {
  if (!menu || !openBtn) return;
  if (open) {
    menu.hidden = false;
    menu.classList.add("is-open");
    root.classList.add("menu-open");
    openBtn.setAttribute("aria-expanded", "true");
    closeBtn?.focus();
  } else {
    menu.hidden = true;
    menu.classList.remove("is-open");
    root.classList.remove("menu-open");
    openBtn.setAttribute("aria-expanded", "false");
  }
}
openBtn?.addEventListener("click", () => setMenu(true));
closeBtn?.addEventListener("click", () => { setMenu(false); openBtn?.focus(); });
menu?.querySelectorAll("[data-menu-close-link]").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && !menu.hidden) { setMenu(false); openBtn?.focus(); }
});
// Keep Tab inside the open menu.
menu?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const f = menu.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']");
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
window.matchMedia("(min-width: 1100px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

// Header hairline once the page moves.
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if ("IntersectionObserver" in window) {
  // Active nav item: a short golden trail under the section in view.
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((a) => links.set(a.hash.slice(1), a));
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const link = links.get(e.target.id);
      if (!link) continue;
      if (e.isIntersecting) {
        links.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
      } else if (link.getAttribute("aria-current")) {
        link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // Sticky call panel (phones): shows after the hero has left the screen, hides near the contacts block.
  const hero = document.getElementById("hero");
  const contacts = document.getElementById("contacts");
  let pastHero = false, atContacts = false;
  const update = () => panel?.classList.toggle("is-shown", pastHero && !atContacts);
  if (panel && hero) {
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(hero);
  }
  if (panel && contacts) {
    new IntersectionObserver(([e]) => { atContacts = e.isIntersecting; update(); }, { rootMargin: "0px 0px -30% 0px" }).observe(contacts);
  }
} else {
  panel?.classList.add("is-shown");
}
