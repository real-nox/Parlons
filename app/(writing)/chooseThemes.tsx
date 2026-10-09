import Entete from "@/components/enteteComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import { ArrowRight, PenLine, Wand2 } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const themesProposes = [
  {
    title: "Un week-end sans écrans",
    type: "Donner son avis",
    desc: "Racontez votre expérience et ce qu’elle vous a apporté.",
  },
  {
    title: "Un projet pour mon quartier",
    type: "Donner son avis",
    desc: "Racontez votre expérience et ce qu’elle vous a apporté.",
  },
  {
    title: "Une sortie inoubliable",
    type: "Donner son avis",
    desc: "Racontez votre expérience et ce qu’elle vous a apporté.",
  },
];

export default function chooseThemes() {
  const [selected, setSelected] = useState<string>("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Entete title="Production écrite" />

        <View style={styles.topcontainer}>
          <View>
            <Text style={[globalStyle.title, { fontSize: 20 }]}>
              Choisissez un thème
            </Text>
            <Text style={globalStyle.subtitle}>
              Un sujet qui vous inspire, un texte à votre rythme. À vous de
              jouer !
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[globalStyle.subtitle, { fontWeight: "bold" }]}>
              Thèmes proposés
            </Text>
            <Text style={[globalStyle.subtitle, { paddingBottom: 5 }]}>
              120-160 mots
            </Text>
          </View>

          <View>
            <FlatList
              data={themesProposes}
              keyExtractor={(theme) => theme.title}
              renderItem={({ item }) => {
                const active = selected === item.title;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelected(item.title)}
                    accessibilityState={{ selected: active }}
                    style={[styles.gridItem, active && styles.chipActive]}
                  >
                    <Text
                      style={[
                        styles.itemTextTitle,
                        active && { color: globalColors.title2 },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.itemTextLabel}>{item.type}</Text>
                    <Text
                      style={[
                        styles.itemTextDescription,
                      ]}
                    >
                      {item.desc}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View>
            <View
              style={[
                styles.gridItem,
                { backgroundColor: "rgba(0, 77, 165, 0.11)" },
              ]}
            >
              <Text style={styles.itemTextTitle}>Envie d’autres idées ?</Text>
              <Text style={styles.itemTextLabel}>
                Découvrez de nouveaux sujets, toujours adaptés à votre niveau
                B1.
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: globalColors.link
                  },
                ]}
                disabled={!selected.length}
                onPress={() => router.replace("/pages/homepage")}
              >
                <Text style={[styles.buttonText, { color: globalColors.title2 }]}> Générer des thèmes</Text>
                <Wand2 color={globalColors.title2} size={20}/>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
                style={[
                  styles.button,
                  !selected.length && { opacity: 0.5 },
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                  },
                ]}
                disabled={!selected.length}
                onPress={() => router.replace("/(writing)/[id]")}
              >
                <Text style={styles.buttonText}> Écrire sur ce thème </Text>
                <PenLine color="white" size={20}/>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  wrapper: {
    width: "82.5%",
    gap: 25,
  },
  topcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridItem: {
    borderColor: "#ebebeb98",
    borderRadius: 10,
    borderWidth: 2,
    padding: 12.5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  itemTextTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5,
  },
  itemTextLabel: {
    fontWeight: "bold",
    fontSize: 11,
  },
  itemTextDescription: {
    color: "#818181",
    fontWeight: "bold",
    fontSize: 10,
  },
  chipActive: { backgroundColor: "#0042dd0a", borderColor: "#2B59C3" },
  chipLocked: { opacity: 0.8 },
  button: {
    marginTop: 20,
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
