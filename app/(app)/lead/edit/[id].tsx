import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
export default function EditLead() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Editar Lead - {id}</ThemedText>
    </ThemedView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
