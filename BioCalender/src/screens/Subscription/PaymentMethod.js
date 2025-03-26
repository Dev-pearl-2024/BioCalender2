import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../../utilities/colors";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { StackActions, useNavigation } from "@react-navigation/native";
import Icon, { IconTypes } from "../../components/Icon";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Image from "../../components/Image";
import VISA from "../../assests/images/visa.png";
import MASTER_CARD from "../../assests/images/mc.png";
import CHECKED from "../../assests/images/successfull.png";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Store/Actions/GeneralActions";
import moment from "moment";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";
import { deleteStoreCard } from "../../Store/Actions/UsersActions";
import BG from "../../assests/images/bg.png";
import ComponentBody from "../../components/ComponentBody";

const PaymentMethod = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.UsersReducer.getCards);

  const getCards = [
    {
      id: 1,
      card_end_number: "424242",
      brand: "visa"
    },
    {
      id: 2,
      card_end_number: "424242"
    }
  ];
  const [selectedCard, setSelectedCard] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState();
  const { state } = props?.route?.params;
  console.log(state);

  useEffect(() => {
    getCardsData();
  }, []);

  const getCardsData = () => {
    dispatch(UsersMiddleware.getAllCards()).then((res) => {
      setCards(res);
    });
  };
  const deleteCard = (item) => {
    let userData = {
      stripe_source_id: item?.stripe_source_id,
      item
    };
    dispatch(UsersMiddleware.deleteCard(userData)).then(() => {
      selectedCard?.id == item?.id && setSelectedCard("");
      setSelectedCard("");
    });
  };

  const onPayNow = () => {
    if (!selectedCard) {
      dispatch(
        showAlert({
          title: "select card",
          message: "Please select card"
        })
      );
    } else if (getCards.length == 0) {
      dispatch(
        showAlert({
          title: "select card",
          message: "Please add card"
        })
      );
    } else {
      let userData = {
        subscription_id: state?.id,
        token_id: selectedCard?.token_id,
        amount: state?.price,
        currency: "USD"
      };
      dispatch(UsersMiddleware.buySubscription(userData)).then((data) => {
        setSuccessData(data);
        setSuccessModal(true);
      });
    }
  };

  // const data = {
  //   brand: "Visa",
  //   card_exp_month: 9,
  //   card_exp_year: 2028,
  //   card_holder_name: "ABCD",
  //   card_id: "card_1R69da06ShRfWNZFAwQOV5zO",
  //   country: "US",
  //   created_at: "2025-03-24 11:57:53",
  //   id: 11,
  //   last4: "1111",
  //   token_id: "tok_1R69da06ShRfWNZFZ1d86bCR",
  //   updated_at: "2025-03-24 11:57:53",
  //   user_id: 17
  // };

  const renderItem = ({ item }) => {
    let check = selectedCard?.id == item.id;
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => {
          console.log(item);

          setSelectedCard(item);
        }}
      >
        <View style={styles.card_subview}>
          <Octicons
            name="dot-fill"
            size={22}
            color={check ? colors.GREEN : colors.WHITE}
          />
          <Image
            source={item?.brand == "visa" ? VISA : MASTER_CARD}
            style={{ width: 35, height: 35 }}
          />
          <TextComponent
            text={`******************${item?.last4}`}
            style={[styles.span, { color: colors.WHITE }]}
          />
        </View>
        <TouchableOpacity onPress={() => deleteCard(item)}>
          <FontAwesome5 name="trash" size={18} color={colors.WHITE} />

          {/* <Text style={{ color: "white" }}>Delete</Text> */}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    // <ComponentBody >
    <View style={styles.container}>
      {/* {Platform.OS === "ios" && ( */}
      <Image
        source={BG}
        style={{ height: "100%", width: "100%", position: "absolute" }}
        resizeMode={"cover"}
      />
      {/* )} */}
      <Header title={"Subscription"} />
      <TextComponent text={"Select payment method"} style={styles.heading} />
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ paddingBottom: 20 }}
        ListEmptyComponent={ListEmptyComponent}
      />
      <Button
        title={"Add a new card"}
        onPress={() => navigation.navigate("AddNewCard")}
        color={colors.WHITE}
        light
        style={styles.button}
      />
      {props?.route?.params?.isPay ? null : (
        <Button
          title={"Pay now"}
          style={styles.button}
          onPress={() => onPayNow()}
        />
      )}

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
              style={styles.icon}
              // tintColor={colors.PRIMARY}
            />
            <TextComponent
              text={"Membership purchased successfully"}
              style={[styles.heading, { fontSize: 16, width: "85%" }]}
            />
            <Button
              title={"Continue"}
              style={styles.button}
              onPress={() => {
                setSuccessModal(false);
                navigation.dispatch(StackActions.popToTop());
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
    // </ComponentBody>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  },
  button: {
    width: "80%",
    alignSelf: "center"
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
  card: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    width: "85%",
    marginVertical: 5,
    borderRadius: 10,
    // backgroundColor: `${colors.WHITE}30`
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  icon: {
    width: 150,
    height: 150
  },
  card_subview: {
    width: "90%",
    gap: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  wide_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    width: "70%"
  },
  span: { color: colors.GREY, fontSize: 12 },
  modal: {
    backgroundColor: `${colors.WHITE}80`,
    width: "90%",
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    height: 400
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${colors.BLACK}99`
  }
});

{
  /* <View style={styles.row}>
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
        </View> */
}
