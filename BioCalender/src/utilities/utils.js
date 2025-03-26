import { Platform } from "react-native";
import Storage from "./AsyncStorage";

export const platform = Platform;

export const headers = {
  config: async () => {
    let token = await Storage.getToken();

    return {
      // timeout: 5000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
  },
  configRNFetch: async () => {
    let token = await Storage.getToken();
    return {
      // timeout: 5000,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    };
  }
};
