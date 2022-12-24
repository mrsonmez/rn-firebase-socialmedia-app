import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as yup from "yup";
import {
  modalstyle,
  modalContainer,
  inputContainer,
  button,
  input,
} from "./Style/InputModal.style";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
const InputModal = ({ visible, setVisible }) => {
  const scheme = yup.object({
    message: yup.string().required().min(8),
  });

  const sender = (message) => {
    let color2;
    color2 = Math.round(Math.random() * 3);
    const color = Math.floor(Math.random() * 4);
    database()
      .ref("messages/")
      .push({
        text: message,
        userName: auth().currentUser.email.split("@")[0],
        date: new Date().toISOString(),
        color: color,
        color2: color2,
        user: auth().currentUser.toJSON(),
      });
  };

  return (
    <Modal
      style={modalstyle}
      isVisible={visible}
      onBackdropPress={() => setVisible(!visible)}
      onBackButtonPress={() => setVisible(!visible)}
      onDismiss={() => setVisible(!visible)}
      swipeDirection="down"
    >
      <View style={modalContainer}>
        <Formik
          validationSchema={scheme}
          initialValues={{
            message: "",
          }}
          onSubmit={async (values) => {
            await sender(values.message);
            await setVisible(!visible);
          }}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <View style={inputContainer}>
              <Input
                onChangeText={handleChange("message")}
                placeholder="Your Message..."
                multiline
                value={values.message}
                inputStyle={input}
                errorMessage={errors.message}
              />
              <Button
                buttonStyle={button}
                onPress={handleSubmit}
                title={"Send"}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default InputModal;
