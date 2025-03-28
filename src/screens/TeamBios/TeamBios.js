import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../utilities/colors";
import Button from "../../components/Button";
import TextComponent from "../../components/TextComponent";
import ComponentBody from "../../components/ComponentBody";
import Input from "../../components/Input";
import Icon, { IconTypes } from "../../components/Icon";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import { useNavigation } from "@react-navigation/native";
import calculateBiorhythm from "../../utilities/calculateBiorhythms";
import moment from "moment";
import { fonts } from "../../utilities/fonts";
import Header from "../../components/Header";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const TeamBios = () => {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState(moment().format("MMM DD, YYYY")); // Default to today's date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [teamBiosUser, setTeamBiosUser] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    setDOB(moment(date).format("MMM DD, YYYY"));
    setDatePickerVisibility(false);
  };

  const addUser = () => {
    if (!name || !DOB) {
      dispatch(showAlert({ message: "Please enter name and date of birth" }));
      return;
    }
    const res = calculateBiorhythm(moment(DOB).format("YYYY-MM-DD"));

    const Biodata = {
      description: res?.description,
      data: [
        {
          type: "Physical",
          value: res?.rangePhysical,
          sign: res?.textofPhysical,
        },
        {
          type: "Emotional",
          value: res?.rangeEmotional,
          sign: res?.textofEmotional,
        },
        {
          type: "Intellectual",
          value: res?.rangeIntellectual,
          sign: res?.textofIntellectual,
        },
      ],
    };

    if (res) {
      setTeamBiosUser((prev) => [
        { id: prev.length + 1, name: name, dob: DOB, ...Biodata },
        ...prev,
      ]);
      setName("");
      setDOB(moment().format("MMM DD, YYYY")); // Reset to today's date
    }
  };

  const renderUser = ({ item, index }) => {
    return (
      <>
        <TextComponent text={`Person ${index + 1}`} style={styles.userTxt} />
        <View style={styles.addTeamCont}>
          <Input
            placeholder={"Name"}
            value={item.name}
            editable={false}
            style={styles.input}
          />

          <TouchableOpacity onPress={showDatePicker}>
            <View pointerEvents="none">
              <Input
                placeholder="Date Of Birth"
                value={item.dob}
                editable={false}
                style={styles.input}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setTeamBiosUser((prev) =>
                prev.filter((data) => data.id != item.id)
              )
            }
          >
            <Icon
              name={"minussquare"}
              type={IconTypes.AntDesign}
              size={32}
              color={colors?.GREY}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <ComponentBody>
        <Header title={"Team BIOS"} />
        <FlatList
          scrollEnabled={false}
          data={teamBiosUser}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
        />
        <TextComponent text={"Add New User"} style={styles.userTxt} />
        <View style={styles.addTeamCont}>
          <Input
            placeholder={"Name"}
            value={name}
            style={styles.input}
            onChangeText={(e) => setName(e)}
          />

          <TouchableOpacity onPress={showDatePicker}>
            <View pointerEvents="none">
              <Input
                placeholder="Choose Date.."
                value={DOB}
                editable={false}
                style={styles.date__input}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={addUser}>
            <Icon
              name={"add-box"}
              type={IconTypes.MaterialIcons}
              size={32}
              color={colors?.GREEN}
            />
          </TouchableOpacity>
        </View>
        <Button
          title={"Predict"}
          onPress={() => {
            if (name || DOB) {
              dispatch(
                showAlert({
                  message:
                    "Your information has not been saved. Please click (+) to add the information",
                })
              );
              return;
            } else if (teamBiosUser.length < 1) {
              dispatch(
                showAlert({ message: "Please add at least 1 user to predict" })
              );
              return;
            }
            navigation.navigate("TeamBiosDescription", { teamBiosUser });
          }}
          style={styles.button}
        />
      </ComponentBody>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
};

export default TeamBios;

const styles = StyleSheet.create({
  addTeamCont: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    width: "48%",
  },
  date__input: {
    width: "62%",
  },
  modal: {
    backgroundColor: `${colors.WHITE}50`,
    width: "90%",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    // height: 200,
    paddingHorizontal: 5,
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  heading: {
    fontSize: 16,
  },
  button: {
    width: "90%",
    marginTop: 10,
    alignSelf: "center",
  },
  userTxt: {
    marginLeft: 30,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
