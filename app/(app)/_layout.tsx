import { useTheme } from "@/src/hooks/use-theme";
import { Stack } from "expo-router";

export default function AppLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    />
  );
}
