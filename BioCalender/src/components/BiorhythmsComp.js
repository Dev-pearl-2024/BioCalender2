import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Image from "./Image";

import physIcon from "../assests/images/Physical.png";
import EmotIcon from "../assests/images/Emotional.png";
import IntIcon from "../assests/images/Intellectual.png";
import { colors } from "../utilities/colors";
import TextComponent from "./TextComponent";
import Skeleton from "./Skeleton";

const BiorhythmsComp = ({ data, loading }) => {
  const renderBio = ({ item }) => {
    return loading ? (
      <View style={styles.itemComt}>
        <Skeleton
          radius={100}
          styles={styles.icon}
          style={{ borderRadius: 100 }}
        />
        <Skeleton
          radius={10}
          styles={{ width: 40, padding: 2, height: 15, marginVertical: 5 }}
          style={{ borderRadius: 10 }}
        />
        <Skeleton
          radius={10}
          styles={{ width: 80, padding: 2, height: 15 }}
          style={{ borderRadius: 10 }}
        />
      </View>
    ) : (
      <View style={styles.itemComt}>
        <Image
          source={
            item.sign == "+" || item.sign == "H" || item.sign == "c"
              ? physIcon
              : item.sign == "#" || item.sign == "C" || item.sign == "*"
                ? EmotIcon
                : IntIcon
          }
          style={[styles.icon]}
        />
        <TextComponent
          color={
            item.sign == "+" || item.sign == "H" || item.sign == "c"
              ? colors.GREEN
              : item.sign == "#" || item.sign == "C" || item.sign == "*"
                ? null
                : colors.RED
          }
          text={`${item.value} ${item.sign ? `(${item.sign})` : ""}`}
        />
        <TextComponent text={item.type} />
      </View>
    );
  };

  return (
    <View style={styles.mainCont}>
      <TextComponent style={styles.heading1} text={data.name} />
      <TextComponent
        style={styles.heading2}
        text={"Average of All Three Grades"}
      />
      <FlatList
        data={data.data}
        renderItem={renderBio}
        horizontal
        scrollEnabled={false}
        style={{ alignSelf: "center" }}
      />
      {loading ? (
        <View style={styles.descCont}>
          <Skeleton
            radius={10}
            styles={{ width: 200, padding: 2, height: 20, marginBottom: 10 }}
            style={{ borderRadius: 10 }}
          />
          <Skeleton
            radius={10}
            styles={{ width: "100%", padding: 2, height: 20 }}
            style={{ borderRadius: 10 }}
          />
          <Skeleton
            radius={10}
            styles={{ width: "95%", padding: 2, height: 20, marginVertical: 5 }}
            style={{ borderRadius: 10 }}
          />
          <Skeleton
            radius={10}
            styles={{ width: "100%", padding: 2, height: 20 }}
            style={{ borderRadius: 10 }}
          />
          <Skeleton
            radius={10}
            styles={{ width: "90%", padding: 2, height: 20, marginVertical: 5 }}
            style={{ borderRadius: 10 }}
          />
        </View>
      ) : (
        <View style={styles.descCont}>
          <TextComponent
            text={data.name ? "Description" : "Description of Biorhythm"}
            style={data.name ? styles.nameHead : styles.descHead}
          />
          <TextComponent style={styles.descText} text={data.description} />
        </View>
      )}
    </View>
  );
};

export default BiorhythmsComp;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    gap: 15,
  },
  icon: {
    width: 80,
    height: 80,
  },
  itemComt: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  descCont: {
    backgroundColor: `${colors.WHITE}25`,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    color: `${colors.WHITE}80`,
    paddingHorizontal: 2,
  },
  descHead: {
    fontSize: 16,
    color: colors.WHITE,
    marginVertical: 3,
  },
  heading2: {
    fontSize: 16,
    color: colors.WHITE,
    textAlign: "center",
  },
  nameHead: {
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: `${colors.WHITE}80`,
    paddingBottom: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
  heading1: {
    textAlign: "center",
    fontSize: 18,
    // marginTop: 0,
    fontWeight: "bold",
  },
});
