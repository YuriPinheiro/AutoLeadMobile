// src/components/AppHeader.tsx
import { useTheme } from "@/src/hooks/use-theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title?: string;
  onLogout?: () => void;
};

export function AppHeader({ title = "App", onLogout }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

      <TouchableOpacity onPress={onLogout} style={styles.button}>
        <Text style={{ color: "red" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    padding: 8,
  },
});
