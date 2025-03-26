import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon, { IconTypes } from "./Icon";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../utilities/colors";
import { useNavigation } from "@react-navigation/native";

const AuthHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerIcon}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={35} color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    width: "90%",
    marginTop: 4
  }
});

export default AuthHeader;
