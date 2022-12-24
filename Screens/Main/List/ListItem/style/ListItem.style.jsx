import { Dimensions, StyleSheet } from "react-native";
const size = Dimensions.get("window");
export const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userContainer: {
    flexDirection: "row",
  },
  user: {
    color: "white",
  },
  yazi: {
    padding: 3,
    fontSize: 15,
    fontWeight: "bold",
  },
  tarih: {
    position: "absolute",
    top: 35,
    left: 205,
    fontSize: 12,
    color: "white",
  },
});
