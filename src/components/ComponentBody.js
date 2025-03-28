import {
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  View
} from "react-native";
import React from "react";
import BG from "../assests/images/bg1.png";
import Image from "./Image";

const ComponentBody = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      {/* {Platform.OS === "ios" && ( */}
        <Image
          source={BG}
          style={{ height: "100%", width: "100%", position: "absolute" }}
          resizeMode={"cover"}
        />
      {/* )} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={[
          { alignItems: props?.center ? "center" : null },
          props.contentContainerStyle
        ]}
        style={{ ...props?.style }}
      >
        {props?.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ComponentBody;

const styles = StyleSheet.create({});
