import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { CommonError } from "@/src/api/errors/common-error";
import { useTheme } from "@/src/hooks/use-theme";
import { login as loginRequest } from "@/src/services/authService";
import { useAuthStore } from "@/src/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { email: emailParam } = useLocalSearchParams();

  const theme = useTheme();
  const styles = getStyles(theme);
  const { login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam as string);
    }
    console.log(emailParam);
  }, [emailParam]);

  useEffect(() => {
    setInvalidCredentials(false);
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);
      await login(data.token);

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
      <Image source={require("@/assets/images/carleads_logo.png")} style={styles.logo} />

      <View style={styles.loginCard}>
        {/* EMAIL */}
        <FormControl isInvalid={invalidCredentials}>
          <FormControlLabel style={styles.label}>
            <FormControlLabelText>E-mail</FormControlLabelText>
          </FormControlLabel>

          <Input style={[styles.input, invalidCredentials && styles.inputError]}>
            <InputSlot>
              <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
            </InputSlot>

            <InputField value={email} onChangeText={setEmail} placeholder="seu@email.com" />
          </Input>
        </FormControl>

        {/* SENHA */}
        <FormControl style={{ marginTop: 20 }} isInvalid={invalidCredentials}>
          <FormControlLabel style={styles.label}>
            <FormControlLabelText>Senha</FormControlLabelText>
          </FormControlLabel>

          <Input style={[styles.input, invalidCredentials && styles.inputError]}>
            <InputSlot>
              <Ionicons name="lock-closed-outline" size={20} style={styles.inputIcon} />
            </InputSlot>

            <InputField
              value={password}
              type={showPassword ? "text" : "password"}
              onChangeText={setPassword}
              placeholder="sua senha"
            />

            <InputSlot onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                style={styles.inputIcon}
              />
            </InputSlot>
          </Input>
        </FormControl>

        <Button style={styles.button} onPress={handleLogin}>
          <ButtonText style={styles.buttonText}>Entrar</ButtonText>
        </Button>
      </View>

      <ThemedText style={{ marginTop: 35, color: theme.textSecondary, textAlign: "center" }}>
        Não tem uma conta ?{"   "}
        <Link href="/signup" style={styles.signupLink}>
          <ThemedText style={{ color: theme.primary }}>Cadastre-se</ThemedText>
        </Link>
      </ThemedText>
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
    logo: {
      height: 150,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 50,
    },
    title: {
      fontSize: 28,
      marginBottom: 50,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
    },
    label: {
      marginBottom: 10,
      marginLeft: 5,
      color: theme.textSecondary,
      fontWeight: "bold",
    },
    input: {
      height: 65,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: theme.textSecondary,
      backgroundColor: theme.surface,
      color: theme.text,
    },
    inputIcon: {
      color: theme.icon,
      marginRight: 10,
    },
    inputError: {
      borderWidth: 2,
      borderColor: theme.error,
    },
    loginCard: {
      backgroundColor: theme.surface,
      paddingVertical: 50,
      paddingHorizontal: 20,
      borderRadius: 10,
      shadowColor: "#000",
    },

    button: {
      height: 65,
      borderRadius: 10,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },

    signupLink: {
      textAlign: "center",
      fontWeight: "bold",
      color: theme.primary,
    },
  });
