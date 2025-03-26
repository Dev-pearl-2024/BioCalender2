import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/Skeleton";
import ComponentBody from "../../components/ComponentBody";
import RenderHTML from "react-native-render-html";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Header from "../../components/Header";
const Aboutus = () => {
  const pages = useSelector((state) => state.GeneralReducer.pages);
  const dispatch = useDispatch();
  const map = [
    "100%",
    "92%",
    "95%",
    "100%",
    "80%",
    "90%",
    "100%",
    "100%",
    "92%",
    "95%",
    "100%",
    "80%",
    "90%",
    "100%",
    "100%",
    "92%",
    "95%",
    "100%",
    "80%",
    "90%",
    "100%"
  ];

  useEffect(() => {
    if (!pages) {
      dispatch(AuthMiddleware.appPages());
    }
  }, []);
  const { width } = useWindowDimensions();

  return (
    <ComponentBody>
      <Header title={"About Us"} />
      {!pages ? (
        <View>
          {map.map((item, index) => {
            return (
              <Skeleton
                radius={10}
                styles={{
                  width: item,
                  padding: 2,
                  height: 25,
                  marginBottom: 10
                }}
                style={{ borderRadius: 10 }}
              />
            );
          })}
        </View>
      ) : (
        <RenderHTML
          baseStyle={{ color: "#fff", paddingHorizontal: 20 }}
          contentWidth={width}
          source={{
            html: pages?.about
          }}
        />
      )}
    </ComponentBody>
  );
};

export default Aboutus;
