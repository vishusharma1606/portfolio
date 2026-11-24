(() => {
  const root = document.documentElement;

  // 1. Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });

  // 2. Mobile Navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // 3. Interactive Terminal Tabs
  const termTabs = document.querySelectorAll(".term-tab");
  const termPanels = document.querySelectorAll(".term-panel");

  termTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = `tab-${tab.dataset.tab}`;
      termTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      termPanels.forEach((panel) => {
        const show = panel.id === targetId;
        panel.classList.toggle("active", show);
        panel.hidden = !show;
      });
    });
  });

  // 4. Skill Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      skillCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  // 5. Copy to Clipboard + Toast
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  document.querySelectorAll(".copy-trigger").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      const label = btn.dataset.label || "Text";
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        showToast(`${label} copied: ${value}`);
      } catch {
        showToast(`${label}: ${value}`);
      }
    });
  });

  // 6. Contact Form -> Mailto Draft
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName")?.value.trim() || "";
    const email = document.getElementById("senderEmail")?.value.trim() || "";
    const message = document.getElementById("messageBody")?.value.trim() || "";

    const subject = encodeURIComponent(`SRE / DevOps Opportunity — Message from ${name}`);
    const body = encodeURIComponent(
      `Hi Vishvek,\n\n${message}\n\nBest regards,\n${name}\n(${email})`
    );
    window.location.href = `mailto:vishveksharma@gmail.com?subject=${subject}&body=${body}`;
    showToast("Opening your email client...");
  });

  // 7. Scroll Reveal & Active Nav Scroll-Spy
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => revealObs.observe(el));

    const sections = document.querySelectorAll("main section[id]");
    const navMap = new Map(
      Array.from(document.querySelectorAll(".nav-link")).map((a) => [
        a.getAttribute("href")?.slice(1),
        a,
      ])
    );

    const spyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navMap.forEach((link) => link.classList.remove("active"));
            navMap.get(entry.target.id)?.classList.add("active");
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((sec) => spyObs.observe(sec));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // 8. Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
