import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { signUp } from "@/services/auth";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [nom, setNom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const insets = useSafeAreaInsets();

  const rules = [
    { label: "8 caractères minimum", valid: pwd.length >= 8 },
    { label: "1 majuscule", valid: /[A-Z]/.test(pwd) },
    { label: "1 minuscule", valid: /[a-z]/.test(pwd) },
    { label: "1 chiffre", valid: /\d/.test(pwd) },
    { label: "1 caractère spécial", valid: /[^A-Za-z0-9]/.test(pwd) },
  ];

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const valid = nom.length > 5 && emailValid && rules.every((r) => r.valid);

  const [loading, setLoading] = useState(false);

  const creerCompte = async () => {
    if (!valid || loading) return;
    setLoading(true);
    const result = await signUp(email.trim(), pwd, nom.trim());
    setLoading(false);

    if (!result.success) {
      Alert.alert(
        "Inscription impossible",
        result.error ?? "Une erreur est survenue.",
      );
    }

    router.replace({ pathname: "/auth/login", params: { email: email.trim() } });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <View style={styles.leftsubcontainer}>
          <TitleComponent size="small" />
          <Text style={[globalStyle.title, { fontSize: 22.5 }]}>
            Créez votre compte
          </Text>
          <Text style={globalStyle.subtitle}>
            Quelques informations, et vos révisions peuvent commencer.
          </Text>
        </View>
        <View style={styles.containerRegister}>
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            style={styles.input}
            placeholder="Rayane Sirri"
            onChangeText={(nom) => setNom(nom)}
          />

          <Text style={styles.label}>Adresse e-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Adresse e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={[styles.input, { marginBottom: 5 }]}
            placeholder="Mot de passe"
            secureTextEntry
            autoCapitalize="none"
            textContentType="newPassword"
            value={pwd}
            onChangeText={setPwd}
          />

          <View style={styles.rules}>
            {rules.map((rule) => (
              <Text
                key={rule.label}
                style={[styles.rule, rule.valid && styles.ruleValid]}
              >
                {rule.valid ? "✓" : "•"} {rule.label}
              </Text>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                width: "86%",
                marginBottom: 20,
              },
              (!valid || loading) && { opacity: 0.5 },
            ]}
            disabled={!valid || loading}
            onPress={creerCompte}
          >
            <Text style={styles.buttonText}>
              {loading ? "Création..." : "Créer mon compte"}
            </Text>
            <ArrowRight color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.subcontainer}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>Vous avez déjà un compte ? </Text>

            <TouchableOpacity onPress={() => router.replace("./login")}>
              <Text style={{ color: globalColors.link }}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  subcontainer: {
    marginTop: "5%",
    paddingBottom: "15%",
    alignItems: "center",
  },
  leftsubcontainer: {
    width: "75%",
    marginTop: "5%",
    paddingBottom: 20,
    alignItems: "flex-start",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  button: {
    marginTop: 20,
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
    width: "86%",
    fontSize: 13,
    paddingBottom: 5,
    fontWeight: "500",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  input: {
    textAlign: "left",
    width: "86%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgba(173, 173, 173, 0.21)",
    paddingLeft: 15,
    marginBottom: 15,
  },
  containerRegister: {
    paddingTop: 30,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "82.5%",
    alignItems: "center",
  },

  rules: { width: "82.5%", marginTop: 6, gap: 2 },
  rule: { fontSize: 12, color: "#9CA3AF" },
  ruleValid: { color: "#16A34A" },
});
