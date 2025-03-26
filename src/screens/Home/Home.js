import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import BiorhythmsComp from "../../components/BiorhythmsComp";
import ComponentBody from "../../components/ComponentBody";
import Icon, { IconTypes } from "../../components/Icon";
import TextComponent from "../../components/TextComponent";
import { colors } from "../../utilities/colors";
import calculateBiorhythm from "../../utilities/calculateBiorhythms";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { fonts } from "../../utilities/fonts";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import physIcon from "../../assests/images/Physical.png";
import EmotIcon from "../../assests/images/Emotional.png";
import IntIcon from "../../assests/images/Intellectual.png";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../../components/Header";

const Home = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const [biorhythms, setBiorhythms] = useState(null);
  const [isSubscriptionModal, setSubscriptionModal] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.dob) {
      const uiu = calculateBiorhythm(user.dob);
      setBiorhythms(uiu);
    }
  }, [user?.dob]);

  useFocusEffect(() => {
    if (
      user?.is_free_trial &&
      !user?.is_subscribed &&
      !user?.is_show_subscription
    ) {
      setSubscriptionModal(true);
    }
    if (
      !user?.is_free_trial &&
      !user?.is_subscribed &&
      !user?.is_show_subscription
    ) {
      setIsFreeTrial(true);
    }
  });

  const onLogout = () => {
    dispatch(AuthMiddleware.logOut()).then(() => {
      setSubscriptionModal(false);
    });
  };

  const onPressLogout = () => {
    Alert.alert("Hold on!", "Are you sure you want to logout?", [
      { text: "No", style: "cancel" },
      { text: "YES", onPress: onLogout },
    ]);
  };

  const Biodata = {
    description: biorhythms?.description,
    data: [
      {
        type: "Physical",
        value: biorhythms?.rangePhysical,
        sign: biorhythms?.textofPhysical,
      },
      {
        type: "Emotional",
        value: biorhythms?.rangeEmotional,
        sign: biorhythms?.textofEmotional,
      },
      {
        type: "Intellectual",
        value: biorhythms?.rangeIntellectual,
        sign: biorhythms?.textofIntellectual,
      },
    ],
  };

  return (
    <ComponentBody
      contentContainerStyle={{ flexGrow: user?.dob ? 0 : 1 }}
      style={styles.container}
      center
    >
      <Header title="Home" />
      <View style={styles.headCont}>
        <TextComponent style={styles.heading} text="Biorhythms" />
        {user?.dob && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.dateCont}
          >
            <TextComponent
              text={
                user?.dob
                  ? moment(user?.dob).format("MMM-DD-YYYY")
                  : "-----------------"
              }
            />
            <FontAwesome5 name="calendar-alt" size={19} color={colors.WHITE} />
          </TouchableOpacity>
        )}
      </View>

      {user?.dob ? (
        <>
          <BiorhythmsComp data={Biodata} />
          {/*    <Text
            onPress={() =>
              navigation.navigate("PaymentMethod", {
                state: null,
                isPay: true
              })
            }
          >
            Add Payment
          </Text>
         <Text
            onPress={() =>
              navigation.navigate("Subscription", {
                state: null,
                isPay: true
              })
            }
          >
            Subscribe
          </Text> */}
        </>
      ) : (
        <View style={styles.profilePrompt}>
          <View style={styles.iconRow}>
            <Image source={physIcon} style={styles.icon} />
            <Image source={EmotIcon} style={styles.icon} />
            <Image source={IntIcon} style={styles.icon} />
          </View>

          <View style={styles.infoBox}>
            <TextComponent
              style={styles.infoTitle}
              text="Please complete your profile"
            />
            <TextComponent
              style={styles.infoText}
              text="Please provide your date of birth to get accurate insights. Go to your profile now to complete your account setup!"
            />
          </View>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate("Profile")}
            style={styles.button}
          />
        </View>
      )}

      {isSubscriptionModal && (
        <Modal visible transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={onPressLogout}
                style={styles.logoutBtn}
              >
                <Icon
                  name="logout"
                  type={IconTypes.MaterialIcons}
                  size={20}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
              <TextComponent style={styles.modalTitle} text="Subscribe Now!" />
              <TextComponent
                style={styles.modalText}
                text="Unlock Your Potential with Premium Biorhythms Insight—Elevate Your Life Today!"
              />
              <Button
                title="Subscribe now"
                onPress={() => navigation.navigate("Subscription")}
                style={styles.button}
              />
            </View>
          </View>
        </Modal>
      )}

      {isFreeTrial && (
        <Modal visible transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={onPressLogout}
                style={styles.logoutBtn}
              >
                <Icon
                  name="logout"
                  type={IconTypes.MaterialIcons}
                  size={20}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
              <TextComponent
                style={styles.modalTitle}
                text="Free Trial for Early Birds!"
              />
              <TextComponent
                style={styles.modalText}
                text="Unlock app features by adding your payment method. You won’t be charged until after the full 7-day trial!"
              />
              <Button
                title="Add Card"
                onPress={() => {
                  navigation.navigate("PaymentMethod", {
                    state: null,
                    isPay: true,
                  });
                  setIsFreeTrial(false);
                }}
                style={styles.button}
              />
            </View>
          </View>
        </Modal>
      )}
    </ComponentBody>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  heading: { fontSize: 18, color: colors.WHITE },
  headCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateCont: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 8,
  },
  profilePrompt: {
    width: "100%",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: { width: 80, height: 80 },
  infoBox: {
    backgroundColor: `${colors.WHITE}25`,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
  },
  infoTitle: {
    textAlign: "center",
    color: colors.WHITE,
    fontSize: 15,
    fontFamily: fonts.BOLD_ITALIC,
    marginBottom: 5,
  },
  infoText: {
    textAlign: "center",
    color: colors.WHITE,
    fontSize: 12,
    fontFamily: fonts.ITALIC,
  },
  button: { width: "90%", alignSelf: "center" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: colors.GREY,
    width: "90%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutBtn: { alignSelf: "flex-end" },
  modalTitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: fonts.BOLD_ITALIC,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.BOLD_ITALIC,
  },
});
