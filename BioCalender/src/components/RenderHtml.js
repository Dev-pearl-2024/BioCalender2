import React from "react";
import { View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { colors } from "../utilities/colors";

const RenderHtmlContent = (props) => {
  const { width } = useWindowDimensions();

  const source = {
    html: props.text
  };

  const tagsStyles = {
    body: {
      color: colors.WHITE,
      fontSize: 12
    },
    div: {
      color: colors.GREY,
      fontSize: 12
    },
    p: {
      color: colors.WHITE,
      fontSize: 12
    }
  };

  return (
    <View>
      <RenderHtml
        contentWidth={width}
        source={source}
        tagsStyles={tagsStyles}
      />
    </View>
  );
};

export default RenderHtmlContent;
