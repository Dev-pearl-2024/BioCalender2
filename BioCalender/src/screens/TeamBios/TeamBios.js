import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utilities/colors";
import Button from "../../components/Button";
import TextComponent from "../../components/TextComponent";
import ComponentBody from "../../components/ComponentBody";
import Input from "../../components/Input";
import DatePick from "../../components/DatePicker";
import Icon, { IconTypes } from "../../components/Icon";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import { useNavigation } from "@react-navigation/native";
import calculateBiorhythm from "../../utilities/calculateBiorhythms";
import moment from "moment";
import { fonts } from "../../utilities/fonts";
import Header from "../../components/Header";

const TeamBios = () => {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [teamBiosUser, setTeamBiosUser] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          sign: res?.textofPhysical
        },
        {
          type: "Emotional",
          value: res?.rangeEmotional,
          sign: res?.textofEmotional
        },
        {
          type: "Intellectual",
          value: res?.rangeIntellectual,
          sign: res?.textofIntellectual
        }
      ]
    };

    if (res) {
      setTeamBiosUser((prev) => [
        { id: prev.length + 1, name: name, dob: DOB, ...Biodata },
        ...prev
      ]);
      setName("");
      setDOB("");
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
            // onChangeText={e => setName(e)}
          />

          <DatePick
            date={item.dob}
            disable
            maximumDate={new Date()}
            style={styles.input}
            setDate={setDOB}
            placeholder="Date Of Birth"
          />

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
          // style={{backgroundColor: 'red', padding: 0, margin: 0,}}
          scrollEnabled={false}
          data={teamBiosUser}
          keyExtractor={(item) => item.id}
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
          <DatePick
            date={DOB}
            maximumDate={new Date()}
            style={styles.input}
            setDate={setDOB}
            placeholder="Date Of Birth"
          />
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
                    "Your information has not been saved. Please click (+) to add the information"
                })
              );
              return;
            } else if (teamBiosUser.length < 1) {
              dispatch(
                showAlert({ message: "Please add atleast 1 users to predict" })
              );
              return;
            }
            navigation.navigate("TeamBiosDescription", { teamBiosUser });
          }}
          style={styles.button}
        />
      </ComponentBody>
      <Modal
        onRequestClose={() => setShowModal(false)}
        animationType={"fade"}
        transparent={true}
        visible={showModal}
      >
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <TextComponent
              text={"Unlock True Accuracy in Sports Betting!"}
              style={{
                fontSize: 16,
                textAlign: "center",
                // fontWeight: 'bold',
                fontFamily: fonts.BOLD_ITALIC
              }}
            />
            <TextComponent
              text={"Discover  Teambios Mobile app\ncoming in 2025!"}
              style={{
                fontSize: 14,
                textAlign: "center",
                fontFamily: fonts.BOLD_ITALIC
              }}
            />

            <Button
              title={"Continue"}
              onPress={() => setShowModal(false)}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
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
    alignSelf: "center"
  },
  input: {
    width: "42%"
  },
  modal: {
    backgroundColor: `${colors.WHITE}50`,
    width: "90%",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    // height: 200,
    paddingHorizontal: 5
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  heading: {
    fontSize: 16
  },
  button: {
    width: "90%",
    marginTop: 10,
    alignSelf: "center"
  },
  userTxt: {
    marginLeft: 30,
    fontWeight: "bold",
    marginVertical: 5
  }
});
