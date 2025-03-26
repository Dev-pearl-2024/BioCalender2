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
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Icon, { IconTypes } from "../../components/Icon";
import AuthHeader from "../../components/AuthHeader";

const ResetPassword = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = () => {
    let userData = {
      email: route.params.email,
      password: newPassword,
      confirm_password: confirmPassword
    };
    dispatch(AuthMiddleware.changePassword(userData))
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert("Error", err?.message || "Something went wrong!");
      });
  };

  return (
    <ComponentBody center>
      <AuthHeader />
      <Image source={LOGO} style={styles.logo} />
      <TextComponent text={"Reset Password"} style={styles.heading} />
      <TextComponent
        text={"Please enter new password"}
        style={styles.recoveryText}
      />
      <Input
        placeholder={"Password"}
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        leftIcon={
          <Icon
            name={"lock"}
            type={IconTypes.FontAwesome}
            size={20}
            color={colors.WHITE}
          />
        }
        isPassword
        secureTextEntry
      />

      <Input
        placeholder={"Confirm Password"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        leftIcon={
          <Icon
            name={"lock"}
            type={IconTypes.FontAwesome}
            size={20}
            color={colors.WHITE}
          />
        }
        isPassword
        secureTextEntry
      />

      <Button
        title={"Reset Password"}
        onPress={resetPassword}
        style={styles.button}
      />
    </ComponentBody>
  );
};

export default ResetPassword;

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
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 230,
    color: colors.WHITE,
    marginBottom: 10
  },
  recoveryText: {
    color: colors.WHITE,
    fontSize: 12,
    width: "80%",
    textAlign: "center",
    marginVertical: 5
  },
  button: {
    marginTop: 20,
    width: "90%"
  },
  input: {
    width: "90%"
  }
});
