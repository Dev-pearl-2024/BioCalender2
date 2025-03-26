import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors } from "../utilities/colors";
import { fonts } from "../utilities/fonts";

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: `${props?.color ? props?.color : colors?.GREEN}95`,
          borderWidth: 3,
          backgroundColor: props?.color ? props?.color : colors?.GREEN,
          borderBottomColor: `${props?.color ? props?.color : colors?.GREEN}95`,
          ...props?.style
        }
      ]}
      onPress={props?.onPress}
      disabled={props?.disabled}
    >
      <View>{props?.LeftIcon ? props?.LeftIcon : null}</View>

      <Text
        style={[
          styles.button_text,
          {
            color: props?.light ? colors?.BLACK : colors?.WHITE,
            ...props?.Textstyle
          }
        ]}
      >
        {props?.title}
      </Text>
      <View>{props?.icon ? props?.icon : null}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginVertical: 10,
    gap: 5
  },
  button_text: {
    fontSize: 14,
    fontFamily: fonts?.SEMI_BOLD
  }
});
