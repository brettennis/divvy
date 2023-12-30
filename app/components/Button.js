import { 
    View, 
    Text, 
    StyleSheet,
    Pressable,
} from 'react-native';

export default function Button({ newStyle, onPress, disabled, text }) {

    if (disabled) styles.container = {
        ...styles.container,
        ...styles.containerDisabled
    }
    const containerStyle = {
        ...styles.container,
        ...newStyle
    }

    return (
        <Pressable 
            style={containerStyle}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.purple,
        borderRadius: 10,
        height: 60,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerDisabled: {
        backgroundColor: theme.black,
        opacity: 0.2,
    },
    text: {
        fontWeight: 'bold',
        color: theme.white,
        fontSize: 20,
    },
})