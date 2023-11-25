import { View, Text, StyleSheet } from "react-native";


export default function PurchaseList(props) {
    return (
        <View style={styles.container}>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loginButton: {
        backgroundColor: '#fc5c65',
        height: 70,
        width: '100%'
    },
    registerButton: {
        backgroundColor: '#4ecdc4',
        height: 70,
        width: '100%'
    }
})