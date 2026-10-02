import { StyleSheet } from "react-native";

export const globalColors = {
  title2: "rgb(0, 77, 165)",
  link: "#3d40ff",
  subtitle: "#858585",
};

export const globalStyle = StyleSheet.create({
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: globalColors.subtitle,
  },
});
