import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from "react-native";
import { colors } from "../utilities/colors";
import { fonts } from "../utilities/fonts";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import TextComponent from "./TextComponent";
import BgHeader from "../assests/images/bgHeader.png"; // Background Image

const Header = (props) => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route

  useEffect(() => {
    console.log("Current Route Name:", route.name);
  }, [route]);

  return (
    <ImageBackground
      source={props.title !== "Home" && BgHeader}
      style={styles.container}
      imageStyle={styles.imageStyle}
    >
      {/* Left Icon (Back Button) */}

      <View style={styles.leftContainer}>
        {navigation.canGoBack() && props.title !== "Home" && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={24} color={colors.WHITE} />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      {route?.name !== "Home" && (
        <View style={styles.centerContainer}>
          <TextComponent
            text={props?.title ? props?.title : props?.route?.name}
            numberOfLines={2}
            style={styles.heading}
          />
        </View>
      )}

      {/* Right Icon (Profile or Menu) */}
      <View style={styles.rightContainer}>
        {route?.name === "Home" && (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color={colors.WHITE} />
          </TouchableOpacity>
        )}

        {route?.name === "Profile" && (
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Feather name="edit" size={24} color={colors.WHITE} />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically centered
    justifyContent: "space-between", // Space between left, center, and right
    width: "100%",
    height: 70,
    paddingHorizontal: 20
  },
  leftContainer: {
    width: "20%",
    alignItems: "flex-start",
    justifyContent: "center" // Center the back icon vertically
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center" // Center the text vertically
  },
  rightContainer: {
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center" // Center the right icons vertically
  },
  imageStyle: {
    width: Dimensions.get("window").width,
    height: "100%", // Ensures the background covers the full height
    resizeMode: "stretch"
  },
  heading: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: fonts.SEMI_BOLD,
    fontWeight: "bold",
    textAlign: "center"
  }
});
