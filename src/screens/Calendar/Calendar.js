import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ComponentBody from "../../components/ComponentBody";
import CalendarDate from "../../components/CalendarDate";
import BiorhythmsComp from "../../components/BiorhythmsComp";
import { Biodata } from "../../utilities";
import calculateBiorhythm from "../../utilities/calculateBiorhythms";
import { colors } from "../../utilities/colors";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import physIcon from "../../assests/images/Physical.png";
import EmotIcon from "../../assests/images/Emotional.png";
import IntIcon from "../../assests/images/Intellectual.png";
import Image from "../../components/Image";
import Header from "../../components/Header";
import { Calendar } from "react-native-calendars";

const BioCalendar = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [biorhythms, setBiorhythms] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(() => {
    if (!user?.dob) {
      setShowModal(true);
    }
  });

  const showResult = () => {
    setLoading(true);
    const uiu = calculateBiorhythm(user?.dob, date);
    setBiorhythms(uiu);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    showResult();
  }, [date]);

  const Biodata = {
    description: biorhythms?.description,
    data: [
      {
        type: "Physical",
        value: biorhythms?.rangePhysical,
        sign: biorhythms?.textofPhysical
      },
      {
        type: "Emotional",
        value: biorhythms?.rangeEmotional,
        sign: biorhythms?.textofEmotional
      },
      {
        type: "Intellectual",
        value: biorhythms?.rangeIntellectual,
        sign: biorhythms?.textofIntellectual
      }
    ]
  };

  return (
    <ComponentBody style={styles.container} center>
      <Header title={"Calendar"} />
      <View style={styles.calendarCont}>
        <Calendar
          current={date.toISOString().split("T")[0]}
          onDayPress={(day) => setDate(new Date(day.dateString))}
          markedDates={{
            [date.toISOString().split("T")[0]]: {
              selected: true,
              selectedColor: colors.PRIMARY
            }
          }}
          theme={{
            todayTextColor: colors.PRIMARY,
            selectedDayBackgroundColor: colors.PRIMARY,
            arrowColor: colors.PRIMARY
          }}
        />
      </View>
      {user?.dob && <BiorhythmsComp data={Biodata} loading={loading} />}
      <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.iconRow}>
              <Image source={physIcon} style={styles.icon} />
              <Image source={EmotIcon} style={styles.icon} />
              <Image source={IntIcon} style={styles.icon} />
            </View>
            <TextComponent
              text={"Please Complete Your Profile"}
              style={styles.modalTitle}
            />
            <TextComponent
              text={
                "Unlock This Feature By Completing Your Profile.\nClick on the button below to complete your profile. It helps us offer tailored experiences, accurate predictions, and better insights just for you."
              }
              style={styles.modalText}
            />
            <Button
              title={"Go to Profile"}
              onPress={() => {
                setShowModal(false);
                console.log("click");
                navigation.navigate("DrawerMenu", {
                  screen: "BottomTab",
                  params: { screen: "Profile" }
                });
              }}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </ComponentBody>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center"
  },
  calendarCont: {
    width: "100%",
    marginVertical: 10
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: colors.GREY,
    width: "80%",
    padding: 10,
    borderRadius: 10
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  icon: {
    width: 80,
    height: 80
  },
  modalTitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: fonts.BOLD_ITALIC,
    marginVertical: 5
  },
  modalText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: fonts.ITALIC,
    marginBottom: 5
  },
  button: {
    marginTop: 10
  }
});

export default BioCalendar;
