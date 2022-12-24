import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  hr: {
    width: 900,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
