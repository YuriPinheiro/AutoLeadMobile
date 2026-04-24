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

  const data: any[] = [{ id: 1, name: "Lead 1" }]; // lista com um item por enquanto

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const handleAddLead = () => {
    router.push({
      pathname: "/lead/new",
    });
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/lead/${item.id}`)}>
            <ThemedText>Lead {item.name}</ThemedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Nenhum lead encontrado</ThemedText>
        }
        style={styles.list}
      />

      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{user?.role}</ThemedText>

      <TouchableOpacity style={styles.fab} onPress={handleAddLead}>
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
