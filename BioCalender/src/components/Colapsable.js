import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../utilities/colors";
import TextComponent from "./TextComponent";
import Icon, { IconTypes } from "./Icon";
import RenderHtmlContent from "./RenderHtml";
import { Entypo } from "@expo/vector-icons";

const Colapsable = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setopen((prev) => !prev)}
        style={styles.headCont}
      >
        <TextComponent text={props.data.title} style={styles.quesText} />
        <Entypo
          name={open ? "chevron-up" : "chevron-down"}
          size={30}
          color={colors.WHITE}
        />
      </TouchableOpacity>
      {open && (
        <TextComponent text={props.data.description} style={styles.decText} />
      )}
    </View>
  );
};

export default Colapsable;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: `${colors.WHITE}50`,
    borderRadius: 15,
    marginVertical: 10
    // paddingVertical: 15,
  },
  headCont: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15
  },
  decText: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15
  },
  quesText: {
    fontSize: 16
  }
});
