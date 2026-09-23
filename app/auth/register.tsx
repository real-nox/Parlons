import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
        <TextInput style={styles.input} placeholder="Rayane Sirri" />

        <Text style={styles.label}>Adresse e-mail</Text>
        <TextInput style={styles.input} placeholder="Adresse e-mail" />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput style={styles.input} placeholder="Mot de passe" />

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
          ]}
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={styles.buttonText}> Créer mon compte</Text>
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

          <TouchableOpacity onPress={() => router.replace("/auth/login")}>
            <Text style={{ color: globalColors.link }}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  containerRegister: {
    paddingTop: 30,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "82.5%",
    alignItems: "center",
  },
});
