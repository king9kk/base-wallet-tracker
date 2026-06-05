// Dark Mode Manager
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

function applyTheme(theme) {
  const root = document.documentElement;
  const resolvedTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;

  if (resolvedTheme === THEMES.DARK) {
    root.setAttribute("data-theme", "dark");
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.setAttribute("data-theme", "light");
    root.classList.add("light");
    root.classList.remove("dark");
  }

  return resolvedTheme;
}

function toggleTheme(currentTheme) {
  return currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
}

function watchSystemTheme(callback) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    callback(e.matches ? THEMES.DARK : THEMES.LIGHT);
  });
}

function initTheme(savedTheme = null) {
  const theme = savedTheme || getSystemTheme();
  applyTheme(theme);
  return theme;
}

export {
  THEMES,
  getSystemTheme,
  applyTheme,
  toggleTheme,
  watchSystemTheme,
  initTheme,
};