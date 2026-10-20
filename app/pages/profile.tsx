import TitleComponent from "@/components/titleComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { useAuthContext } from "@/hooks/auth.context";
import { signOut } from "@/services/auth";
import { LucideSquareArrowRightExit } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profil() {
  const { profile, email } = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftsubcontainer}>
          <TitleComponent size="medium" />
        </View>
        {/* Top items */}
        <View>
          <Text style={[globalStyle.title, { fontSize: 20 }]}>Mon profil</Text>
          <Text style={globalStyle.subtitle}>
            Section en cours de construction, merci pour votre comprehension!
          </Text>
        </View>

        <View style={styles.Box}>
          <View>
            <View
              style={{
                backgroundColor: globalColors.title3,
                opacity: 0.5,
                borderRadius: 50,
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {profile.username[0]}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {profile.username}
            </Text>
            <Text style={globalStyle.subtitle}>{email}</Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: globalColors.link,
                  fontWeight: "bold",
                  opacity: 0.7,
                }}
              >
                Modifier mon profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text>Mon compte</Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={signOut}
          >
            <LucideSquareArrowRightExit color={globalColors.red} />
            <Text style={{ color: globalColors.red, fontWeight: "bold" }}>
              Se déconnecter
            </Text>
          </TouchableOpacity>
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
    borderColor: "#5b5b5b4c",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 5,
    alignItems: "center",
  },
});
