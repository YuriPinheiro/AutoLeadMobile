import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";

export function useTheme() {
  const theme = useColorScheme() ?? "light";

  return {
    ...Colors[theme],
    ...Colors.custom,
  };
}
