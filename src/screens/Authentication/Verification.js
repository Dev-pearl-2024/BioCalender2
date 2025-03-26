import React, { useEffect, useRef, useState } from "react";
import * as Progress from "react-native-progress";

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
import { OtpInput } from "react-native-otp-entry";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
// import jwtDecode from 'jwt-decode';

const Verification = ({ route }) => {
  const [time, setTime] = useState(60);
  const timerRef = useRef(time);
  const timerRef1 = useRef();
  const [forgetEmail, setforgetEmail] = useState("");
  const [VerificationCode, setVerificationCode] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef1);
    };
  }, []);

  const startTimer = () => {
    const timerRef1 = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerRef1);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
  };

  const SignUpVerification = (code) => {
    dispatch(
      AuthMiddleware.verifyCode({ code, id: route?.params?.data?.id })
    ).then((res) => {
      navigation.navigate("Login");
    });
  };

  const codeVeriftion = (code) => {
    dispatch(AuthMiddleware.verifyCode({ email: route.params.email, code }))
      .then((res) => {
        navigation.dispatch(
          StackActions.replace("ResetPassword", {
            email: route.params.email
          })
        );
      })
      .catch((e) => console.log("e", e));
  };

  const resent = () => {
    clearInterval(timerRef1);
    timerRef.current = 60;
    setTime(60);

    dispatch(
      AuthMiddleware.resendCode({
        ...(route.params?.screenType == "signup"
          ? { id: route?.params?.data?.id }
          : { email: route?.params?.email })
      })
    )
      .then((res) => {
        startTimer();
      })
      .catch((err) => {
        clearInterval(timerRef1);
      });
  };

  return (
    <ComponentBody center>
      <AuthHeader />
      <Image source={LOGO} style={styles.logo} />
      <TextComponent text={"Verification"} style={styles.heading} />
      <TextComponent
        text={
          "We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity."
        }
        style={styles.recoveryText}
      />

      <OtpInput
        numberOfDigits={6}
        focusColor={colors.PRIMARY}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => {
          console.log("text", text);
          if (route.params?.screenType == "signup") {
            SignUpVerification(text);
          } else {
            codeVeriftion(text);
          }
        }}
        textInputProps={{
          accessibilityLabel: "One-Time Password"
        }}
        theme={{
          containerStyle: styles.containerOtp,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer
        }}
      />

      <Progress.Circle
        borderWidth={0}
        color={colors.PRIMARY}
        textStyle={{ color: colors.WHITE }}
        showsText
        style={{
          ...styles.circularBar,
          backgroundColor: `${colors.GREY}20`,
          borderRadius: 100
        }}
        formatText={() => time}
        size={120}
        progress={(time * 100) / 6000}
      />
      <View
        style={{
          ...styles.wide_row,
          marginTop: "20%"
          // backgroundColor:"red"
        }}
      >
        <TextComponent text={"Code didn't receive? "} style={styles.span3} />
        <TouchableOpacity disabled={time > 0} onPress={resent}>
          <TextComponent text={"Resend Code"} style={styles.linkBlue} />
        </TouchableOpacity>
      </View>
    </ComponentBody>
  );
};

export default Verification;

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
    marginTop: 250,
    color: colors.BLACK,
    marginBottom: 10
  },
  sub_heading: {
    fontSize: 23,
    color: colors?.PRIMARY,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 5
  },

  containerOtp: {
    backgroundColor: "transparent",
    width: "90%",
    marginVertical: 20
  },
  pinCodeContainer: {
    borderColor: colors.PRIMARY,
    borderWidth: 2
  },
  circularBar: {
    marginVertical: 20
  },
  pinCodeText: {
    color: colors.WHITE
  },
  activePinCodeContainer: {
    borderColor: colors.PRIMARY
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
    color: colors.BLACK,
    fontSize: 12,
    width: "80%",
    textAlign: "center",
    marginVertical: 5
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
