import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Components
import TitleComponent from "@/components/titleComponents";
import { globalStyle } from "@/constants/global";

export default function Index() {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (!accessToken) return router.push("/auth/login");
  }, [accessToken]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={styles.containerTop}>
        <TitleComponent />
        <Text style={globalStyle.subtitle}>Apprenez en Parlons</Text>
      </View>

      <View>
        <Button title="Sign in" disabled={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    alignItems: "center",
  },
});
