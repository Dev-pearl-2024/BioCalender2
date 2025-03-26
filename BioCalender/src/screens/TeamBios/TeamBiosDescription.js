import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Biodata } from "../../utilities";
import BiorhythmsComp from "../../components/BiorhythmsComp";
import ComponentBody from "../../components/ComponentBody";
import Header from "../../components/Header";

const TeamBiosDescription = ({ route }) => {
  const renderTeamBio = ({ item }) => {
    return <BiorhythmsComp data={item} />;
  };

  return (
    <ComponentBody>
      <Header title={"Team BIOS"} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={route.params.teamBiosUser}
        keyExtractor={(item) => item.name}
        renderItem={renderTeamBio}
      />
    </ComponentBody>
  );
};

export default TeamBiosDescription;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15
  }
});
