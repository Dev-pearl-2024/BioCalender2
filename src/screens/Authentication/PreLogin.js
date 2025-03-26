import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Button from "../../components/Button";
import LOGO from "../../assests/images/logoBg.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import * as AppleAuthentication from "expo-apple-authentication";
import jwtDecode from "jwt-decode";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Icon, { IconTypes } from "../../components/Icon";
// import {
//   GoogleSignin,
//   statusCodes
// } from "@react-native-google-signin/google-signin";

const PreLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

//   useEffect(() => {
//     GoogleSignin.configure({
//       offlineAccess: true,
//       webClientId:
//         "563319386292-chd28c5hq4dnfdgvf6kdh3ld7cj4t4n6.apps.googleusercontent.com"
//     });

//     return () => {
//       GoogleSignin.revokeAccess(); // Corrected method
//     };
//   }, []);

  const onPressGoogleLogin = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();

    //   if (userInfo?.user?.email) {
    //     const userData = {
    //       email: userInfo.user.email,
    //       first_name: userInfo.user.givenName,
    //       last_name: userInfo.user.familyName
    //     };
    //     dispatch(AuthMiddleware.social_login(userData));
    //   }
    // } catch (error) {
    //   console.log("Google Sign-In Error:", error);
    //   if (error.code) {
    //     switch (error.code) {
    //       case statusCodes.SIGN_IN_CANCELLED:
    //         console.log("User cancelled the login flow");
    //         break;
    //       case statusCodes.IN_PROGRESS:
    //         console.log("Sign-in already in progress");
    //         break;
    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //         console.log("Play services not available or outdated");
    //         break;
    //       default:
    //         console.log(error);
    //     }
    //   }
    // }
  };

  const onPressAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      const decodedToken = jwtDecode(credential.identityToken);
      const { email, sub } = decodedToken;

      let name = credential.fullName?.givenName
        ? `${credential.fullName.givenName} ${credential.fullName.familyName}`
        : await AsyncStorage.getItem("@IOSLogin");

      if (credential.fullName?.familyName) {
        await AsyncStorage.setItem("@IOSLogin", name);
      }

      if (email || name) {
        dispatch(
          AuthMiddleware.social_login({
            email: email,
            first_name: name?.split(" ")[0],
            last_name: name?.split(" ")[1]
          })
        );
      } else {
        dispatch(showAlert({ message: "Failed.", type: "Error" }));
      }
    } catch (error) {
      console.log("Apple Sign-In Error:", error);
    }
  };

  return (
    <ComponentBody center>
      <Image source={LOGO} style={styles.logo} />
      <TextComponent text={"Pre Login"} style={styles.heading} />

      <Button
        title={"Sign in with Email"}
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
        LeftIcon={
          <Icon
            name={"mail"}
            type={IconTypes.Foundation}
            size={20}
            color={colors.WHITE}
          />
        }
      />
      <Button
        title={"Sign in with Google"}
        color={colors.RED}
        onPress={onPressGoogleLogin}
        style={styles.button}
        LeftIcon={
          <Icon
            name={"google"}
            type={IconTypes.AntDesign}
            size={20}
            color={colors.WHITE}
          />
        }
      />
      {Platform.OS === "ios" && (
        <Button
          title={"Sign in with Apple"}
          onPress={onPressAppleLogin}
          style={styles.button}
          color={colors.WHITE}
          Textstyle={{ color: colors.BLACK }}
          LeftIcon={
            <Icon
              name={"apple1"}
              type={IconTypes.AntDesign}
              size={20}
              color={colors.BLACK}
            />
          }
        />
      )}
      <View style={styles.wide_row}>
        <TextComponent
          text={"By signing up, you agree to our"}
          style={styles.span3}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            <TextComponent
              text={"Terms & Conditions"}
              style={styles.linkBlue}
            />
          </TouchableOpacity>
          <TextComponent text={" and "} style={{ color: colors.WHITE }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <TextComponent text={"Privacy Policy"} style={styles.linkBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </ComponentBody>
  );
};

export default PreLogin;

const styles = StyleSheet.create({
  logo: {
    width: 310,
    height: 310,
    position: "absolute"
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 230,
    color: colors.WHITE,
    marginBottom: 10
  },
  span3: {
    color: colors.WHITE,
    fontSize: 12
  },
  linkBlue: {
    color: colors?.PRIMARY,
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  button: {
    marginTop: 20,
    width: "90%"
  },
  wide_row: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});
