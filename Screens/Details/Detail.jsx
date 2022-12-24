import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style/Detail.style";
import database from "@react-native-firebase/database";
import { Avatar, Button, ListItem } from "@rneui/themed";
import Ionicon from "react-native-vector-icons/Ionicons";
const Detail = ({ route }) => {
  const [data, setData] = useState([]);
  const [replys, setReplys] = useState([]);
  const { params } = route;
  console.log(params);
  useEffect(() => {
    database()
      .ref(`messages/${params}`)
      .on("value", (item) => {
        setData(item.val());
      });
  }, []);
  const handleLike = () => {
    database()
      .ref(`messages/${params}`)
      .set({
        ...data,
        like: data?.like + 1 || 1,
      })
      .then(console.log("Success"))
      .catch((err) => console.log(err.message));
  };
  const handleDislike = () => {
    database()
      .ref(`messages/${params}`)
      .set({
        ...data,
        dislike: data?.dislike + 1 || 1,
      })
      .then(console.log("Success"))
      .catch((err) => console.log(err.message));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ListItem>
        <ListItem.Content>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Avatar
                rounded
                size={30}
                source={{
                  uri:
                    data?.user?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                }}
              />
              <Text style={styles.title}>@{data.userName}</Text>
            </View>
            <View style={styles.hr}></View>
            <Text>{data.text}</Text>
          </View>
        </ListItem.Content>
      </ListItem>
      <View style={styles.button}>
        <View style={styles.button}>
          <Button onPress={handleLike} icon={<Ionicon name="chevron-up" />} />
          <Text>{data?.like}</Text>
        </View>
        <View style={styles.button}>
          <Button
            onPress={handleDislike}
            icon={<Ionicon name="chevron-down" />}
          />
          <Text>{data?.dislike}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
