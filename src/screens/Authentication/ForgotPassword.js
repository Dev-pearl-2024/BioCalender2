import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LOGO from "../../assests/images/logoBg.png";
import { StackActions, useNavigation } from "@react-navigation/native";
import Storage from "../../utilities/AsyncStorage";
import { login, userData } from "../../Store/Actions/AuthAction";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";

// import {
//   GoogleSignin,
//   isErrorWithCode,
//   statusCodes
// } from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import Icon, { IconTypes } from "../../components/Icon";
import AuthHeader from "../../components/AuthHeader";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
// import jwtDecode from 'jwt-decode';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressForgotPass = () => {
    if (!email) {
      dispatch(showAlert({ message: "Please Enter Your Email" }));
    } else {
      dispatch(AuthMiddleware.forgotPassword({ email }))
        .then((data) => {
          navigation.dispatch(StackActions.replace("Verification", { email }));
        })
        .catch((err) => {
          console.log("err", err);
          // Alert.alert(err?.message)
        });
    }
  };

  return (
    <ComponentBody center>
      <AuthHeader />
      <Image source={LOGO} style={styles.logo} />
      <TextComponent text={"Forget Password?"} style={styles.heading} />
      <TextComponent
        text={
          "Please enter registered email address to get password recovery code."
        }
        style={styles.recoveryText}
      />

      <Input
        placeholder={"Email Address"}
        value={email}
        style={styles.input}
        error={
          email.length > 0 &&
          !email
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? "Invalid Email"
            : null
        }
        leftIcon={
          <Icon
            name={"mail"}
            type={IconTypes.Foundation}
            size={20}
            color={colors.WHITE}
          />
        }
        onChangeText={(e) => setEmail(e)}
      />

      <Button
        title={"Send Recovery Code"}
        onPress={onPressForgotPass}
        style={styles.button}
      />
    </ComponentBody>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.WHITE
  },
  logo: {
    width: 310,
    height: 310,
    position: "absolute",
    marginTop: 30
    // backgroundColor:"red"
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 230,
    color: colors.WHITE,
    marginBottom: 10
  },
  sub_heading: {
    fontSize: 23,
    color: colors?.PRIMARY,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 5
  },
  span: {
    fontSize: 12,
    marginVertical: 10
  },
  span2: {
    fontSize: 15,
    color: colors?.BORDER,
    marginVertical: 13
  },
  span3: {
    color: colors.WHITE,
    fontSize: 12
  },

  recoveryText: {
    color: colors.WHITE,
    fontSize: 12,
    width: "80%",
    textAlign: "center",
    marginBottom: 5
  },
  link: {
    color: colors?.WHITE,
    fontSize: 12,
    textDecorationLine: "underline"
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
  input: {
    width: "90%"
  },
  row: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center"
  },
  wide_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  social_icon: {
    width: 40,
    height: 40,
    marginBottom: 25
  },
  side_image: {
    position: "absolute",
    width: 140,
    height: 140,
    bottom: -8,
    right: -20
  },
  hr: {
    height: 2,
    width: "40%",
    backgroundColor: colors?.PRIMARY,
    marginBottom: 18,
    marginTop: 6
  }
});
