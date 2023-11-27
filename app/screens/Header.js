import { View, Text, StyleSheet, StatusBar, } from "react-native";
import Constants from 'expo-constants';

export default function Header(props) {
    StatusBar.setBarStyle('dark-content', true);

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>divvy</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: 'wheat',
        height: Constants.statusBarHeight || 0,
    },
    titleContainer: {
        backgroundColor: 'wheat',
        paddingLeft: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 25,
        fontFamily: 'Avenir',
    },
});