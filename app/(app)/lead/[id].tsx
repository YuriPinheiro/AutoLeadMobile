import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { StyleSheet, TouchableOpacity } from "react-native";
export default function LeadDetails() {
  const { id } = useLocalSearchParams();

  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Detalhes do Lead - {id} </ThemedText>
      <TouchableOpacity onPress={() => router.push(`/lead/edit/${id}`)}>
        <ThemedText>Editar Lead</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
