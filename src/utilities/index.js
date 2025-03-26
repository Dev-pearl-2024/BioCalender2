import { Platform } from "react-native";
import Storage from "../utilities/AsyncStorage";

export const platform = Platform;

export async function getHeaders() {
  let token = await Storage.getToken();
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
    // documentheaders: {
    //     Accept: '*/*',
    //     'Content-Type' : 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //   },
  };
}

export async function getHeaders_formData() {
  let token = await Storage.getToken();
  return {
    headers: {
      // Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  };
}
export async function getMultiHeaders() {
  let token = await Storage.getToken();
  return {
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
    // documentheaders: {
    //     Accept: '*/*',
    //     'Content-Type' : 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //   },
  };
}

export async function getMultiHeadersFormUrlEncoded(params) {
  return {
    headers: {
      Authorization:
        "Bearer pk_test_51PkJ4d06ShRfWNZFtQI3nuM25eMT1cbHjjSJRFHbNozetlH26nH2PENmyDVQt7F166VQk2KgSm48OKnrqE291A4A00F4WbmBYM",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
}

export const Biodata = {
  description:
    "Lorem ipsum dolor sit amet, consetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  data: [
    {
      type: "Physical",
      value: "08",
      sign: "#"
    },
    {
      type: "Emotional",
      value: "08",
      sign: "+"
    },
    {
      type: "Intellectual",
      value: "-18",
      sign: null
    }
  ]
};
