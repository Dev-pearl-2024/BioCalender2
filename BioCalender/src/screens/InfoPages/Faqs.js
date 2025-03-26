import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import Colapsable from "../../components/Colapsable";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import { useDispatch, useSelector } from "react-redux";
import UsersMiddleware from "../../Store/Middlewares/UsersMiddleware";
// import { TapGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture";
import { colors } from "../../utilities/colors";
import Skeleton from "../../components/Skeleton";
import Image from "../../components/Image";
import BG from "../../assests/images/bg.png";
import ComponentBody from "../../components/ComponentBody";
import Header from "../../components/Header";

const Faqs = () => {
  const faq = useSelector((state) => state.UsersReducer?.faq);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!faq) {
      getData();
    }
  }, []);

  const getData = () => {
    setLoading(true);
    dispatch(UsersMiddleware.setFaq())
      .then((res) => {
        setLoading(false);
      })
      .catch((errr) => {
        setLoading(false);
      });
  };

  const renderFaqs = ({ item }) => {
    return !loading ? (
      <Colapsable data={item} />
    ) : (
      <View>
        <Skeleton
          radius={10}
          styles={{ width: "100%", padding: 5, height: 40, marginBottom: 10 }}
          style={{ borderRadius: 5 }}
        />
        <Skeleton
          radius={10}
          styles={{ width: "100%", padding: 5, height: 40, marginBottom: 10 }}
          style={{ borderRadius: 5 }}
        />
        <Skeleton
          radius={10}
          styles={{ width: "100%", padding: 5, height: 40, marginBottom: 10 }}
          style={{ borderRadius: 5 }}
        />
      </View>
    );
  };

  return (
    <ComponentBody>
      <Header title={"FAQs"} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        style={styles.list}
        data={!loading ? faq : [1, 2, 3]}
        showsVerticalScrollIndicator={false}
        renderItem={renderFaqs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
      />
    </ComponentBody>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    paddingHorizontal: 20
  }
});
