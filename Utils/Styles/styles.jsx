export const setGlobalStyles = (theme) => {
  document.documentElement.style.setProperty("--primary", theme.primary_color);
  document.documentElement.style.setProperty("--font", theme.font_color);
  document.documentElement.style.setProperty("--background", theme.background_color);
  document.documentElement.style.setProperty("--border", theme.border);
  document.documentElement.style.setProperty("--primary", theme.primary_color);
};



// Finish this refactoring later for global styles that can be used in the scss files directly and cleans up the inline styling
