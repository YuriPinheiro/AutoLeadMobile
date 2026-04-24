import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { StyleSheet } from "react-native";

export default function CreateLead() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Criar Lead</ThemedText>
    </ThemedView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
