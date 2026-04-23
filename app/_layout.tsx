import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const { isLoading, checkAuth } = useAuthStore();

  const colorScheme = useColorScheme();
  const theme = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: "#0f0f0f" }} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: theme.background || "#0f0f0f" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.background || "#0f0f0f",
            },
            animation: "fade",
          }}
        />
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
