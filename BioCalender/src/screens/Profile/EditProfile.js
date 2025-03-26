import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import { fonts } from "../../utilities/fonts";
import Input from "../../components/Input";
import Icon, { IconTypes } from "../../components/Icon";
import OpenImagePicker from "../../components/ImagePicker";
import PICKER from "../../assests/images/Avatar.png";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import DatePick from "../../components/DatePicker";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Header from "../../components/Header";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userdata = useSelector((state) => state.AuthReducer.user);
  const screenType = props?.route?.params?.screenType;
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setfirstName] = useState(userdata.first_name);
  const [lastName, setlastName] = useState(userdata.last_name);
  const [address, setaddress] = useState(userdata?.location);
  const [DOB, setDOB] = useState(userdata?.dob ? userdata?.dob : "");
  const [phone, setphone] = useState(userdata?.contact_no);
  const [email, setemail] = useState(userdata?.email);
  const [dobModalOpen, setdobModalOpen] = useState(false);
  const [about, setAbout] = useState(userdata?.about);
  const [position, setPosition] = useState(userdata?.position);

  const onPressSelectProfile = () => {
    OpenImagePicker((img) => {
      let imageObj = img.path.split("/");
      let imgObject = {
        name: imageObj[imageObj.length - 1],
        uri: img.path,
        size: img.size,
        type: img.mime
      };
      setProfileImage(imgObject);
    });
  };

  const onUpdateProfile = () => {
    if (!firstName || !lastName || !address || !DOB) {
      dispatch(showAlert({ message: "All fields are required!" }));
      return;
    }

    let userData = {
      firstName: firstName,
      lastName: lastName,
      address: address ?? "",
      dob: DOB,
      profileImg: profileImage
    };

    dispatch(AuthMiddleware.onUpdateProfile(userData))
      .then((data) => {
        navigation.goBack();
      })
      .catch((err) => {});
  };

  return (
    <ComponentBody center contentContainerStyle={styles.contentContainerStyle}>
      <Header title={"Edit Profile"} />
      <TouchableOpacity onPress={onPressSelectProfile}>
        <ImageBackground
          source={
            profileImage
              ? profileImage
              : userdata?.profile_image
              ? { uri: userdata?.profile_image }
              : PICKER
          }
          style={styles.imageBg}
          imageStyle={styles.profile_image}
          resizeMode="cover"
        >
          <View style={styles.profIconCont}>
            <Icon
              name={"camera"}
              type={IconTypes.FontAwesome}
              size={25}
              color={colors.WHITE}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Input
        placeholder={"First Name"}
        value={firstName}
        style={styles.input}
        onChangeText={(e) => setfirstName(e)}
      />

      <Input
        placeholder={"Last Name"}
        value={lastName}
        style={styles.input}
        onChangeText={(e) => setlastName(e)}
      />
      <DatePick
        date={DOB}
        maximumDate={new Date()}
        setDate={setDOB}
        placeholder="Select Date Of Birth"
      />
      <Input
        placeholder={"Address"}
        value={address}
        style={styles.input}
        // multiline={true}
        onChangeText={(e) => setaddress(e)}
      />

      <Button
        title={"Update"}
        onPress={onUpdateProfile}
        style={styles.button}
      />
    </ComponentBody>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    width: "90%"
  },
  button: {
    width: "90%",
    marginTop: "35%"
  },
  profile_image: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GREEN
  },
  imageBg: {
    width: 160,
    height: 160,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20
  },
  media_image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5
  },
  profIconCont: {
    backgroundColor: `${colors.BLACK}70`,
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainerStyle: {
    // flex: 1,
  }
});
