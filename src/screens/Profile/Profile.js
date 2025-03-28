import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utilities/colors";
import TextComponent from "../../components/TextComponent";
import ComponentBody from "../../components/ComponentBody";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import moment from "moment";
import OpenImagePicker from "../../components/ImagePicker";

const profile = require("../../assests/images/Avatar.png");

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const user = useSelector((state) => state.AuthReducer.user) || {};

  const onPressSelectProfile = () => {
    OpenImagePicker((img) => {
      let imageObj = img.path.split("/");
      let imgObject = {
        name: imageObj[imageObj.length - 1],
        uri: img.path,
        size: img.size,
        type: img.mime,
      };
      setProfileImage(imgObject);
    });
  };

  return (
    <ComponentBody style={styles.container} center>
      {/* Edit Icon in the Top Right Corner */}
      <TouchableOpacity
        style={styles.editIconTop}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <MaterialIcons name="edit" size={24} color={colors.WHITE} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.imageContainer}
      >
        <ImageBackground
          source={
            profileImage
              ? { uri: profileImage.uri }
              : user?.profile_image
              ? { uri: user?.profile_image }
              : profile
          }
          style={styles.profImage}
          imageStyle={styles.profile_image}
        >
          <TouchableOpacity
            onPress={onPressSelectProfile}
            style={styles.editIconContainer}
          >
            <FontAwesome5 name="edit" size={18} color={colors.WHITE} />
          </TouchableOpacity>
        </ImageBackground>
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
            <TextComponent
              text={user?.is_subscribed ? "Active" : "Not Active"}
              style={styles.span2}
            />
          </View>
        </View>
      )}

      <ImageView
        images={[
          profileImage
            ? { uri: profileImage.uri }
            : user?.profile_image
            ? { uri: user?.profile_image }
            : profile,
        ]}
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
    marginTop: 20,
  },
  editIconTop: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.GREEN,
    padding: 8,
    borderRadius: 20,
  },
  imageContainer: {
    alignSelf: "center",
    marginVertical: 20,
  },
  profImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GREEN,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_image: {
    borderRadius: 100,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1f232861",
    borderRadius: 20,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    marginVertical: 8,
    fontSize: 16,
    marginBottom: 15,
    color: colors.WHITE,
  },
  span: {
    marginVertical: 5,
    fontSize: 16,
    color: colors.WHITE,
  },
  descCont: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: `${colors.WHITE}80`,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  subscriptionCont: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  span2: {
    color: `${colors.WHITE}90`,
    fontSize: 15,
    textAlign: "right",
    width: "65%",
  },
  subText: {
    width: "90%",
    marginVertical: 15,
    fontSize: 16,
    color: colors.WHITE,
  },
  activeCont: {
    flexDirection: "row",
    gap: 5,
  },
});
