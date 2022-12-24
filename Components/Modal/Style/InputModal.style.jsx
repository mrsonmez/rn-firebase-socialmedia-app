import { StyleSheet, Dimensions } from "react-native";
const size = Dimensions.get("window");
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: size.height / 3,
  },
  modalstyle: {
    flex: 1,
    justifyContent: "flex-end",
    margin: -10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    maxHeight: size.height / 4.5,
  },
  button: {
    backgroundColor: "#0f3460",
  },
});

export const { modalContainer, modalstyle, inputContainer, input, button } =
  styles;
