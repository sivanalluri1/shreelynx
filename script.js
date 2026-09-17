const path = window.location.pathname;
const currentPage = path.split("/").pop() || "index.html";

const navItems = [
  {
    label: "Services",
    href: "services.html",
    pages: ["services.html"],
    menu: [
      ["Strategy & Consulting", "Technology roadmaps, architecture, transformation", "services.html#consulting", "compass"],
      ["Digital Engineering", "Web, mobile, platforms, modernization", "services.html#engineering", "code-2"],
      ["Data, AI & Analytics", "Data foundations, intelligence, automation", "services.html#data-ai", "chart-no-axes-combined"],
      ["Cloud & DevOps", "Cloud adoption, platform engineering, reliability", "services.html#cloud", "cloud-cog"],
      ["Quality & Security", "Test automation, resilience, secure delivery", "services.html#quality", "shield-check"],
      ["Managed Services", "Support, optimization, continuous improvement", "services.html#managed", "settings-2"]
    ]
  },
  {
    label: "Talent",
    href: "talent.html",
    pages: ["talent.html", "careers.html"],
    menu: [
      ["Technology Staffing", "Contract, contract-to-hire, direct placement", "talent.html#staffing", "users"],
      ["Dedicated Teams", "Cross-functional squads shaped around outcomes", "talent.html#teams", "blocks"],
      ["RPO & Workforce Solutions", "Scalable recruiting operations and programs", "talent.html#rpo", "network"],
      ["Careers", "Explore opportunities with ShreeLynx", "careers.html", "briefcase-business"]
    ]
  },
  {
    label: "Industries",
    href: "industries.html",
    pages: ["industries.html"],
    menu: [
      ["Healthcare", "Connected, secure digital care ecosystems", "industries.html#healthcare", "heart-pulse"],
      ["Financial Services", "Trusted platforms for regulated growth", "industries.html#financial", "landmark"],
      ["Manufacturing", "Intelligent operations and supply chains", "industries.html#manufacturing", "factory"],
      ["Retail & Commerce", "Unified experiences and data-led growth", "industries.html#retail", "shopping-bag"],
      ["Logistics", "Visibility, orchestration, and optimization", "industries.html#logistics", "truck"],
      ["Enterprise Technology", "Scalable products for complex organizations", "industries.html#enterprise", "building-2"]
    ]
  },
  {
    label: "Company",
    href: "about.html",
    pages: ["about.html", "insights.html"],
    menu: [
      ["About ShreeLynx", "Our purpose, approach, and operating principles", "about.html", "building"],
      ["How We Work", "A practical path from ambition to impact", "about.html#approach", "route"],
      ["Insights", "Perspectives on talent and technology delivery", "insights.html", "lightbulb"],
      ["Careers", "Do meaningful work with capable people", "careers.html", "sparkles"]
    ]
  }
];

function headerMarkup() {
  const nav = navItems.map((item) => {
    const active = item.pages.includes(currentPage) ? " active" : "";
    const menu = item.menu.map(([title, text, href, icon]) => `
      <a class="mega-link" href="${href}">
        <span class="mega-icon"><i data-lucide="${icon}"></i></span>
        <span><strong>${title}</strong><small>${text}</small></span>
        <i class="mega-arrow" data-lucide="arrow-up-right"></i>
      </a>`).join("");
    return `
      <div class="nav-group${active}">
        <a class="nav-link" href="${item.href}">${item.label}</a>
        <button class="submenu-toggle" type="button" aria-expanded="false" aria-label="Open ${item.label} menu"><i data-lucide="chevron-down"></i></button>
        <div class="mega-menu"><div class="mega-grid">${menu}</div></div>
      </div>`;
  }).join("");

  return `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="topbar">
      <div class="container topbar-inner">
        <span><span class="status-dot"></span>Technology solutions. Business transformed.</span>
        <div><a href="mailto:hr@randomcompany.com"><i data-lucide="mail"></i>hr@randomcompany.com</a><span class="topbar-divider"></span><a href="contact.html">Talk to an expert <i data-lucide="arrow-up-right"></i></a></div>
      </div>
    </div>
    <header class="site-header">
      <nav class="navbar container" aria-label="Primary navigation">
        <a class="brand" href="index.html" aria-label="ShreeLynx home"><img src="assets/shreelynx-logo.png" alt="ShreeLynx IT Consulting" width="440" height="125"></a>
        <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>
        <div class="primary-menu" id="primary-menu">${nav}
          <a class="nav-link standalone${currentPage === "contact.html" ? " active" : ""}" href="contact.html">Contact</a>
          <a class="button button-small" href="contact.html">Start a conversation <i data-lucide="arrow-right"></i></a>
        </div>
      </nav>
    </header>`;
}

function footerMarkup() {
  return `
    <section class="footer-cta">
      <div class="container footer-cta-inner">
        <div><span class="eyebrow light"><i></i>Bring us the challenge</span><h2>Let’s turn your next priority into progress.</h2></div>
        <a class="button button-gold" href="contact.html">Start a conversation <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand"><img src="assets/shreelynx-logo.png" alt="ShreeLynx IT Consulting" width="440" height="125"><p>End-to-end technology consulting, project delivery, and talent solutions—brought together by one accountable partner.</p></div>
        <div><h3>Services</h3><a href="services.html#consulting">IT Consulting</a><a href="services.html#engineering">Digital Engineering</a><a href="services.html#data-ai">Data & AI</a><a href="services.html#cloud">Cloud & DevOps</a><a href="services.html#managed">Managed Services</a></div>
        <div><h3>Talent</h3><a href="talent.html#staffing">Technology Staffing</a><a href="talent.html#teams">Dedicated Teams</a><a href="talent.html#rpo">RPO Solutions</a><a href="careers.html">Careers</a></div>
        <div><h3>Company</h3><a href="about.html">About</a><a href="industries.html">Industries</a><a href="insights.html">Insights</a><a href="contact.html">Contact</a></div>
        <div><h3>Reach us</h3><a href="mailto:hr@randomcompany.com">hr@randomcompany.com</a><p>123 Street<br>Some State, 00000</p></div>
      </div>
      <div class="container footer-bottom"><span>© <span data-year></span> ShreeLynx. All rights reserved.</span><span>Consult · Build · Empower · Deliver</span></div>
    </footer>
    <button class="back-to-top" type="button" aria-label="Back to top"><i data-lucide="arrow-up"></i></button>`;
}

const headerRoot = document.querySelector("[data-site-header]");
const footerRoot = document.querySelector("[data-site-footer]");
if (headerRoot) headerRoot.innerHTML = headerMarkup();
if (footerRoot) footerRoot.innerHTML = footerMarkup();

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}
refreshIcons();

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

const siteHeader = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
function updateScrollState() {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 20);
  backToTop?.classList.toggle("visible", window.scrollY > 650);
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const mobileToggle = document.querySelector(".mobile-menu-toggle");
const primaryMenu = document.querySelector(".primary-menu");
function closeMobileMenu() {
  primaryMenu?.classList.remove("open");
  mobileToggle?.setAttribute("aria-expanded", "false");
  mobileToggle?.setAttribute("aria-label", "Open navigation");
}
mobileToggle?.addEventListener("click", () => {
  const isOpen = primaryMenu.classList.toggle("open");
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
  mobileToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".submenu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".nav-group");
    const isOpen = group.classList.toggle("submenu-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMobileMenu(); });
document.querySelectorAll(".mega-link, .primary-menu > a").forEach((link) => link.addEventListener("click", closeMobileMenu));

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
  const buttons = [...tabsRoot.querySelectorAll("[role='tab']")];
  const panels = [...tabsRoot.querySelectorAll("[role='tabpanel']")];
  function activate(button) {
    buttons.forEach((btn) => {
      const selected = btn === button;
      btn.classList.toggle("active", selected);
      btn.setAttribute("aria-selected", String(selected));
      btn.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== button.getAttribute("aria-controls"); });
  }
  buttons.forEach((button) => {
    button.addEventListener("click", () => activate(button));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(buttons.indexOf(button) + offset + buttons.length) % buttons.length];
      activate(next);
      next.focus();
    });
  });
});

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const buttons = [...group.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(`[data-filter-item="${group.dataset.filterGroup}"]`)];
  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((btn) => { btn.classList.toggle("active", btn === button); btn.setAttribute("aria-pressed", String(btn === button)); });
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category?.split(" ").includes(filter);
      card.hidden = !match;
    });
  }));
});

document.querySelectorAll("form[data-mail-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const required = [...form.querySelectorAll("[required]")];
    required.forEach((field) => field.classList.toggle("invalid", !field.checkValidity()));
    const invalid = required.find((field) => !field.checkValidity());
    if (invalid) {
      status.textContent = "Please complete the required fields and enter a valid email.";
      invalid.focus();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get("subject") || data.get("interest") || "Website inquiry");
    const lines = [...data.entries()].filter(([, value]) => value).map(([key, value]) => `${key.replaceAll("-", " ")}: ${value}`);
    status.textContent = "Your email application is opening with the details prepared.";
    window.location.href = `mailto:hr@randomcompany.com?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
  form.querySelectorAll("input, select, textarea").forEach((field) => field.addEventListener("blur", () => {
    if (field.required) field.classList.toggle("invalid", !field.checkValidity());
  }));
});

const searchInput = document.querySelector("[data-role-search]");
if (searchInput) {
  const roleCards = [...document.querySelectorAll("[data-role-card]")];
  const emptyState = document.querySelector("[data-role-empty]");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    roleCards.forEach((card) => {
      const match = card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });
    emptyState.hidden = visible > 0;
  });
}
