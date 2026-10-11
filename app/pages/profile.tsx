import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { signOut } from "@/services/auth";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profil() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftsubcontainer}>
          <TitleComponent size="medium" />
        </View>

        {/* Top items */}
        <View>
          <Text style={[globalStyle.title, { fontSize: 20 }]}>
            Mon profile
          </Text>
          <Text style={globalStyle.subtitle}>
            Section en cours de construction, merci pour votre comprehension!
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={signOut}>
            <Text style={{color: globalColors.red}}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center", height: "60%"}}>
            <LottieView
        source={require("../../assets/gifs/Under Maintenance.json")}
        style={{ width: 250, height: 250 }}
        autoPlay
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
});
