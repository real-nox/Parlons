import TitleComponent from "@/components/titleComponents";
import { globalColors } from "@/constants/global";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Themes() {
  const DATA = Array.from({ length: 12 }, (_, i) => ({
    id: `${i}`,
    title: `Item ${i + 1}`,
  }));
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
        <FlatList
          data={DATA}
          numColumns={2}
          keyExtractor={(item) => item.id}
          style={{
            width: "100%",
            gap: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridItem}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.leftsubcontainer}>
        <Text style={styles.p}>
          Vous pourrez modifier vos choix à tout moment depuis votre profil.
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
            },
          ]}
          onPress={() => router.replace("/auth/register")}
        >
          <Text style={styles.buttonText}> Se connectez</Text>
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
    padding: 25,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderRadius: 5,
    boxShadow: "0px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    width: "82.5%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
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
    borderColor: "#acacac",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    width: "45%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: globalColors.link,
    fontWeight: "bold",
  },
});
