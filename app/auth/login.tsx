import TitleComponent from "@/components/titleComponents";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TitleComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#6366F1",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
