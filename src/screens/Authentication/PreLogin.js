import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { showAlert } from "../../Store/Actions/GeneralActions";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import { colors } from "../../utilities/colors";
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import ComponentBody from "../../components/ComponentBody";
import LOGO from "../../assests/images/logoBg.png";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const PreLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "563319386292-chd28c5hq4dnfdgvf6kdh3ld7cj4t4n6.apps.googleusercontent.com", // Replace with your actual Google Client ID
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleLogin(authentication.accessToken);
    }
  }, [response]);

  const handleGoogleLogin = async (token) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const userInfo = await userInfoResponse.json();

      if (userInfo?.email) {
        const userData = {
          email: userInfo.email,
          first_name: userInfo.given_name,
          last_name: userInfo.family_name
        };

        dispatch(AuthMiddleware.social_login(userData));
      }
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      dispatch(showAlert({ message: "Google Sign-In Failed", type: "Error" }));
    }
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
        dispatch(showAlert({ message: "Apple Sign-In Failed", type: "Error" }));
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
        LeftIcon={<Foundation name="mail" size={20} color={colors.WHITE} />}
      />

      <Button
        title={"Sign in with Google"}
        color={colors.RED}
        onPress={() => promptAsync()} // Calls Google login
        style={styles.button}
        LeftIcon={<AntDesign name="google" size={20} color={colors.WHITE} />}
      />

      {Platform.OS === "ios" && (
        <Button
          title={"Sign in with Apple"}
          onPress={onPressAppleLogin}
          style={styles.button}
          color={colors.WHITE}
          Textstyle={{ color: colors.BLACK }}
          LeftIcon={<AntDesign name="apple1" size={20} color={colors.BLACK} />}
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
