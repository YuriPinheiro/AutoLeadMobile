import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  const colorScheme = useColorScheme();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return null; // animação loading
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(app)/home" />
        ) : (
          <Stack.Screen
            name="(auth)/login"
            options={{
              title: "Entrar",
            }}
          />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
