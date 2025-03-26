import React from "react";
import { View } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  // FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  FontAwesome5
} from "@expo/vector-icons";

export const IconTypes = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons
};

const Icon = ({ type, name, color, size = 24, style }) => {
  const IconComponent = IconTypes[type];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found.`);
    return <View />;
  }

  return <IconComponent name={name} size={size} color="white" style={style} />;
};

export default Icon;
