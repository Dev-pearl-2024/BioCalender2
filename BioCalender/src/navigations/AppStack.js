import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerMenu from "./DrawerMenu";
import EditProfile from "../screens/Profile/EditProfile";
import BioCalendar from "../screens/Calendar/Calendar";
import TeamBios from "../screens/TeamBios/TeamBios";
import TeamBiosDescription from "../screens/TeamBios/TeamBiosDescription";
import HelpCenter from "../screens/HelpCenter/HelpCenter";
import Faqs from "../screens/InfoPages/Faqs";
import PrivacyPolicy from "../screens/InfoPages/PrivacyPolicy";
import TermsAndConditions from "../screens/InfoPages/TermsAndConditions";
import Subscription from "../screens/Subscription";
import PaymentMethod from "../screens/Subscription/PaymentMethod";
import AddNewCard from "../screens/Subscription/AddNewCard";
import SubscriptionPlans from "../screens/Subscription/SubscriptionPlans";
import Aboutus from "../screens/InfoPages/Aboutus";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerMenu"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Calendar" component={BioCalendar} />
      <Stack.Screen name="TeamBios" component={TeamBios} />
      <Stack.Screen
        name="TeamBiosDescription"
        component={TeamBiosDescription}
      />
      <Stack.Screen name="FAQ" component={Faqs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="Subscription" component={SubscriptionPlans} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="AddNewCard" component={AddNewCard} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
    </Stack.Navigator>
  );
};

export default AppStack;
