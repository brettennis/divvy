import { 
    View, 
    Text,
    Switch,
    StyleSheet,
} from 'react-native';

export default function SwitchRow({ state, setState, description, label }) {

    const toggleState = () => setState(prevState => !prevState);

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    {label}
                </Text>
                <Switch 
                    onValueChange={toggleState}
                    value={state}
                    trackColor={{false: '#767577', true: theme.purplelight}}
                    thumbColor={state ? theme.white : '#f4f3f4'}
                />
            </View>
            { description && <Text style={styles.textSecondary}>
                {description}
            </Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
    },
    textSecondary: {
        fontSize: 15,
        color: '#4a4a4a',
        marginBottom: 15,
    },
    row: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    line: {
        height: 1,
        borderRadius: 3,
        backgroundColor: theme.taupe,
    },
});