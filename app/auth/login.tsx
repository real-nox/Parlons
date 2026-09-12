import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <TitleComponent />
        <Text style={globalStyle.subtitle}>Apprenez en Parlons</Text>
      </View>

      <TextInput style={styles.input} placeholder="Adresse e-mail" />
      <TextInput style={styles.input} placeholder="Mot de passe" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
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

          <TouchableOpacity onPress={() => router.replace("/auth/register")}>
            <Text style={{ color: globalColors.link }}> S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  subcontainer: {
    marginTop: "5%",
    paddingBottom: "15%",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#6366F1",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  input: {
    textAlign: "left",
    width: "80%",
    borderWidth: 2.5,
    borderRadius: 35,
    borderColor: "rgba(173, 173, 173, 0.21)",
    paddingLeft: 15,
    marginBottom: 10,
  },
});
