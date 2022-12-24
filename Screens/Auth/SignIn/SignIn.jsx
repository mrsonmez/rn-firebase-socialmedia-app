import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Input, Button, Dialog } from "@rneui/themed";
import Ionicon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
import Lottie from "lottie-react-native";
const SignIn = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const scheme = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={scheme}
      onSubmit={async (values) => {
        await setVisible(true);
        await auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then((res) => navigation.replace("Main"))
          .catch((err) => {
            let hata;
            console.log(err.code);
            if (err.code == "auth/user-not-found") {
              hata = "E-mail or password is wrong.";
            } else if (err.code == "auth/wrong-password") {
              hata = "E-mail or password is wrong.";
            } else {
              hata = "Server error please try again later.";
            }
            return Alert.alert("Hata", hata);
          });
        await setVisible(false);
      }}
    >
      {({ handleChange, errors, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <Input
            placeholder="E-mail"
            leftIcon={<Ionicon name="mail" size={22} />}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
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
              autoPlay
              loop
            />
          </Dialog>
          <Input
            placeholder="password"
            leftIcon={<Ionicon name="lock-closed" size={22} />}
            secureTextEntry
            textContentType="password"
            onChangeText={handleChange("password")}
            errorMessage={errors.password}
            value={values.password}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title={"Login"}
              color={"#38c5f2"}
              onPress={handleSubmit}
            />
            <Button
              title={"Signup"}
              color={"#38c5f2"}
              onPress={() => navigation.navigate("SignUp")}
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
    justifyContent: "space-around",
  },
});

export default SignIn;
