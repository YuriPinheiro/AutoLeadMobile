import { useTheme } from "@/src/hooks/use-theme";
import { useAuthStore } from "@/src/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </View>
  );
}
