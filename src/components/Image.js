import { Image } from "react-native";
import React from "react";

const CustomImage = (props) => {
  return (
    <Image
      source={props?.source?.uri ? { uri: props?.source?.uri } : props?.source}
      style={[
        props?.style,
        {
          tintColor: props.tintColor
            ? props.tintColor
            : props?.style?.tintColor
            ? props?.style?.tintColor
            : undefined
        }
      ]}
      resizeMode={props?.resizeMode || "contain"} // Default to "contain"
    />
  );
};

export default CustomImage;
