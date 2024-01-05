// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Switch } from "react-native-paper";
import Row from "../components/Row";

const AddNewScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const prioties = ["Low", "Medium", "High"];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput placeholder="Title" style={styles.input} />
        <TextInput placeholder="Description" style={styles.inputDes} />
        <SelectDropdown
          data={prioties}
          defaultButtonText={"Select priority"}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <MaterialCommunityIcons
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown2DropdownStyle}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Row style={{ paddingVertical: 24 }}>
          <Text style={{ color: "black", fontSize: 18 }}>Remind me</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={() => {
              setIsSwitchOn(!isSwitchOn);
            }}
          />
        </Row>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 5, margin: 5 },
  inputDes: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 5,
    height: 70,
  },
  dropdown2BtnStyle: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    margin: 5,
  },
  dropdown2BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
export default AddNewScreen;
