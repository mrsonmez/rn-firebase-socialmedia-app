import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignIn from "./../Screens/Auth/SignIn/SignIn";
import SignUp from "../Screens/Auth/SignUp/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import Ionicon from "react-native-vector-icons/Ionicons";
import List from "./../Screens/Main/List/List";
import Settings from "./../Screens/Main/Settings/Settings";
import Detail from "./../Screens/Details/Detail";
const Router = () => {
  const Tabs = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const TabNavigator = () => {
    const nav = useNavigation();
    useEffect(() => {
      auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log("User not found =>", user);
          nav.navigate("SignIn");
        }
      });
    }, []);

    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0f3460",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Home"
          options={{
            headerTitleAlign: "center",
            headerTitle: "Home",
          }}
          component={List}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            headerTitleAlign: "center",
            headerTitle: "Settings",
          }}
          component={Settings}
        />
      </Tabs.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
          }}
          component={TabNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Detail"
          options={{ title: "" }}
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
