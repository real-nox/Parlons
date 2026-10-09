import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import { Pen, Plus } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftsubcontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
            }}
          >
            <View style={{ width: "100%" }}>
              <TitleComponent size="medium" />
            </View>
          </View>
        </View>

        {/* Top items */}
        <View style={styles.topcontainer}>
          <View>
            <Text style={[globalStyle.title, { fontSize: 20 }]}>
              Welcome, Rayane
            </Text>
            <Text style={globalStyle.subtitle}>
              Un peu de pratique, chaque jour.
            </Text>
          </View>
          <View>
            <Text>12 jours </Text>
          </View>
        </View>

        {/* New writing */}
        <View style={styles.writingBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Pen color={globalColors.red} />
            </View>
            <View>
              <Text>À vous d’écrire !</Text>
              <Text style={[globalStyle.subtitle, { fontSize: 10 }]}>
                Un thème à votre niveau, 120-160 mots.
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
              onPress={() => router.replace("/(writing)/chooseThemes")}
            >
              <Text style={styles.buttonText}> Nouvelle production</Text>
              <Plus color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mes productions */}

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[globalStyle.title, { fontSize: 15}]}>Mes productions</Text>
            <TouchableOpacity
              onPress={() => router.replace("/pages/historique")}
            >
              <Text style={{ color: globalColors.link, fontSize: 15 }}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          <View></View>
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
  leftsubcontainer: {
    marginTop: 5,
    alignItems: "flex-start",
  },
  writingContainer: {},
  writingBox: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 77, 165, 0.11)",
    borderRadius: 15,
  },
  button: {
    marginTop: 20,
    padding: 12.5,
    backgroundColor: globalColors.title2,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
