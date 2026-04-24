import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const styles = getStyles(theme);

  const data: any[] = []; // lista vazia por enquanto

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ThemedText>Lead {item}</ThemedText>}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Nenhum lead encontrado</ThemedText>
        }
        style={styles.list}
      />

      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{user?.role}</ThemedText>

      <TouchableOpacity style={styles.fab} onPress={handleLogout}>
        <ThemedText style={styles.fabText}>-</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    emptyText: {
      textAlign: "center",
      marginTop: 80,
      opacity: 0.6,
    },
    fab: {
      position: "absolute",
      right: 20,
      bottom: 30,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4CAF50",
      elevation: 5,
    },
    fabText: {
      fontSize: 28,
      color: "#fff",
    },
    list: {
      marginTop: 50,
      borderColor: theme.tint,
      borderWidth: 1,
      borderRadius: 8,
    },
  });
