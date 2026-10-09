import Entete from "@/components/enteteComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import { AlignLeft, PenLine, Save } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductionEcrite() {
  const [texte, setTexte] = useState<string>("");
  const insets = useSafeAreaInsets();

  const nbMots = useMemo(() => {
    const t = texte.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [texte]);

  const objectifAtteint = nbMots >= 120 && nbMots <= 160;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
          <View style={styles.wrapper}>
            <Entete title="Votre texte" />

            <View
              style={{
                backgroundColor: "#0042dd0a",
                padding: 10,
                marginTop: 5,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                DONNER SON AVIS
              </Text>
              <Text
                style={[globalStyle.title, { fontSize: 18, paddingBottom: 5 }]}
              >
                Un week-end sans écrans
              </Text>
              <Text style={[globalStyle.subtitle, { fontSize: 12 }]}>
                Vous avez passé un week-end sans téléphone ni ordinateur.
                Racontez cette expérience, décrivez vos activités et donnez
                votre avis sur les bienfaits d’une pause numérique.
              </Text>
              <View style={[styles.row, { paddingTop: 5 }]}>
                <AlignLeft size={12} fontWeight={"bold"} />
                <Text style={{ fontSize: 12 }}>120 à 160 mots</Text>
              </View>
            </View>

            <Text>Votre production</Text>

            <View style={styles.card}>
              <TextInput
                multiline
                style={styles.input}
                value={texte}
                onChangeText={setTexte}
                placeholder="Écrivez ici..."
              />
              <View style={styles.footer}>
                <Text
                  style={[
                    globalStyle.subtitle,
                    {
                      fontSize: 12,
                      color: objectifAtteint ? "green" : globalColors.title2,
                    },
                  ]}
                >
                  {nbMots} mots
                </Text>
                <Text style={[globalStyle.subtitle, { fontSize: 12 }]}>
                  Objectif: 120-160
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                  },
                ]}
                onPress={() => router.replace("/pages/homepage")}
              >
                <Text style={styles.buttonText}> Sauvegarder votre production écrite </Text>
                <Save color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  wrapper: {
    flex: 1,
    width: "85.5%",
    gap: 10,
    paddingBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#85858563",
    padding: 12,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Manrope",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#85858563",
  },
  button: {
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
