import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { login as loginRequest } from "@/src/services/authService";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);

      await login(data.token);
      console.log(data.token);
      router.replace("/home");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <ThemedText>Email</ThemedText>
      <TextInput
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          color: "white", // importante no dark mode
        }}
        onChangeText={setEmail}
      />

      <ThemedText>Senha</ThemedText>
      <TextInput
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          color: "white",
        }}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
}
