// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../utils/colors";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16, backgroundColor: Colors.PAGE_WHITE }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            textAlign: "center",
                            marginBottom: 16,
                            color: "grey",
                        }}
                    >
                        No to-do found.
                    </Text>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("ProfileStack", { screen: "Profile" })}
                    >
                        <Text>Go to Profile Tab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Details")}
                    >
                        <Text>Open Details Screen</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "grey",
        padding: 10,
        width: 300,
        marginTop: 16,
    },
});
export default HomeScreen;
