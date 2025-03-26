import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AuthStack from "./AuthStack";
import {
  Text,
  View,
  Modal as RNModal,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import AppStack from "./AppStack";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Expo-Compatible Storage
import { login, Logout, userData } from "../Store/Actions/AuthAction";
import { Snackbar } from "react-native-paper";
import { hideAlert } from "../Store/Actions/GeneralActions";
import { colors } from "../utilities/colors";
import * as SplashScreen from "expo-splash-screen"; // Expo Splash Screen
import { AntDesign } from "@expo/vector-icons"; // Expo Icons

import BG from "../assests/images/bg.png";
import Button from "../components/Button";
import Image from "../components/Image";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

const AppNavigation = () => {
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);
  const loading = useSelector((state) => state.GeneralReducer.loading);
  const showAlert = useSelector((state) => state.GeneralReducer.showAlert);
  const alert = useSelector((state) => state.GeneralReducer.alertOptions);
  const showProgress = useSelector(
    (state) => state.GeneralReducer.showProgress
  );
  const progressValue = useSelector(
    (state) => state.GeneralReducer.progressValue
  );

  const dispatch = useDispatch();
  const [session, setSession] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, [isLogin]);

  const checkAuthentication = async () => {
    try {
      let user_data = await AsyncStorage.getItem("@user");
      if (user_data) {
        const userdata = JSON.parse(user_data);
        dispatch(userData(userdata));
        dispatch(login(true));
      } else {
        dispatch(login(false));
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(Logout());
    setSession(true);
  };

  return (
    <ImageBackground source={BG} resizeMode="stretch" style={styles.fullScreen}>
      {/* <NavigationContainer theme={navTheme}> */}
      {Platform.OS === "ios" ? (
        <SafeAreaView style={{ flex: 1 }}>
          {isLogin == null ? <></> : isLogin ? <AppStack /> : <AuthStack />}
        </SafeAreaView>
      ) : isLogin == null ? (
        <></>
      ) : isLogin ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}

      {/* Loading Modal */}
      <RNModal visible={loading} transparent>
        <View style={styles.modalContainer}>
          <ActivityIndicator size={"large"} color={colors.WHITE} />
          <Text style={styles.loadingText}>Loading, Please wait...</Text>
        </View>
      </RNModal>

      {/* Progress Modal */}
      <RNModal visible={showProgress} transparent>
        <View style={styles.modalContainer}>
          <ActivityIndicator size={"large"} color={colors.WHITE} />
          <Text style={styles.loadingText}>
            {`${progressValue?.completed.toFixed()}% Completed..`}
          </Text>
        </View>
      </RNModal>

      {/* Session Expired Modal */}
      {alert?.status == 401 ? (
        <RNModal transparent visible={session}>
          <View style={styles.modalContainer}>
            <View style={styles.sessionModal}>
              <AntDesign
                name="exclamationcircleo"
                size={56}
                color={colors.PRIMARY}
                style={styles.warningIcon}
              />
              <Text style={styles.sessionText}>Your Session Has Expired!</Text>
              <Button
                title="Logout"
                color={colors.PRIMARY}
                style={styles.logoutButton}
                onPress={() => {
                  setSession(false);
                  logout();
                }}
              />
            </View>
          </View>
        </RNModal>
      ) : (
        <Snackbar
          onDismiss={() => dispatch(hideAlert())}
          duration={3000}
          style={{ backgroundColor: colors.PRIMARY }}
          visible={showAlert}
        >
          {alert?.message || null}
        </Snackbar>
      )}
      {/* </NavigationContainer> */}
    </ImageBackground>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFill,
    flex: 1
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingText: {
    color: "#fff",
    margin: 10
  },
  sessionModal: {
    borderRadius: 20,
    backgroundColor: colors.LIGHT_GREY,
    width: "90%",
    padding: 20,
    alignItems: "center"
  },
  warningIcon: {
    marginVertical: 15
  },
  sessionText: {
    color: colors.BLACK,
    textAlign: "center",
    fontSize: 18
  },
  logoutButton: {
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 10
  }
});
