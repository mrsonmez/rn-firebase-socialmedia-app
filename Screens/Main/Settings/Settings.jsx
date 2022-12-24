import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "@rneui/base";
import auth from "@react-native-firebase/auth";
import { Avatar, Dialog, Text } from "@rneui/themed";
import * as ImagePicker from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import Lottie from "lottie-react-native";
import { useState } from "react";
const Settings = () => {
  const [loading, setLoading] = useState(false);
  const ref = storage().ref(auth()?.currentUser?.email);
  const handlePhoto = async () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        return false;
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        const task = ref.putFile(`${source.uri}`);
        task.on("state_changed", (taskSnapshot) => {
          setLoading(true);
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
          );
        });
        task.then(async () => {
          const url = await storage()
            .refFromURL(
              `gs://socialapp-8274a.appspot.com/${auth().currentUser.email}`
            )
            .getDownloadURL();
          await auth().currentUser.updateProfile({
            photoURL: url,
          });
          setLoading(false);
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Dialog
        isVisible={loading}
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
      <View style={styles.infoContainer}>
        <Avatar
          size={55}
          rounded
          source={{
            uri:
              auth()?.currentUser?.photoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
          }}
          onPress={handlePhoto}
          containerStyle={{ backgroundColor: "coral" }}
        />
        <Text>{auth()?.currentUser?.displayName}</Text>
        <Text>{auth()?.currentUser?.email}</Text>
      </View>

      <Button title={"Logout"} onPress={() => auth().signOut()} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "center",
    padding: 15,
    alignItems: "center",
  },
});
export default Settings;
