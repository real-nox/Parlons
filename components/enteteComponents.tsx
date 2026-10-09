import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Entete({ title }: { title: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
          router.replace("/pages/homepage");
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <ArrowLeft />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {title}
        </Text>
      </Pressable>

      <View>
        <Text>NIVEAU B2</Text>
      </View>
    </View>
  );
}
