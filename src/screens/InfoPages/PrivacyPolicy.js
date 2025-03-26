import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import ComponentBody from "../../components/ComponentBody";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Skeleton from "../../components/Skeleton";
import Header from "../../components/Header";

const TermsAndConditions = () => {
  const userdata = useSelector((state) => state.AuthReducer.user);
  const pages = useSelector((state) => state.GeneralReducer.pages);
  const dispatch = useDispatch();

  const skeletonWidths = [
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
  }, [dispatch, pages]);

  const { width } = useWindowDimensions();

  return (
    <ComponentBody>
      <Header title="Terms & Conditions" />
      {!pages ? (
        <View>
          {skeletonWidths.map((item, index) => (
            <Skeleton
              key={index}
              radius={10}
              styles={{ width: item, padding: 2, height: 25, marginBottom: 10 }}
              style={{ borderRadius: 10 }}
            />
          ))}
        </View>
      ) : (
        <RenderHtml
          baseStyle={{ color: "white", paddingHorizontal: 20 }}
          contentWidth={width}
          source={{ html: pages?.terms }}
        />
      )}
    </ComponentBody>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
