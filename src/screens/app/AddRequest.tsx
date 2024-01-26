// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../utils/colors';
import {
  Button,
  Divider,
  List,
  Searchbar,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { allCountries, bloodGroupsList } from '../../utils/constants';
import { searchPlaces } from '../../utils/locations';

const AddRequest = () => {
  const [showCountryDropDown, setShowCountryDropDown] = React.useState(false);
  const [showBloodDropDown, setShowBloodDropDown] = React.useState(false);

  const [selectedCountry, setSelectedCountry] = React.useState<any>('NP');
  const [selectedBloodGroup, setSelectedBloodGroup] = React.useState<any>('B+');
  const [phoneNumber, setPhoneNumber] = React.useState<any>('');

  const [searchQuery, setSearchQuery] = React.useState('');
  const [suggestedPlaces, setSuggestedPlaces] = React.useState<any>();
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  React.useEffect(() => {
    const searchPlace = async () => {
      setloading(true);
      const places = await searchPlaces(selectedCountry, searchQuery);
      // console.log('>>>places', places?.geonames);
      setSuggestedPlaces(places?.geonames);
      setloading(false);
    };
    // Function launches after 1.5 seconds (1500 ms) of the last keystroke
    // On first render you don't want to launch anything
    // Thus, you check if the user typed a query at first
    let timer = setTimeout(() => {
      if (!inputValue && searchQuery) searchPlace();
    }, 1500);

    // If useEffect() relaunches, you clear the function
    // That means, the previous function won't launch
    // Thus, won't send a request to the API
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSuggestionPress = (item) => {
    const displayAddress = `${item?.toponymName}, ${item?.adminName1}`;
    setInputValue(displayAddress);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSuggestedPlaces(null);
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
      <Text style={styles.suggestionItem}>
        {item?.toponymName}, {item?.adminName1}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors.PAGE_WHITE,
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <List.Item
            title="Not my current profile"
            description="Enable if you want to modify this request details"
            right={() => (
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
          />

          <Divider style={{ marginBottom: 16 }} />

          <DropDownPicker
            open={showCountryDropDown}
            value={selectedCountry}
            items={allCountries}
            searchable={true}
            setOpen={setShowCountryDropDown}
            setValue={() => {}}
            onSelectItem={(item) => {
              setSelectedCountry(item.value);
            }}
            placeholder={'Country'}
            disabled={!isSwitchOn}
          />

          <Searchbar
            style={{ marginTop: 12 }}
            placeholder="Location"
            onChangeText={setSearchQuery}
            value={inputValue ? inputValue : searchQuery}
            onClearIconPress={handleClearSearch}
            loading={loading}
            mode="bar"
            
          />
          <Divider style={{ marginTop: 16 }} />

          {!inputValue && suggestedPlaces ? (
            <FlatList
              contentContainerStyle={styles.suggestionList}
              data={suggestedPlaces}
              renderItem={renderSuggestionItem}
              keyExtractor={(item) => item.geonameId}
            />
          ) : null}

          <DropDownPicker
            open={showBloodDropDown}
            value={selectedBloodGroup}
            items={bloodGroupsList}
            setOpen={setShowBloodDropDown}
            setValue={() => {}}
            onSelectItem={(item) => {
              setSelectedBloodGroup(item.value);
            }}
            placeholder={'Blood Group'}
            containerStyle={{ marginBottom: 12 }}
            disabled={!isSwitchOn}
          />

          <TextInput
            left={<TextInput.Affix text="+977 " />}
            label="Phone number"
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(`+977${text}`)}
            disabled={!isSwitchOn}
          />
        </View>

        <Button
          mode="contained"
          // onPress={onSubmitPress}
          loading={loading}
          disabled={loading}
        >
          Request
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
  suggestionList: {
    height: 80,
    marginTop: -16,
    position: 'absolute',
    top: 60, // Adjust this based on your layout
    left: 0,
    right: 0,
    zIndex: 1, //
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
  },
  textInput: {
    width: '100%',
    marginTop: 12,
  },
});
export default AddRequest;
