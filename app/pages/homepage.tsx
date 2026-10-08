import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
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
        <View style={styles.writingBox}></View>

        {/* Mes productions */}

        <View>
          <Text style={ globalStyle.title }>Mes productions</Text>
          <TouchableOpacity onPress={() => router.replace("/pages/historique")}>
            <Text>Tout voir</Text>
          </TouchableOpacity>
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
    width: "80%",
    gap: 20,
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
    padding: 50,
    backgroundColor: globalColors.title2,
    opacity: 0.3,
    borderRadius: 15
  },
});
