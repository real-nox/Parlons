import TitleComponent from "@/components/titleComponents";
import { globalColors } from "@/constants/global";
import { generateThemes } from "@/constants/themes";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const REQUIRED = 5;

export default function Themes() {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [themes, setThemes] = useState(() => generateThemes(10));

  const toggle = (id: string) => {
    setSelectedThemes((prev: any) => {
      if (prev.includes(id)) return prev.filter((x: string) => x !== id);
      if (prev.length >= REQUIRED) return prev;
      return [...prev, id];
    });
  };

  const regenerate = () => {
    setThemes(generateThemes(10));
    setSelectedThemes([]);
  };

  const ready = selectedThemes.length === REQUIRED;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftsubcontainer}>
        <TitleComponent size="small" />
        <Text style={styles.title}>Choisissez vos thèmes</Text>
        <Text style={styles.p}>
          Sélectionnez ce que vous souhaitez travailler. Vos exercices seront
          adaptés à vos objectifs.
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={() => regenerate()}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Proposer d'autre thèmes
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 13, color: globalColors.title2 }}>
            {selectedThemes.length} sélectionnés
          </Text>
        </View>
        <FlatList
          data={themes}
          numColumns={2}
          keyExtractor={(item) => item.id}
          style={{
            width: "100%",
            gap: 10,
          }}
          renderItem={({ item }) => {
            const active = selectedThemes.includes(item.id);
            const locked = !active && selectedThemes.length >= REQUIRED;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggle(item.id)}
                accessibilityState={{ selected: active, disabled: locked }}
                style={[
                  styles.gridItem,
                  active && styles.chipActive,
                  locked && styles.chipLocked,
                ]}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.leftsubcontainer}>
        <Text style={styles.p}>
          Vous pourrez modifier vos choix à tout moment depuis votre profil.
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            !ready && {opacity: 0.5},
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              width: "100%",
            },
          ]}
          disabled={!ready}
          onPress={() => router.replace("/startup/testpositionnement")}
        >
          <Text style={styles.buttonText}> Continuer</Text>
          <ArrowRight color="white" />
        </TouchableOpacity>
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
  leftsubcontainer: {
    width: "80%",
    marginTop: 5,
    paddingBottom: 30,
    alignItems: "flex-start",
  },
  subcontainer: {
    marginTop: "5%",
    paddingBottom: "15%",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  p: {
    fontSize: 14,
    color: globalColors.subtitle,
  },
  boxContainer: {
    padding: 15,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "82.5%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  themes: {
    borderColor: "#acacac",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  gridItem: {
    borderColor: "#ebebeb98",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    width: "47%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#555555",
    fontWeight: "bold",
    fontSize: 12,
  },

  chipActive: { backgroundColor: "#0042dd0a", borderColor: "#2B59C3" },
  chipLocked: { opacity: 0.8 },
});
