import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../../utilities/colors";
import TextComponent from "../../components/TextComponent";
import Header from "../../components/Header";
import ComponentBody from "../../components/ComponentBody";
import { fonts } from "../../utilities/fonts";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";
import { showAlert } from "../../Store/Actions/GeneralActions";
// import DatePicker from 'react-native-date-picker';
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import Image from "../../components/Image";
import BG from "../../assests/images/bg.png";
import { userData } from "../../Store/Actions/AuthAction";
import Storage from "../../utilities/AsyncStorage";
import CHECKED from "../../assests/images/successfull.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import MonthPicker from "react-native-month-year-picker";

const countries = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
  { label: "Brazil", value: "BR" }
];

const AddNewCard = () => {
  const navigation = useNavigation();

  const { createToken } = useStripe();

  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [dobModalOpen, setdobModalOpen] = useState(false);
  const user = useSelector((state) => state.AuthReducer.user);
  const [successModal, setSuccessModal] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const showPicker = useCallback((value) => setdobModalOpen(value), []);

  // useEffect(() => {
  //   const rs = async () => {
  //     const user = await AsyncStorage.getItem("@user");
  //     const parseJson = JSON.parse(user);
  //     console.log("user details", parseJson.id);
  //   };
  //   rs();
  // }, []);

  const handleInputChange = (text) => {
    // Remove non-numeric characters
    let cleaned = text.replace(/[^0-9]/g, "");
    // Format as MM/YY
    if (
      (cleaned.length === 1 && parseInt(cleaned[0], 10) > 1) ||
      (parseInt(cleaned[0], 10) > 0 && parseInt(cleaned[1], 10) > 2)
    ) {
      cleaned = "0" + cleaned;
    }
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else if (cleaned.length <= 8) {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Backspace" && expiry.length === 3) {
      // Remove the `/` on backspace when cursor is after it
      setExpiryDate(expiry.slice(0, -1));
    }
  };

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || expiryDate;

      showPicker(false);
      setExpiryDate(selectedDate);
    },
    [expiryDate, showPicker]
  );

  const dispatch = useDispatch();

  const storeCard = () => {
    Keyboard.dismiss();
    let data = {
      card_holder_name: holderName,
      card_number: cardNumber,
      exp_date: expiryDate,
      cvc: cvv
    };

    if (!holderName || !cardNumber || !expiryDate || !cvv) {
      dispatch(showAlert({ message: "Please fill all fields" }));
    } else {
      console.log("add new card response data:- ", data);

      dispatch(UsersMiddleware.storeCard(data, createToken)).then(
        async (res) => {
          // console.log("add new card response :- ", res);

          if (!user?.is_free_trial) {
            setSuccessModal(true);
          } else {
            if (res.id) {
              navigation.goBack();
            }
            console.log(res.id);

            //   const formdata = new FormData();
            //   formdata.append("amount", 20);
            //   formdata.append("currency", "usd");
            //   formdata.append("token", res.id);

            //   const rs = await axios.post(
            //     "https://www.biocalendar.net/api/stripe/payment",
            //     formdata,
            //     {
            //       headers: {
            //         "Content-Type": "multipart/form-data"
            //       }
            //     }
            //   );
            //   console.log(rs.data);
          }
        }
      );
    }
  };
  return (
    // <ComponentBody>
    <View style={styles.container}>
      {/* {Platform.OS === "ios" && ( */}
      <Image
        source={BG}
        style={{ height: "100%", width: "100%", position: "absolute" }}
        resizeMode={"cover"}
      />
      {/* )} */}
      <Header title={"Add New Card"} />
      <View style={{ paddingHorizontal: 10 }}>
        <TextComponent
          text={"Please enter your card details"}
          style={styles.sub_heading}
        />
        <Input
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          disabled={true}
        />

        <Input
          placeholder="Card number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          maxLength={16}
          keyboardType={"numeric"}
        />

        <View style={styles.row}>
          <View style={{ width: "49%" }}>
            <Input
              placeholder="MM/YYYY"
              style={{ width: "100%" }}
              maxLength={7}
              keyboardType={"number-pad"}
              value={expiryDate}
              onChangeText={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            {/* <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                Keyboard.dismiss(), setdobModalOpen(true);
              }}
            >
              <View style={styles.dateText}>
                <AntDesign name={"calendar"} size={20} color={colors.BORDER} />
                <Text style={{ marginLeft: 3, color: colors.WHITE }}>
                  {expiryDate
                    ? moment(expiryDate).format("MM/YYYY")
                    : "Expiry date"}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setdobModalOpen(true)}
              style={styles.DOB__Calender}
            > */}
              {/* <TextInput
                placeholder="Select Date Of Birth"
                value={expiryDate}
                editable={false}
                pointerEvents="none"
                style={{
                  color: colors.WHITE
                }}
                placeholderTextColor="white"
              /> */}
            {/* </TouchableOpacity>
            <DateTimePickerModal
              isVisible={dobModalOpen}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              minimumDate={new Date()} // ⬅️ This prevents past dates from being selected
              onConfirm={(date) => {
                setExpiryDate(moment(date).format("MM/YYYY"));
                setdobModalOpen(false);
              }}
              onCancel={() => {
                setdobModalOpen(false);
              }}
            /> */}
          </View>

          <Input
            placeholder="CVV"
            style={{ width: "48%" }}
            maxLength={4}
            keyboardType={"number-pad"}
            value={cvv}
            onChangeText={(text) => setCvv(text)}
          />
        </View>
        <Input
          placeholder="Card holder name"
          value={holderName}
          onChangeText={(text) => setHolderName(text)}
        />
        <Button
          title={"Save Details"}
          onPress={() => storeCard()}
          style={styles.button}
        />
      </View>

      <Modal
        onRequestClose={() => setSuccessModal(false)}
        animationType={"fade"}
        transparent={true}
        visible={successModal}
      >
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <Image
              source={CHECKED}
              style={[styles.icon]}
              tintColor={colors.PRIMARY}
            />
            <TextComponent
              text={
                "Congratulations! You've received a 7-day free trial. Enjoy exploring the premium features of our Mobile App!"
              }
              style={[styles.heading, { fontSize: 18, width: "85%" }]}
            />
            <Button
              title={"Continue"}
              style={styles.button}
              onPress={async () => {
                setSuccessModal(false);
                if (!user?.is_free_trial) {
                  let Userdata = {
                    ...user,
                    is_free_trial: true,
                    is_subscribed: true
                  };
                  dispatch(userData(Userdata));
                  await Storage.set("@user", JSON.stringify(Userdata));
                  navigation.navigate("DrawerMenu", { screen: "BottomTab" });
                } else {
                  navigation.goBack();
                }
              }}
            />
          </View>
        </View>
      </Modal>
      {/* {dobModalOpen && (
        <MonthPicker
          onChange={onValueChange}
          value={expiryDate ? expiryDate : new Date()}
          mode="full"
          okButton="Confirm"
          minimumDate={new Date()}
          // maximumDate={new Date(2025, 5)}
          // locale='en'
        />
      )} */}
    </View>
    // </ComponentBody>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center"
    // marginTop: 20,
  },
  button: { marginTop: 20 },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.SEMI_BOLD,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.PRIMARY,
    padding: 5,
    width: "30%",
    marginTop: 25,
    alignSelf: "center"
  },
  sub_heading: { fontSize: 14, alignSelf: "center", marginVertical: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
    borderColor: colors.PRIMARY,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  dateText: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"

    // justifyContent: "space-between",
  },
  icon: {
    width: 100,
    height: 100
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.SEMI_BOLD,
    padding: 5,
    width: "95%",
    marginVertical: 25,
    alignSelf: "center"
  },
  modal: {
    backgroundColor: colors.GREY,
    width: "90%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    height: 350
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${colors.BLACK}99`
  },
  button: {
    width: "80%",
    alignSelf: "center"
  }
});

{
  /**
  
  import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import countryCurrencyMap from "country-currency-map";
import { AntDesign } from "@expo/vector-icons"; // For dropdown arrow icon

const countries = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
  { label: "Brazil", value: "BR" }
];

const PaymentScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [currencyCode, setCurrencyCode] = useState("INR");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    const currency = countryCurrencyMap.getCurrency(countryCode);
    setCurrencyCode(currency || "Unknown");
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Pay with Card</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Card Information"
          placeholder="1234 1234 1234 1234"
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput
            label="MM / YY"
            placeholder="02 / 2025"
            style={[styles.input, styles.smallInput]}
            keyboardType="numeric"
            mode="outlined"
            value={expiry}
            onChangeText={setExpiry}
          />
          <TextInput
            label="CVC"
            placeholder="232"
            style={[styles.input, styles.smallInput]}
            keyboardType="numeric"
            value={cvv}
            mode="outlined"
            onChangeText={setCvv}
          />
        </View>

        <TextInput
          label="Cardholder Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

       
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Country or Region</Text>
          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={setSelectedCountry}
              items={countries}
              value={selectedCountry}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a country", value: null }}
              Icon={() => (
                <AntDesign
                  name="down"
                  size={16}
                  color="gray"
                  style={styles.icon}
                />
              )}
            />
          </View>
        </View>

       

        <Button
          mode="contained"
          onPress={() => alert("Processing Payment")}
          style={styles.payButton}
        >
          Pay
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5"
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "white"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333"
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  smallInput: {
    flex: 1,
    marginRight: 10
  },
  dropdownContainer: {
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333"
  },
  dropdown: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
    // padding: 10,
    position: "relative"
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
    transform: [{ translateX: -8 }]
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10
  },
  payButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 8
  }
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30
  }
};
export default PaymentScreen;


  */
}
