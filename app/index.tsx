import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

GoogleSignin.configure({
  webClientId:
    "1003225010434-mic1vnej0uebslptrh5feekbtgoot80e.apps.googleusercontent.com",
});

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

      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {}}
          disabled={false}
        />
      </View>
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
