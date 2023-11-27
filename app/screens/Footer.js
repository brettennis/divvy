import { View, Text, StyleSheet, StatusBar, } from "react-native";
import Constants from 'expo-constants';

export default function Footer(props) {

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={styles.doneButton}>
                    <Text style={styles.title}>DONE</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'wheat',
        height: Constants.statusBarHeight + 40,
    },
    buttonContainer: {
        backgroundColor: 'wheat',
        flex: 1,
        flexDirection: "row-reverse",
        padding: 15,
    },
    doneButton: {
        backgroundColor: 'orange',
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 25,
        fontFamily: 'Avenir',
    },
});