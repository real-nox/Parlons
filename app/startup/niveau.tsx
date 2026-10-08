import StepsComponents from "@/components/stepsComponents";
import TitleComponent from "@/components/titleComponents";
import { globalColors } from "@/constants/global";
import { niveaux } from "@/constants/niveaux";
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

export default function Niveaux() {
  const [selectedLevel, setSelectedLevel] = useState<string>("");


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftsubcontainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <TitleComponent size="small" />
          </View>
          <StepsComponents maxSteps={2} step={2} />
        </View>
        <Text style={styles.title}>Quel est votre niveau?</Text>
        <Text style={styles.p}>
          Choisissez le niveau qui vous ressemble. Vos productions écrites
          seront adaptées.
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
          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
            Proposer d'autre thèmes
          </Text>
        </View>
        <FlatList
          data={niveaux}
          numColumns={2}
          keyExtractor={(item) => item.title}
          style={{
            width: "100%",
            gap: 10,
          }}
          renderItem={({ item }) => {
            const active = selectedLevel === item.title
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedLevel(item.title)}
                accessibilityState={{ selected: active }}
                style={[
                  styles.gridItem,
                  active && styles.chipActive,
                ]}
              >
                <Text style={[styles.itemTextTitle, active && { color: globalColors.title2}]}>{item.title}</Text>
                <Text style={styles.itemTextLabel}>{item.label}</Text>
                <Text style={[styles.itemTextDescription, active && { color : globalColors.red, opacity : 0.5}]}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.leftsubcontainer}>
        <Text style={styles.p}>
          Vous pourrez changer de niveau à tout moment.
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedLevel.length && { opacity: 0.5 },
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              width: "100%",
            },
          ]}
          disabled={!selectedLevel.length}
          onPress={() => router.replace("/pages/homepage")}
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
    textAlign: "center",
  },
  boxContainer: {
    padding: 15,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "85%",
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
    alignItems: "flex-start",
  },
  itemTextTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
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
});
