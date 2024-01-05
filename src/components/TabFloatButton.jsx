import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TabButtonBG from "./TabButtonBG";

export const TabFloatButton = ({ bgColor, ...props }) => (
  <View style={styles.container} pointerEvents="box-none">
    <TabButtonBG color={bgColor} style={styles.background} />
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <MaterialCommunityIcons name="plus" style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "#E94F37",
    elevation: 1,
  },
  buttonIcon: {
    fontSize: 16,
    color: "#F6F7EB",
  },
});
