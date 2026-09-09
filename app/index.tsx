import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  console.log(process.env.EXPO_PUBLIC_CLIENT_ID_GOOGLE_SIGN_IN);
  const [request, response, prompt] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_CLIENT_ID_GOOGLE_SIGN_IN,
  });
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
          Parl<Text style={{ color: "rgb(0, 77, 165)" }}>ons</Text>
        </Text>
        <Text style={styles.text}>Apprenez de vos erreurs</Text>
      </View>

      <View>
        <Button
          title="Sign in with Google"
          onPress={() => prompt}
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
