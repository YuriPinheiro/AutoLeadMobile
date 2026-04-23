import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter();

  const data: any[] = []; // lista vazia por enquanto

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

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/create-lead")}>
        <ThemedText style={styles.fabText}>+</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/login")}>
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
