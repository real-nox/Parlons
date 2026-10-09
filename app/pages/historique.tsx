import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { router } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const textes = [
  {
    title: "Mon voyage idéal",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
  {
    title: "Mon voyage idéal",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
  {
    title: "Mon voyage idéal",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
  {
    title: "Mon voyage idéal",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
  {
    title: "Le télétravail au quotidien",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
  {
    title: "Une rencontre marquante",
    date: "7 oct. 2026",
    niveau: "B1",
    nbrMots: "250",
  },
];

export default function Historique() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftsubcontainer}>
          <TitleComponent size="medium" />
        </View>

        {/* Top items */}
        <View>
          <Text style={[globalStyle.title, { fontSize: 20 }]}>
            Mes productions
          </Text>
          <Text style={globalStyle.subtitle}>
            Retrouvez vos textes et leurs corrections. Chaque essai vous fait
            progresser.
          </Text>
        </View>

        {/* Mes productions */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[globalStyle.title, { fontSize: 15 }]}>
              Vos dernières productions
            </Text>
          </View>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
            data={textes}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.Box}
                onPress={() => router.replace("/pages/historique")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{item.title}</Text>
                  <ChevronRightIcon color={globalColors.subtitle} width={20} />
                </View>
                <Text>
                  {item.date} {item.niveau}
                </Text>
                <Text>{item.nbrMots}</Text>
              </TouchableOpacity>
            )}
          />
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
    flex: 1,
    width: "82.5%",
    gap: 25,
  },
  leftsubcontainer: {
    marginTop: 5,
    alignItems: "flex-start",
  },
  Box: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    borderColor: "#d1d1d157",
    borderWidth: 1,
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
