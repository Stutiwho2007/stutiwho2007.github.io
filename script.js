(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
    }));
  }

  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add("visible"));

  const modal = document.querySelector("#reading-modal");
  const title = document.querySelector("#modal-title");
  const kicker = document.querySelector("#modal-kicker");
  const text = document.querySelector("#modal-text");
  const samples = {
    poem: { kicker: "FROM THE NOTEBOOK / POETRY", title: "Love in the Digital Age", text: "We learned to miss each other\nin typing bubbles and blue light,\nto keep whole oceans between us\nand call it being online.\n\nSomewhere beneath the little screen,\na heart still waits for something real —\na voice that stays, a hand held still,\na feeling no notification can reveal." },
    story: { kicker: "FROM THE NOTEBOOK / STORY", title: "Somewhere Between", text: "There is a quiet place between who we were and who we are becoming. It does not announce itself. It arrives in ordinary moments: a familiar street that feels different, a sentence we no longer need to explain, a morning that asks less of us than yesterday.\n\nPerhaps beginning again is not a grand gesture. Perhaps it is simply making room for the next true thing." }
  };
  document.querySelectorAll("[data-reading]").forEach(button => button.addEventListener("click", () => {
    const sample = samples[button.dataset.reading];
    kicker.textContent = sample.kicker; title.textContent = sample.title; text.textContent = sample.text.replace(/\\n/g, "\n");
    if (modal.showModal) modal.showModal(); else modal.setAttribute("open", "");
  }));
  document.querySelector(".close")?.addEventListener("click", () => modal.close());
  modal?.addEventListener("click", event => { if (event.target === modal) modal.close(); });

  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
    const field = document.querySelector("#service"); if (field) field.value = link.dataset.service;
  }));
  document.querySelectorAll("[data-package]").forEach(link => link.addEventListener("click", () => {
    const field = document.querySelector("#package");
    const values = { Basic: "Basic — ₹1,799", Business: "Business — ₹3,499", Premium: "Premium — ₹7,499" };
    if (field) field.value = values[link.dataset.package] || "";
  }));

  const form = document.querySelector("#project-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const subject = `MINHO project enquiry — ${d.get("name")}`;
    const body = ["Hello MINHO,", "", `Name: ${d.get("name")}`, `Email: ${d.get("email")}`, `Service: ${d.get("service")}`, `Package: ${d.get("package") || "To discuss"}`, "", "Project details:", d.get("brief") || "Not provided yet", "", "Thank you."].join("\n");
    document.querySelector("#form-status").textContent = "Opening your email app with the enquiry drafted…";
    // Replace this placeholder email before publishing.
    window.location.href = `mailto:hello@minhostudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
})();