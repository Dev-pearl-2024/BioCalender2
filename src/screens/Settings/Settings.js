import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ComponentBody from "../../components/ComponentBody";
import CustomSwitch from "../../components/Switch";
import TextComponent from "../../components/TextComponent";
import { colors } from "../../utilities/colors";
import { fonts } from "../../utilities/fonts";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";

const Settings = () => {
  const dispatch = useDispatch();
  const [notification, setnotification] = useState(false);
  const user = useSelector((state) => state.AuthReducer.user);
  const notificationSwitch = useSelector(
    (state) => state.UsersReducer.notificationSwitch
  );
  const navigation = useNavigation();

  return (
    <ComponentBody style={{ padding: 20 }}>
      <TouchableOpacity
        style={styles.wide_row}
        onPress={() => navigation.navigate("HelpCenter")}
      >
        <TextComponent text={"Help Center"} style={styles.spanx} />
      </TouchableOpacity>
    </ComponentBody>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wide_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: `${colors.WHITE}50`,
    padding: 20,
    borderRadius: 10,
    height: 60
  }
});
