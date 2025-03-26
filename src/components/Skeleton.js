import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// import { Shimmer } from "expo-shimmer";
import { colors } from "../utilities/colors";

const Skeleton = ({ radius = 0, styles = {}, style = {} }) => {
  return (
    <View
      style={{
        backgroundColor: `${colors.WHITE}25`,
        padding: 5,
        width: "98%",
        borderRadius: radius,
        ...styles
      }}
    >
      {/* <Shimmer
        intensity={0.8}
        tintColor={`${colors.WHITE}30`}
        style={{ borderRadius: 10, height: "100%", width: "100%", ...style }}
      >
        <LinearGradient
          colors={[`${colors.WHITE}25`, `${colors.WHITE}30`]}
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
        />
      </Shimmer> */}
    </View>
  );
};

export default Skeleton;
