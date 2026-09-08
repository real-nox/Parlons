import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={styles.containerTop}>
        <Text style={styles.title}>
          Corrig<Text style={{ color: "rgb(0, 77, 165)" }}>é</Text>
        </Text>
        <Text style={styles.text}>Apprenez de vos erreurs</Text>
      </View>

      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    alignItems: "center",
  },
  title: {
    paddingBottom: 15,
    fontWeight: "bold",
    fontSize: 40,
  },
  text: {
    fontSize: 16,
  },
});
