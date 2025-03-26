import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";
import { colors } from "../../utilities/colors";
import TextComponent from "../../components/TextComponent";
import { fonts } from "../../utilities/fonts";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";
import RenderHtml from "react-native-render-html";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import Icon, { IconTypes } from "../../components/Icon";
import RenderHtmlContent from "../../components/RenderHtml";
// import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import Image from "../../components/Image";
import BG from "../../assests/images/bg.png";
import { FontAwesome } from "@expo/vector-icons";
import ComponentBody from "../../components/ComponentBody";
import Header from "../../components/Header";

const SubscriptionPlans = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getSubscriptions = useSelector(
    (state) => state.UsersReducer.getSubscriptions
  );

  const { width } = useWindowDimensions();
  useEffect(() => {
    getSubscription();
  }, []);

  const getSubscription = () => {
    dispatch(UsersMiddleware.getAllSubscriptions());
  };

  const onCancelSubscription = (id) => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to turn off auto-renewel for your subscription?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "no"
        },
        {
          text: "YES",
          onPress: () => {
            dispatch(UsersMiddleware.cancelSubscription(id));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.subscription_card}>
        <TextComponent text={item?.name} style={styles.sub_heading} />
        <View style={styles.priceCont}>
          <TextComponent text={`$${item?.price}/`} style={styles.price} />
          <TextComponent text={`${item?.interval_time}`} style={styles.span} />
        </View>
        <View style={styles.hr} />
        <View style={styles.descCont}>
          <FontAwesome
            name="check"
            size={16}
            color={colors.GREEN}
            style={styles.icon}
          />

          <RenderHtmlContent text={item.description} />

          {/* <TextComponent text={item.desc} style={styles.span1} /> */}
        </View>
        {!item?.is_already_subscribed && (
          <Button
            title={"Subscribe"}
            onPress={() =>
              navigation.navigate("PaymentMethod", { state: item })
            }
          />
        )}

        {!item?.is_canceled && item?.is_already_subscribed && (
          <Button
            title={"Cancel"}
            style={{
              backgroundColor: colors.RED,
              borderColor: colors.RED,
              borderBottomColor: colors.RED
            }}
            Textstyle={{ color: colors.WHITE, fontWeight: "bold" }}
            onPress={() => onCancelSubscription(item.id)}
          />
        )}
        {item?.is_canceled && item?.is_already_subscribed && (
          <Button
            disabled={true}
            title={"Subscribed"}
            onPress={() =>
              navigation.navigate("PaymentMethod", { state: item })
            }
          />
        )}
      </View>
    );
  };

  return (
    <ComponentBody>
      <Header title={"Subscription"} props={props} />
      <FlatList
        ListHeaderComponent={
          <TextComponent
            text={`Upgrade to premium membership to Unlock all Premium features`}
            style={styles.heading}
          />
        }
        data={getSubscriptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ paddingBottom: 20 }}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </ComponentBody>
  );
};

export default SubscriptionPlans;

const styles = StyleSheet.create({
  priceCont: {
    flexDirection: "row",
    alignItems: "center"
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 30,
    textAlign: "center"
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER,
    marginVertical: 10,
    width: "97%",
    alignSelf: "center"
  },
  subscription_card: {
    alignItems: "center",
    gap: 5,
    alignSelf: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: "80%",
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: `${colors.WHITE}40`
  },
  price: {
    fontSize: 26,
    fontWeight: "bold"
  },
  sub_heading: {
    fontSize: 16,
    fontWeight: "bold"
  },
  icon: {
    marginVertical: 3,
    marginHorizontal: 10
  },
  span: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20
  },
  span1: {
    fontSize: 14,
    lineHeight: 20
  },
  descCont: {
    flexDirection: "row",
    alignItems: "center"
  }
});
