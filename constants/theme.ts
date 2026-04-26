import { Platform } from "react-native";

const slytherinGreen = "#0B3D2E"; // verde escuro principal
const slytherinGreenLight = "#145A44";
const silver = "#C0C0C0";
const darkBg = "#0D1110";
const darkSurface = "#161B1A";

export const Colors = {
  light: {
    text: "#0B3D2E",
    textSecondary: "#145A44",
    background: "#F4F7F6",
    tint: slytherinGreen,
    icon: "#145A44",
    tabIconDefault: "#145A44",
    tabIconSelected: slytherinGreen,
  },

  dark: {
    text: "#E6E6E6",
    textSecondary: "#A0A0A0",
    background: darkBg,
    tint: slytherinGreenLight,
    icon: silver,
    tabIconDefault: "#6B7280",
    tabIconSelected: slytherinGreenLight,
  },

  custom: {
    primary: slytherinGreen,
    secondary: slytherinGreenLight,
    accent: silver,
    surface: darkSurface,
    error: "#B91C1C",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
