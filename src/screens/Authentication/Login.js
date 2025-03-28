import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { appleAuth } from "@invertase/react-native-apple-authentication";

import { colors } from "../../utilities/colors";
import { fonts } from "../../utilities/fonts";
import { validateEmail } from "../../utilities/validators";

import ComponentBody from "../../components/ComponentBody";
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import AuthHeader from "../../components/AuthHeader";

import LOGO from "../../assests/images/logoBg.png";
import { showAlert } from "../../Store/Actions/GeneralActions";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import axios from "axios";

// Initialize Google Sign-in
// useEffect(() => {
//   GoogleSignin.configure({
//     offlineAccess: true,
//     webClientId:
//       "563319386292-chd28c5hq4dnfdgvf6kdh3ld7cj4t4n6.apps.googleusercontent.com"
//   });

//   return () => {
//     GoogleSignin.revokeAccess(); // Corrected method
//   };
// }, []);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    Keyboard.dismiss();

    if (!email) {
      dispatch(showAlert({ message: "Please enter email" }));
    }
    // else if (!validateEmail(email)) {
    //   dispatch(showAlert({ message: "Invalid Email" }));
    // }
    else if (!password) {
      dispatch(showAlert({ message: "Please enter password" }));
    } else {
      let userData = {
        email,
        password,
        DevicesToken: "devicesToken"
      };
      dispatch(AuthMiddleware.login(userData));
    }
  };

  const demotest = async () => {
    try {
      const rs = await axios.get(
        "https://server1.pearl-developer.com/bio-calendar/public/api/demo-url"
      );
      console.log(rs.data);
    } catch (error) {
      console.log("demo error ///// ", error);
    }
  };

  useEffect(() => {
    demotest();
  }, []);

  return (
    <ComponentBody center>
      <AuthHeader />
      <Image source={LOGO} style={styles.logo} />
      <TextComponent text={"Login"} style={styles.heading} />
      <View style={{ marginTop: "30%" }} />
      <Input
        placeholder={"Email Address"}
        value={email}
        style={styles.input}
        error={
          email.length > 0 && !validateEmail(email) ? "Invalid Email" : null
        }
        leftIcon={<Foundation name="mail" size={20} color={colors.WHITE} />}
        onChangeText={setEmail}
        placeholderTextColor="white"
      />

      <Input
        placeholder={"Password"}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.WHITE} />}
        isPassword
        secureTextEntry
        placeholderTextColor="white"
      />

      <Button title={"Login"} onPress={onPressLogin} style={styles.button} />

      <View
        style={[
          styles.wide_row,
          {
            alignSelf: "flex-end",
            marginRight: Dimensions.get("window").width * 0.05
          }
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <TextComponent text={"Forgot password?"} style={styles.link} />
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.wide_row, marginTop: "10%" }}>
        <TextComponent text={"Don't have an account? "} style={styles.span3} />
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <TextComponent text={"Sign Up Now!"} style={styles.linkBlue} />
        </TouchableOpacity>
      </View>
    </ComponentBody>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  logo: {
    width: 310,
    height: 310,
    position: "absolute",
    marginTop: 0
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts.SEMI_BOLD,
    marginTop: "30%",
    color: colors.WHITE,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16
  },
  span3: {
    color: colors.WHITE,
    fontSize: 12
  },
  link: {
    color: colors.WHITE,
    fontSize: 12,
    textDecorationLine: "underline"
  },
  linkBlue: {
    color: colors.PRIMARY,
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  button: {
    marginTop: 20,
    width: "90%"
  },
  input: {
    width: "90%",
    // backgroundColor: colors.BLACK,
    color: colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50
  },
  wide_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
