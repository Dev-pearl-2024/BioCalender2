import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import { fonts } from "../../utilities/fonts";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import LOGO from "../../assests/images/logo.png";
import Image from "../../components/Image";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";
import Header from "../../components/Header";

const HelpCenter = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.AuthReducer.user);
  const [Message, setMessage] = useState("");
  const [title, settitle] = useState("");
  const [username, setusername] = useState(userdata?.name);
  const [email, setemail] = useState(userdata?.email);

  const onPressSubmitQuery = () => {
    let userData = {
      title: title,
      message: Message
    };
    if (!title || !Message) {
      dispatch(showAlert({ message: "Please fill all fields" }));
    } else {
      dispatch(UsersMiddleware.helpCenter(userData))
        .then((data) => {
          navigation.goBack();

          setMessage("");
          settitle("");
        })
        .catch((err) => {});
    }
  };

  return (
    <ComponentBody>
      <Header title={"Help Center"} />
      <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
        <Input
          placeholder="Title"
          value={title}
          onChangeText={(text) => settitle(text)}
        />

        <Input
          placeholder="Write your problems..."
          value={Message}
          multiline
          TextInputStyle={{ height: 200 }}
          numberOfLines={10}
          onChangeText={(text) => setMessage(text)}
        />

        <Button
          title={"Submit"}
          onPress={onPressSubmitQuery}
          style={styles.button}
        />
      </View>
    </ComponentBody>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.WHITE
  },
  button: { marginTop: 20 },
  logo: { width: 140, height: 140, alignSelf: "center", marginVertical: 10 },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.SEMI_BOLD,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.PRIMARY,
    padding: 5,
    width: "50%",
    marginTop: 25,
    alignSelf: "center"
  },
  sub_heading: { fontSize: 13, alignSelf: "center", marginVertical: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
    alignItems: "center"
  }
});
