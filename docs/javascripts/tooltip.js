function addTooltips() {
  const tooltipMap = {
    "Dock": "Home",
    "Deep Dives": "Blog",
    "Catch & Release": "Code Docs",
    "Rig": "Developer Tools & Setup",
  };

  document.querySelectorAll(".md-tabs__item a, .md-nav__link").forEach(link => {
    const text = link.textContent.trim();
    if (tooltipMap[text]) {
      link.setAttribute("data-tooltip", tooltipMap[text]);
    }
  });
}

document.addEventListener("DOMContentLoaded", addTooltips);

//TODO: fix the hover on page redirects