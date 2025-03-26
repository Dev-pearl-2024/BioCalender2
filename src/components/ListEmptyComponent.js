import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import from Expo
import TextComponent from "./TextComponent";
import { colors } from "../utilities/colors";

const ListEmptyComponent = (props) => {
  return (
    <View style={styles.view}>
      <AntDesign
        color={colors.PRIMARY}
        size={props?.short ? 25 : 30}
        name="fileunknown"
      />
      <TextComponent
        style={{ fontSize: props?.short ? 12 : 14, top: 3 }}
        text={`No ${props?.title ? props?.title : "data"} found`}
      />
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    marginTop: 20
  }
});
