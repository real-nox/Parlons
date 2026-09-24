import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text>Welcome Rayane</Text>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
});
