import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import { FAB, Dialog } from "@rneui/themed";
import { styles } from "./style/list.style";
import InputModal from "./../../../Components/Modal/InputModal";
import database from "@react-native-firebase/database";
import Item from "./ListItem/Item";
import Lottie from "lottie-react-native";
const List = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const renderer = ({ item }) => {
    return (
      <Item
        text={item.text}
        user={item.userName}
        color={item.color}
        color2={item.color2}
        messagedate={item.date}
        id={item.id}
        photo={item?.user?.photoURL}
      />
    );
  };
  //exporting document id from firebase return and creating new array
  const parse = (data) => {
    try {
      return Object?.keys(data)?.map((item) => {
        return {
          id: item,
          ...data[item],
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Reading data from firebase and setting massages with parser function's return

  useEffect(() => {
    setLoading(true);
    database()
      .ref("messages/")
      .on("value", (veri) => {
        setMessages(parse(veri.val()));
        setLoading(false);
      });
  }, []);

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
      <FlatList
        data={messages?.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        })}
        renderItem={renderer}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        color="#0f3460"
        visible={!visible}
        onPress={() => setVisible(!visible)}
      />
      <InputModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default List;
