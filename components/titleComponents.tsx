import { globalColors, globalStyle } from "@/constants/global";
import { Text } from "react-native";
import BlueLine from "./lineComponents";

const getFontSize = (size: "small" | "medium" | "large"): number => {
  switch (size) {
    case "large":
      return 35;
    case "medium":
      return 28;
    case "small":
      return 15;
    default:
      return 35;
  }
};

const TitleComponent = ({ size }: { size: "small" | "medium" | "large" }) => {
  const textSize = getFontSize(size);

  return (
    <>
      <Text style={[globalStyle.title, { fontSize: textSize }]}>
        Parl<Text style={{ color: globalColors.title2 }}>ons</Text>
      </Text>
      <BlueLine />
    </>
  );
};

export default TitleComponent;
