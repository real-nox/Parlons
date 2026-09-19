import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Components
import TitleComponent from "@/components/titleComponents";
import { globalStyle } from "@/constants/global";
import { router } from "expo-router";

export default function Index() {
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <TitleComponent size="large" />
        <Text style={globalStyle.subtitle}>Apprenez en Parlons</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            },
          ]}
          onPress={() => router.replace("/auth/register")}
        >
          <Text style={styles.buttonText}> Créer mon compte</Text>
          <ArrowRight color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => router.replace("/auth/register")}
        >
          <Text style={styles.buttonText2}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#6366F1",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  button2: {
    marginTop: 20,
    padding: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1a161625",
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  buttonText2: { color: "black", fontWeight: "bold" },
});
