import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import { useSelector } from 'react-redux';
import moment from "moment";
// import { Calendar } from "react-native-calendars";
import { colors } from "../utilities/colors";
import TextComponent from "./TextComponent";

const CalendarDate = (props) => {
  //const Theme = useSelector(state => state.ThemeReducer.Theme);
  const [CalanderDate, setCalanderDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  return (
    <Calendar
      current={CalanderDate}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        textSectionTitleColor: colors.WHITE,
        textSectionTitleDisabledColor: colors.GREY,
        dayTextColor: colors.WHITE,
        textDisabledColor: colors.GREY,
        arrowColor: colors.WHITE,
        // disabledArrowColor: Theme.Grey,
        monthTextColor: colors.WHITE,
        indicatorColor: "white",
        textDayFontWeight: "200",
        textMonthFontWeight: "bold",
        todayBackgroundColor: colors.GREEN,
        todayTextColor: colors.WHITE,
        textDayHeaderFontWeight: "300",
        textDayFontSize: 12,
        textMonthFontSize: 16
      }}
      style={[props?.style, styles.calendar]}
      markingType={"period"}
      markedDates={
        props?.markedDates
          ? props?.markedDates
          : {
              [props?.date ? props?.date : CalanderDate]: {
                selected: true,
                selectedColor: colors.GREEN,
                selectedTextColor: colors.WHITE
              }
            }
      }
      hideExtraDays={true}
      onDayPress={(item) => {
        props?.setDate(item.dateString);
        // setCalanderDate(moment(item.dateString).format('YYYY-MM-DD'));
      }}
      dayComponent={({ date, state }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props?.setDate(date.dateString);
              // setCalanderDate(moment(date.dateString).format('YYYY-MM-DD'));
            }}
            style={
              state == "today"
                ? {
                    backgroundColor: colors.WHITE,
                    padding: 7,
                    borderRadius: 2,
                    margin: 0,
                    shadowColor: colors.GREEN,
                    shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowOpacity: 1,
                    shadowRadius: 4.59,
                    elevation: 5
                  }
                : props.date == date?.dateString
                ? styles.todayDateCont
                : styles.dateCont
            }
          >
            <TextComponent
              style={
                state == "today" ? { color: colors.BLACK } : styles.heading
              }
              text={date.day}
            />
            {/* {state == 'today' && (
              <TextComponent style={styles.day} text={moment(date.dateString).format("ddd")} />
            )} */}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CalendarDate;
const styles = StyleSheet.create({
  calendar: {
    width: "100%"
  },
  todayDateCont: {
    backgroundColor: colors.GREEN,
    padding: 7,
    borderRadius: 2,
    margin: 0,
    shadowColor: colors.GREEN,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 4.59,
    elevation: 5
  },
  dateCont: {
    padding: 7,
    paddingVertical: 5
  },
  day: {
    fontSize: 9
  }
});
