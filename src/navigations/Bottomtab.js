import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "../screens/Home/Home";
// import Profile from "../screens/Profile/Profile";
// import Settings from "../screens/Settings/Settings";
import CustomBottomTab from "./CustomBottomTab";
import Settings from "../screens/Settings/Settings";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20
  }
});
