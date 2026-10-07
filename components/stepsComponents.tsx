import { globalColors } from "@/constants/global";
import { StyleSheet, Text, View } from "react-native";

export default function StepsComponents({
  step,
  maxSteps,
}: {
  step: number;
  maxSteps: number;
}) {
  return (
    <View style={styles.container}>
      <Text style={{
        color: globalColors.title2,
        fontWeight: "bold",
        fontSize: 15
      }}>{step} / { maxSteps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: globalColors.title2,
        padding: 15,
        paddingVertical: 8,
        borderRadius: 20
    }
})