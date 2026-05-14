(function () {
  "use strict";

  const STORAGE_KEY = "preferred-theme";
  const DARK_CLASS = "dark-theme";
  const toggle = document.getElementById("dn");

  if (!(toggle instanceof HTMLInputElement)) {
    return;
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    document.body.classList.toggle(DARK_CLASS, isDark);
    toggle.checked = isDark;
    toggle.setAttribute("aria-checked", String(isDark));
  }

  const initialTheme = getSavedTheme() || "light";
  applyTheme(initialTheme);

  toggle.addEventListener("change", function () {
    const nextTheme = toggle.checked ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
})();
