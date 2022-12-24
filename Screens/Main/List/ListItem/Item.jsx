import TouchableScale from "react-native-touchable-scale";
import { ListItem, Avatar } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import { Text, View } from "react-native";
import { formatDistance, parseISO } from "date-fns";
import { styles } from "./style/ListItem.style";
import { useNavigation } from "@react-navigation/native";
const Item = ({
  id,
  text,
  user,
  color,
  color2,
  messagedate,
  photo = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
}) => {
  const arr = ["#16213e", "#0f3460", "#533483", "#e94560"];

  const tarih = formatDistance(parseISO(messagedate), new Date(), {
    addSuffix: true,
  });
  const navigation = useNavigation();
  return (
    <ListItem
      onPress={() => navigation.navigate("Detail", id)}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      linearGradientProps={{
        colors: [arr[color || 0], arr[color2 || 1]],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient}
    >
      <Avatar
        rounded
        source={{
          uri: photo,
        }}
      />
      <ListItem.Content>
        <View style={styles.header}>
          <View style={styles.userContainer}>
            <Text style={styles.user}>{user}</Text>
            <Text style={styles.tarih}>{tarih}</Text>
          </View>
          <Text style={styles.yazi}>{text}</Text>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default Item;
