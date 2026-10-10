import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { signIn } from "@/services/auth";
import { router, useLocalSearchParams } from "expo-router";
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

export default function LoginScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState<string>(params.email ?? "");
  const [pwd, setPwd] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const valid = emailValid && pwd.length > 0;

  const seConnecter = async () => {
    if (!valid || loading) return;
    setLoading(true);
    const result = await signIn(email.trim(), pwd);
    setLoading(false);

    if (!result.success) {
      Alert.alert(
        "Inscription impossible",
        result.error ?? "Une erreur est survenue.",
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.leftsubcontainer}>
          <TitleComponent size="small" />
          <Text style={[globalStyle.title, { fontSize: 22.5 }]}>
            Heureux de vous revoir
          </Text>
          <Text style={globalStyle.subtitle}>
            Connectez-vous pour reprendre vos révisions là où vous les avez
            laissées
          </Text>
        </View>

        <View style={styles.containerLogin}>
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

          <View
            style={{
              width: "80%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => router.replace("/auth/register")}>
              <Text style={{ color: globalColors.link, fontSize: 12.5 }}>
                {" "}
                Mot de pass oublié ?
              </Text>
            </TouchableOpacity>
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
              },
              (!valid || loading) && { opacity: 0.5 },
            ]}
            disabled={!valid || loading}
            onPress={seConnecter}
          >
            <Text style={styles.buttonText}>
              {loading ? "Connexion..." : "Se connectez"}
            </Text>
            <ArrowRight color="white" />
          </TouchableOpacity>

          <View style={styles.subcontainer}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text>Pas encore de compte ?</Text>

              <TouchableOpacity
                onPress={() => router.replace("/auth/register")}
              >
                <Text style={{ color: globalColors.link }}> S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
    paddingBottom: "15%",
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
  containerLogin: {
    paddingTop: 30,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "82.5%",
    alignItems: "center",
  },
});
