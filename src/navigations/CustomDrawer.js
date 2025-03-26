import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  FlatList
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Linking from "expo-linking";

import LOGO from "../assests/images/logo.png";
import Image from "../components/Image";
import ComponentBody from "../components/ComponentBody";
import TextComponent from "../components/TextComponent";
import { colors } from "../utilities/colors";
import { fonts } from "../utilities/fonts";
import Icon, { IconTypes } from "../components/Icon";
import CustomSwitch from "../components/Switch";
import profile from "../assests/images/Avatar.png";

import { useDispatch, useSelector } from "react-redux";
import UsersMiddleware from "../Store/Middlewares/UsersMiddleware";
import { AuthMiddleware } from "../Store/Middlewares/AuthMiddleware";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.AuthReducer.user);
  const notificationSwitch = useSelector(
    (state) => state.UsersReducer.notificationSwitch
  );

  const onToggleSwitch = () => {
    dispatch(UsersMiddleware.notificationSwitch());
  };

  const openUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Unable to open the link.");
    }
  };

  const onLogout = () => {
    dispatch(AuthMiddleware.logOut());
  };

  const onPressLogout = () => {
    Alert.alert("Hold on!", "Are you sure you want to logout?", [
      { text: "No", style: "cancel" },
      { text: "YES", onPress: onLogout }
    ]);
  };

  const onPressDelete = () => {
    Alert.alert("Hold on!", "Are you sure you want to delete your account?", [
      { text: "No", style: "cancel" },
      { text: "YES", onPress: () => dispatch(AuthMiddleware.deleteAccount()) }
    ]);
  };

  const screens = [
    { id: 1, screenName: "Daily Calendar", goto: "Calendar" },
    { id: 2, screenName: "Team BIOS", goto: "TeamBios" },
    { id: 3, screenName: "Subscription", goto: "Subscription" },
    { id: 4, screenName: "FAQ", goto: "FAQ" },
    { id: 5, screenName: "Terms & Conditions", goto: "TermsAndConditions" },
    { id: 6, screenName: "Privacy Policy", goto: "PrivacyPolicy" },
    { id: 7, screenName: "About Us", goto: "Aboutus" },
    { id: 8, screenName: "Help Centre", goto: "HelpCenter" },
    { id: 9, screenName: "Visit Website", url: "https://biocalendar.net" },
    // { id: 10, screenName: "PaymentMethod", goto:"PaymentMethod" }
  ];

  const screens2 = screens.filter((item) => item.screenName !== "Subscription");

  return (
    <View style={{ flex: 1, gap: 20 }}>
      <View style={styles.headerDrawer}>
        <View style={styles.innerHeadCont}>
          <Image
            resizeMode="cover"
            source={
              userdata?.profile_image
                ? { uri: userdata?.profile_image }
                : profile
            }
            style={styles.profImage}
            // tintColor={colors.PRIMARY}
          />
          <TextComponent text={userdata?.name} style={styles.nameText} />
        </View>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon
            name="close"
            type={IconTypes.Ionicons}
            size={30}
            color={colors.GREEN}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={!userdata?.is_show_subscription ? screens : screens2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                if (item?.url) {
                  openUrl(item?.url);
                } else {
                  props.navigation.navigate(item?.goto);
                }
              }}
            >
              <TextComponent text={item.screenName} style={styles.text} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View>
        <TouchableOpacity style={styles.logout} onPress={onPressDelete}>
          <TextComponent text="Delete Account" style={styles.logout_txt} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={onPressLogout}>
          <TextComponent text="Logout" style={styles.logout_txt} />
        </TouchableOpacity>

        <TouchableOpacity disabled style={styles.logout}>
          <TextComponent text="Version 1.0.3" style={{ color: "#ccc" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 15,
    borderBottomColor: "none",
    marginVertical: 5
  },
  headerDrawer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  innerHeadCont: {
    gap: 20,
    alignItems: "center"
  },
  profImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GREEN,
    resizeMode: "cover",
    marginLeft: 10
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontWeight: "bold"
  },
  nameText: {
    color: colors.GREEN,
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 16
  },
  logout: {
    gap: 8,
    marginLeft: 20,
    marginBottom: 25
  },
  logout_txt: {
    color: colors.BLACK,
    fontWeight: "bold",
    fontSize: 14
  }
});
