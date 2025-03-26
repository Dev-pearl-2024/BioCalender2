import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const OpenImagePicker = async (
  callback,
  mediaType = "Images",
  multiple = false
) => {
  try {
    // Request permissions
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to allow camera and media access to use this feature."
      );
      return;
    }

    Alert.alert(
      "Options",
      "Select one option to continue",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Camera",
          style: "default",
          onPress: async () => {
            try {
              let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions[mediaType],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
              });

              if (!result.canceled) {
                callback(multiple ? result.assets : result.assets[0]);
              }
            } catch (error) {
              console.error("Camera Error:", error);
            }
          }
        },
        {
          text: "Library",
          style: "default",
          onPress: async () => {
            try {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions[mediaType],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                allowsMultipleSelection: multiple
              });

              if (!result.canceled) {
                callback(multiple ? result.assets : result.assets[0]);
              }
            } catch (error) {
              console.error("Gallery Error:", error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  } catch (error) {
    console.error("Image Picker Error:", error);
  }
};

export default OpenImagePicker;
