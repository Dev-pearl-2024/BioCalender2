import { Text } from "react-native";
import React from "react";
import { colors } from "../utilities/colors";
import { fonts } from "../utilities/fonts";

const TextComponent = (props) => {
  return (
    <Text
      onTextLayout={props?.onTextLayout}
      numberOfLines={props?.numberOfLines}
      style={[
        {
          color: props.color ? props.color : colors?.WHITE,
          fontFamily: fonts?.REGULAR
        },
        props?.style
      ]}
      allowFontScaling={false}
    >
      {props?.text}
    </Text>
  );
};

export default TextComponent;
