import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  Modal,
  TextInput,
} from "react-native";
// import DatePicker from 'react-native-date-picker';
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LOGO from "../../assests/images/logoBg.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import DatePick from "../../components/DatePicker";
import moment from "moment";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
// import {
//   GoogleSignin,
//   statusCodes
// } from "@react-native-google-signin/google-signin";
// import * as AppleAuthentication from "expo-apple-authentication";
import AuthHeader from "../../components/AuthHeader";
import { validateEmail, validatePassword } from "../../utilities/validators";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleConfirm = (date) => {
    setDOB(moment(date).format("YYYY-MM-DD"));
    setShowCalendar(false);
  };

  const onPressSignup = () => {
    const profileData = {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      dob: DOB,
    };

    console.log("profileData", profileData);

    if (
      !email ||
      !firstName ||
      !lastName ||
      !DOB ||
      !password ||
      !confirmPassword
    ) {
      dispatch(showAlert({ message: "Please fill all fields" }));
    }
    // else if (!validateEmail(email)) {
    //   dispatch(showAlert({ message: "Invalid Email" }));
    // }
    else if (!validatePassword(password)) {
      dispatch(
        showAlert({
          message:
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
        })
      );
    } else if (password !== confirmPassword) {
      dispatch(showAlert({ message: "Confirm Password does not match" }));
    } else {
      dispatch(AuthMiddleware.signUp(profileData))
        .then((res) => {
          navigation.navigate("Verification", {
            screenType: "signup",
            data: res,
          });
        })
        .catch((e) => {});
    }
  };

  return (
    <ComponentBody center>
      <AuthHeader />
      <Image source={LOGO} style={styles.logo} />

      <TextComponent
        text={"Sign Up"}
        style={[styles.heading, { color: "WHITE", marginTop: 280 }]}
      />
      <Text style={{ marginTop: 20 }} />
      <Input
        placeholder={"First Name"}
        value={firstName}
        style={styles.input}
        onChangeText={(e) => setfirstName(e)}
        placeholderTextColor="WHITE"
      />

      <Input
        placeholder={"Last Name"}
        value={lastName}
        style={styles.input}
        onChangeText={(e) => setlastName(e)}
        placeholderTextColor="WHITE"
      />

      <Input
        placeholder={"Email Address"}
        value={email}
        style={styles.input}
        error={
          email.length > 0 && !email.includes("@") ? "Invalid Email" : null
        }
        onChangeText={(e) => setEmail(e)}
        placeholderTextColor="WHITE"
      />

      <Input
        placeholder={"Password"}
        value={password}
        onChangeText={(e) => setPassword(e)}
        style={styles.input}
        isPassword
        secureTextEntry
        placeholderTextColor="WHITE"
      />

      <Input
        placeholder={"Confirm Password"}
        value={confirmPassword}
        onChangeText={(e) => setconfirmPassword(e)}
        style={styles.input}
        isPassword
        secureTextEntry
        placeholderTextColor="WHITE"
      />

      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        style={styles.DOB__Calender}
      >
        <TextInput
          placeholder="Select Date Of Birth"
          value={DOB}
          editable={false}
          pointerEvents="none"
          style={{
            color: colors.WHITE,
          }}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showCalendar}
        mode="date"
        display={Platform.OS === "ios" ? "inline" : "default"}
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setShowCalendar(false)}
      />

      <Button title={"Sign Up"} onPress={onPressSignup} style={styles.button} />

      <View style={{ ...styles.wide_row, marginTop: "8%", marginBottom: 5 }}>
        <View style={{ ...styles.wide_row, flexDirection: "row" }}>
          <TextComponent
            text={"Already have an account? "}
            style={{ color: colors.WHITE }}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextComponent text={"Login Now!"} style={styles.linkBlue} />
          </TouchableOpacity>
        </View>
        <TextComponent
          text={"By signing up, you agree to our"}
          style={[styles.span3, { color: "white" }]}
        />
        <View style={{ ...styles.wide_row, flexDirection: "row" }}>
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

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.WHITE,
  },
  logo: {
    width: 310,
    height: 310,
    position: "absolute",
    marginTop: 30,
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 230,
    color: colors.WHITE,
    marginBottom: 10,
  },
  sub_heading: {
    fontSize: 23,
    color: colors?.PRIMARY,
    fontFamily: fonts?.SEMI_BOLD,
    marginTop: 5,
  },
  span: {
    fontSize: 12,
    marginVertical: 10,
  },
  span2: {
    fontSize: 15,
    color: colors?.BORDER,
    marginVertical: 13,
  },
  span3: {
    color: colors.WHITE,
    fontSize: 12,
  },
  link: {
    color: colors?.PRIMARY,
    fontSize: 12,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 100,
    width: "90%",
  },
  input: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  wide_row: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  social_icon: {
    width: 40,
    height: 40,
    marginBottom: 25,
  },
  hr: {
    height: 2,
    width: "30%",
    backgroundColor: colors?.PRIMARY,
    marginBottom: 10,
    marginTop: 6,
  },
  linkBlue: {
    color: colors?.PRIMARY,
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
    borderColor: colors.BORDER,
  },
  dateText: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: colors.BORDER,
    marginTop: 10,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  DOB__Calender: {
    width: "90%",
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
