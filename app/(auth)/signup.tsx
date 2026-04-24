import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/src/hooks/use-theme";
import { register as signupRequest } from "@/src/services/authService";
//import { useAuthStore } from "@/src/store/authStore";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const theme = useTheme();
  const styles = getStyles(theme);
  //const { login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setInvalidCredentials(false);
  }, [name, email, phone, password]);

  const handleSignup = async () => {
    if (!validateForm()) {
      setInvalidCredentials(true);
      return;
    }

    try {
      const user = await signupRequest(name, phone, email, password);
      if (!user) {
        setInvalidCredentials(true);
        return;
      }
      router.replace({
        pathname: "/login",
        params: { email: user.email },
      });
    } catch (error: any) {
      console.log("Erro ao criar conta:", error);
    }
  };

  const validateForm = () => {
    return (
      name.trim() !== "" && phone.trim() !== "" && email.trim() !== "" && password.trim() !== ""
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Crie sua conta</ThemedText>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={[styles.input, invalidCredentials && styles.inputError]}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Telefone"
        placeholderTextColor="#999"
        style={[styles.input, invalidCredentials && styles.inputError]}
        onChangeText={setPhone}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <ThemedText style={styles.buttonText}>Criar</ThemedText>
      </TouchableOpacity>

      <Link href="/login" style={styles.loginLink}>
        <ThemedText style={{ color: theme.primary }}>Já tem uma conta? Entrar</ThemedText>
      </Link>
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

    loginLink: {
      marginTop: 35,
      textAlign: "center",
      fontWeight: "bold",
      color: theme.primary,
    },
  });
