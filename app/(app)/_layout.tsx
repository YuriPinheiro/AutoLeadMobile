import { AppHeader } from "@/components/app-header";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { useAuthStore } from "@/src/store/authStore";
import { Slot, useRouter } from "expo-router";

export default function AppLayout() {
  const { logout } = useAuthStore();
  const theme = useTheme();
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/(auth)/login");
  };
  return (
    <ThemedView style={{ flex: 1, backgroundColor: theme.background }}>
      <AppHeader title="AutoLead" onLogout={onLogout} />
      <Slot />
    </ThemedView>
  );
}
