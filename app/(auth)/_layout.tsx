import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
          animation: "fade",
        }}
      />
    </View>
  );
}
