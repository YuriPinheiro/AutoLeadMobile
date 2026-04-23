import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { CommonError } from "@/src/api/errors/common-error";
import { login as loginRequest } from "@/src/services/authService";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const theme = useTheme();
  const styles = getStyles(theme);
  const { login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setInvalidCredentials(false);
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);

      await login(data.token);
      console.log(data.token);
      router.replace("/home");
    } catch (error: any) {
      if (error instanceof CommonError) {
        if (error.status === 403) {
          setInvalidCredentials(true);
        } else {
          console.log(error.message);
        }
      } else {
        console.log("Erro desconhecido");
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Entrar</ThemedText>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={[styles.input, invalidCredentials && styles.inputError]}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={[styles.input, invalidCredentials && styles.inputError]}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },

    title: {
      fontSize: 28,
      marginBottom: 50,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
    },

    input: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.surface,
      color: theme.text,
    },
    inputError: {
      borderWidth: 2,
      borderColor: theme.error,
    },

    button: {
      height: 50,
      borderRadius: 10,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
  });
