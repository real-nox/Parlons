import { globalStyle } from "@/constants/global";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={[globalStyle.title, { fontSize: 20 }]}>
            Welcome, Rayane
          </Text>
          <Text>Prêt pour révisions?</Text>
        </View>
        <View>
          <Text>12 jours </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
  },
});
