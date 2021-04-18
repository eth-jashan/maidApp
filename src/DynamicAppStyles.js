const lightColorSet = {
  mainThemeBackgroundColor: "#ffffff",
  mainThemeForegroundColor: "#e2703a",
};

const darkColorSet = {
  mainThemeBackgroundColor: "#121212",
  mainThemeForegroundColor: "#788eec",
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  "no-preference": lightColorSet,
};

const StyleDict = {
  colorSet,
};

export default StyleDict;
