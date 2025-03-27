import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { colors } from "../../utilities/colors";
import ComponentBody from "../../components/ComponentBody";
import Input from "../../components/Input";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AVATAR from "../../assests/images/Avatar.png";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Header from "../../components/Header";
import moment from "moment";

const OpenImagePicker = async (callback) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      callback(result.assets[0]);
    } else {
      console.warn("Image selection was canceled.");
    }
  } catch (error) {
    console.error("Error selecting image:", error);
  }
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userdata = useSelector((state) => state.AuthReducer.user);

  const [profileImage, setProfileImage] = useState(
    userdata?.profile_image || AVATAR
  );
  const [firstName, setFirstName] = useState(userdata.first_name);
  const [lastName, setLastName] = useState(userdata.last_name);
  const [address, setAddress] = useState(userdata?.location);
  const [DOB, setDOB] = useState(
    userdata?.dob ? moment(userdata?.dob).format("MMM DD, YYYY") : ""
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onPressSelectProfile = () => {
    OpenImagePicker((img) => {
      if (img && img.uri) {
        setProfileImage(img.uri);
      } else {
        console.warn("Image selection failed or was canceled.");
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    setDOB(moment(date).format("MMM DD, YYYY"));
    setDatePickerVisibility(false);
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
      profileImg: profileImage,
    };

    dispatch(AuthMiddleware.onUpdateProfile(userData))
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header title="Edit Profile" />

      <ComponentBody
        center
        contentContainerStyle={styles.contentContainerStyle}
      >
        <TouchableOpacity onPress={onPressSelectProfile}>
          <ImageBackground
            source={
              typeof profileImage === "string" ? { uri: profileImage } : AVATAR
            }
            style={styles.imageBg}
            imageStyle={styles.profile_image}
            resizeMode="cover"
          >
            <View style={styles.profIconCont}>
              <FontAwesome name="camera" size={25} color={colors.WHITE} />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <Input
          placeholder="First Name"
          value={firstName}
          style={styles.input}
          onChangeText={setFirstName}
        />

        <Input
          placeholder="Last Name"
          value={lastName}
          style={styles.input}
          onChangeText={setLastName}
        />

        <TouchableOpacity onPress={showDatePicker}>
          <View pointerEvents="none">
            <Input
              placeholder="Select Date Of Birth"
              value={DOB}
              style={styles.input}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        <Input
          placeholder="Address"
          value={address}
          style={styles.input}
          onChangeText={setAddress}
        />

        <Button
          title="Update"
          onPress={onUpdateProfile}
          style={styles.button}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </ComponentBody>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    width: "100%",
  },
  button: {
    width: "90%",
    marginTop: "35%",
  },
  profile_image: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GREEN,
  },
  imageBg: {
    width: 160,
    height: 160,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    overflow: "hidden",
  },
  profIconCont: {
    backgroundColor: `${colors.BLACK}70`,
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    paddingHorizontal: 25,
  },
});
