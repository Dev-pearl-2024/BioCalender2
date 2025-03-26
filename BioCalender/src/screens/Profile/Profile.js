import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../utilities/colors";
import TextComponent from "../../components/TextComponent";
import Image from "../../components/Image";
import ComponentBody from "../../components/ComponentBody";
import Icon, { IconTypes } from "../../components/Icon";
import ImageView from "react-native-image-viewing";
import moment from "moment";
import { Octicons } from "@expo/vector-icons";

const profile = require("../../assests/images/Avatar.png");

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.AuthReducer.user) || {};

  return (
    <ComponentBody style={styles.container} center>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Image
          resizeMode="cover"
          source={user?.profile_image ? { uri: user?.profile_image } : profile}
          style={styles.profImage}
          // tintColor={colors.PRIMARY}
        />
      </TouchableOpacity>

      <TextComponent text={user?.name} style={styles.nameText} />

      <View style={styles.descCont}>
        <TextComponent text="Email" style={styles.span} />
        <TextComponent
          text={user?.email}
          style={{ ...styles.span2, width: "90%" }}
        />
      </View>

      <View style={styles.descCont}>
        <TextComponent text="Date of Birth" style={styles.span} />
        <TextComponent
          text={
            user?.dob ? moment(user?.dob).format("MMM-DD-YYYY") : "----------"
          }
          style={{ ...styles.span2, width: "72%" }}
        />
      </View>

      <View style={styles.descCont}>
        <TextComponent text="Location" style={styles.span} />
        <TextComponent
          text={user?.location ? user?.location : "- - - - - - - - - - -"}
          style={{ ...styles.span2, width: "82%" }}
        />
      </View>

      {!user?.is_show_subscription && (
        <TextComponent text="Subscriptions" style={styles.subText} />
      )}
      {!user?.is_show_subscription && (
        <View style={styles.subscriptionCont}>
          <TextComponent text="Monthly Subscription" style={styles.span} />
          <View style={styles.activeCont}>
            <Octicons
              name="dot-fill"
              size={18}
              color={user?.is_subscribed ? colors.GREEN : colors.RED}
            />
            ;
            <TextComponent
              text={user?.is_subscribed ? "Active" : "Not Active"}
              style={styles.span2}
            />
          </View>
        </View>
      )}

      <ImageView
        images={[user?.profile_image ? { uri: user?.profile_image } : profile]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </ComponentBody>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  profImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GREEN,
    resizeMode: "cover"
  },
  nameText: {
    marginVertical: 8,
    fontSize: 16,
    marginBottom: 15,
    color: colors.WHITE
  },
  span: {
    marginVertical: 5,
    fontSize: 16,
    color: colors.WHITE
  },
  descCont: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: `${colors.WHITE}80`,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  subscriptionCont: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    color: colors.WHITE
  },
  span2: {
    color: `${colors.WHITE}90`,
    fontSize: 15,
    textAlign: "right",
    color: colors.WHITE,
    width: "65%"
  },
  subText: {
    width: "90%",
    marginVertical: 15,
    fontSize: 16,
    color: colors.WHITE
  },
  activeCont: {
    flexDirection: "row",
    gap: 5,
    color: colors.WHITE
  }
});
