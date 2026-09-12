import { globalColors, globalStyle } from "@/constants/global";
import { Text } from "react-native";

const TitleComponent = () => (
  <Text style={globalStyle.title}>
    Parl<Text style={{ color: globalColors.title2 }}>ons</Text>
  </Text>
);

export default TitleComponent;
