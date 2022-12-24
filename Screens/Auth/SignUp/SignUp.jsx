import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Input, Button, Dialog } from "@rneui/themed";
import Ionicon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import Lottie from "lottie-react-native";
import { Formik } from "formik";
import * as yup from "yup";
const SignUp = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const scheme = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    fullname: yup.string().required(),
  });
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: "",
      }}
      validationSchema={scheme}
      onSubmit={async (values) => {
        await setVisible(true);
        await auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((item) => {
            item.user.updateProfile({ displayName: values.fullname });
            navigation.replace("Main");
          })
          .catch((err) => {
            let hata;
            console.log(err.message);
            if (err.code == "auth/email-already-in-use") {
              hata = "This E-mail is already in use.";
            } else {
              hata = "Server error please try again later.";
            }
            return Alert.alert("Error", hata);
          });
        await setVisible(false);
      }}
    >
      {({ handleChange, errors, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <Input
            placeholder="Fullname"
            leftIcon={<Ionicon name="person" size={22} />}
            autoFocus
            onChangeText={handleChange("fullname")}
            errorMessage={errors.fullname}
            value={values.fullname}
          />
          <Input
            placeholder="E-mail"
            leftIcon={<Ionicon name="mail" size={22} />}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={handleChange("email")}
            errorMessage={errors.email}
            value={values.email}
          />
          <Dialog
            visible={visible}
            onBackdropPress={() => setVisible(!visible)}
            overlayStyle={{
              padding: 85,
            }}
          >
            <Lottie
              source={require("../../../assets/loading.json")}
              autoplay
              loop
            />
          </Dialog>
          <Input
            placeholder="Password"
            leftIcon={<Ionicon name="lock-closed" size={22} />}
            secureTextEntry
            textContentType="password"
            onChangeText={handleChange("password")}
            errorMessage={errors.password}
            value={values.password}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={"Kayıt Ol"}
              color={"#38c5f2"}
              onPress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SignUp;
