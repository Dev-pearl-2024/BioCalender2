import React, { useState } from "react";
import {
  View,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { colors } from "../utilities/colors";

const CustomSwitch = (props) => {
  const [switchState, setSwitchState] = useState(props?.status || false);

  const pressSwitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSwitchState(!switchState);
    if (props?.pressSwitch) {
      props.pressSwitch(!switchState);
    }
  };

  return (
    <TouchableOpacity
      style={switchState ? styles.switch : styles.switchx}
      onPress={pressSwitch}
      activeOpacity={0.8}
    >
      <View style={switchState ? styles.switchCircle : styles.switchCirclex} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchCircle: {
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: colors.GREEN,
    borderWidth: 3,
    borderColor: colors.WHITE
  },
  switchCirclex: {
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: `${colors.BLACK}60`,
    borderWidth: 3,
    borderColor: colors.WHITE
  },
  switch: {
    width: 47,
    height: 25,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: colors.WHITE
  },
  switchx: {
    width: 47,
    height: 25,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: colors.WHITE
  }
});

export default CustomSwitch;
