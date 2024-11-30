import { MantineTheme, DefaultMantineColor, MantineThemeOverride } from "@mantine/core";

export const globalTheme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "indigo",
  primaryShade: { light: 6, dark: 8 },
  colors: {
    indigo: [
      "#EEF2FF",
      "#E0E7FF",
      "#C7D2FE",
      "#A5B4FC",
      "#818CF8",
      "#6366F1",
      "#4F46E5",
      "#4338CA",
      "#3730A3",
      "#312E81",
    ],
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  other: {
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "200ms",
  },
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
  },
  components: {
    Box: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        },
      }),
    },
    Paper: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      }),
    },
  },
};
