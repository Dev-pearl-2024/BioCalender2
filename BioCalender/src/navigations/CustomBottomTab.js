import React, { useEffect } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import BottomTabImage from "../assests/images/bottomTabImage.png";
import HOME from "../assests/images/home.png";
import ACTIVEHOME from "../assests/images/homeFilled.png";
import ACTIVEPROFILE from "../assests/images/profileFilled.png";
import PROFILE from "../assests/images/profile.png";
import SETTINGS from "../assests/images/settings.png";
import ACTIVESETTINGS from "../assests/images/settingsFilled.png";
import Image from "../components/Image";
import TextComponent from "../components/TextComponent";
import { colors } from "../utilities/colors";

const ICONS = {
  Home: { default: HOME, active: ACTIVEHOME },
  Profile: { default: PROFILE, active: ACTIVEPROFILE },
  Settings: { default: SETTINGS, active: ACTIVESETTINGS }
};

const CustomBottomTab = ({ state, navigation }) => {
  useEffect(() => {
    console.log("Navigation State:", state);
  }, [state]);

  // Reorder tabs: [Settings, Home, Profile]
  const orderedRoutes = ["Settings", "Home", "Profile"].map((name) =>
    state.routes.find((route) => route.name === name)
  );

  return (
    <View>
      <ImageBackground
        style={styles.tabBarStyle}
        imageStyle={styles.imageStyle}
        source={BottomTabImage}
      >
        {orderedRoutes.map((route, index) => {
          const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)} // Home is now clickable
              style={index === 1 ? styles.activeItem : styles.inActiveItem}
            >
              <Image
                source={isFocused ? ICONS[route.name]?.active : ICONS[route.name]?.default}
                style={styles.icon}
                tintColor={colors.PRIMARY}
              />
              {index !== 1 && (
                <TextComponent style={styles.label} text={route.name} />
              )}
            </TouchableOpacity>
          );
        })}
      </ImageBackground>
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === "android" ? 70 : 80,
    width: 330,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageStyle: {
    resizeMode: "contain",
    alignSelf: "center"
  },
  icon: {
    height: 20,
    width: 20
  },
  label: {
    marginVertical: 2,
    fontSize: 11,
    width: 70,
    textAlign: "center",
    color: colors.WHITE
  },
  activeItem: {
    marginBottom: 100,
    backgroundColor: colors.GREEN,
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  inActiveItem: {
    alignItems: "center",
    justifyContent: "center"
  }
});
