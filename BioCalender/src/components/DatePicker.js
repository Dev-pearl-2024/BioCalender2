import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextComponent from "./TextComponent";
import moment from "moment";
import { colors } from "../utilities/colors";
import { fonts } from "../utilities/fonts";
import Icon, { IconTypes } from "./Icon";
import { FontAwesome5 } from "@expo/vector-icons";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker from "expo-datetime-picker";

const DatePick = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(props?.date || new Date());

  const handleConfirm = (date) => {
    setSelectedDate(date);
    props?.setDate(date); // Callback to parent
    setDatePickerVisibility(false);
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        disabled={props?.disable}
        onPress={() => setDatePickerVisibility(true)}
        style={[styles.inputContainer]}
      >
        <TextComponent
          text={
            selectedDate
              ? moment(selectedDate).format("MMM DD yyyy")
              : props.placeholder
          }
          style={styles.text}
        />

        {!props.calendar && (
          <FontAwesome5 name="calendar-alt" size={18} color={colors.WHITE} />
        )}
      </TouchableOpacity>

      {/* Date Picker Modal */}
      {/* <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={props.maximumDate}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%"
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 17,
    gap: 5,
    paddingHorizontal: 13,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: colors?.PRIMARY,
    justifyContent: "space-between"
  },
  text: {
    fontFamily: fonts?.REGULAR,
    color: colors.BLACK,
    fontSize: 13
  }
});

export default DatePick;
