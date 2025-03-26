import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Authentication/Login";
import Signup from "../screens/Authentication/Signup";
import PreLogin from "../screens/Authentication/PreLogin";
import ForgotPassword from "../screens/Authentication/ForgotPassword";
import Verification from "../screens/Authentication/Verification";
import ResetPassword from "../screens/Authentication/ResetPassword";
import TermsAndConditions from "../screens/InfoPages/TermsAndConditions";
import PrivacyPolicy from "../screens/InfoPages/PrivacyPolicy";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PreLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PreLogin" component={PreLogin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default AuthStack;
