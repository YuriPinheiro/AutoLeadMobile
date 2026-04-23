import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

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
        renderItem={({ item }) => null}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Nenhum lead encontrado</ThemedText>
        }
      />

      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{user?.role}</ThemedText>

      <TouchableOpacity style={styles.fab} onPress={handleLogout}>
        <ThemedText style={styles.fabText}>-</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
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
});
