import { 
    View, 
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useState } from 'react';

export default function InputRow({ state, setState, format }) {

    const [ temp, setTemp ] = useState(state);
    const [ alertMessage, setAlertMessage ] = useState('');

    let label = '';
    let description = '';
    let min = 0;
    let max = 0;

    switch (format) {
        case 'tax':
            label = 'Default Tax Rate';
            description = 'This rate is applied if the tax cannot be determined from the receipt.';
            keyboardType='decimal-pad';
            min = 0;
            max = 10;
            break;
        case 'tip':
            label = 'Default Tip Percent';
            keyboardType='number-pad';
            min = 0;
            max = 40;
            break;
        default:
            throw new Error('Invalid format for InputRow: ' + format);
    }

    const validate = (input) => {
        try {
            const value = Number(input);
            if (value > min && value < max) return true;
            else throw new Error();
        }
        catch(err) { 
            setAlertMessage(`Value should be between ${min} and ${max}`);
            return false;
        }
    }

    const submit = () => {
        if (validate(temp)) {
            setAlertMessage('');
            setState(temp);
        }
        else {
            setTemp(state);
        }
    }

    const ValidAlert = () => {
        return (
            <View style={styles.alert.container}>
                <Text style={styles.alert.text}> {alertMessage} </Text>
            </View> 
        )
    }

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    {label}
                </Text>
                <TextInput
                    style={styles.input.number}
                    onChangeText={setTemp}
                    onBlur={submit}
                    value={temp}
                    keyboardType={keyboardType}
                    maxLength={3}
                />
            </View>
            { description && <Text style={styles.textSecondary}>
                {description}
            </Text> }
            { alertMessage && <ValidAlert message={alertMessage} /> }
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    alert: {
        container: {
            justifyContent: 'center',
            height: 40,
            paddingLeft: 10,
            marginBottom: 15,
            backgroundColor: 'red',
            borderRadius: 10,
        },
        text: {
            fontSize: 15,
            color: 'white',
        }
    },
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
    input: {
        number: {
            height: 35,
            borderWidth: 2,
            borderRadius: 13,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 20,
            borderColor: theme.taupe,
        }
    },
    line: {
        height: 1,
        borderRadius: 3,
        backgroundColor: theme.taupe,
    },
});