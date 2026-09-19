import { globalColors } from "@/constants/global";
import { View } from "react-native";

export default function BlueLine() {
  return (
    <View
      style={{
        width: "20%",
        height: 4,
        borderRadius: 15,
        backgroundColor: globalColors.title2,
        marginBottom: 10,
      }}
    ></View>
  );
}
