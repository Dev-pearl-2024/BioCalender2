import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../utilities/colors";
import SubscriptionPlans from "./SubscriptionPlans";

const Subscription = () => {
  const [focused, setFocused] = useState("My subscription");
  const options = [
    {
      id: 1,
      name: "My subscription"
    },
    {
      id: 2,
      name: "Subscription plans"
    }
  ];

  return <SubscriptionPlans />;
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.WHITE
  },
  tab_container: {
    backgroundColor: colors?.WHITE,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors?.BORDER
  }
});
