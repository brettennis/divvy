import { 
    ScrollView,
    View, 
    Text,
    TextInput,
    Switch,
    StyleSheet,
} from 'react-native';
import { useState } from 'react';

import InputRow from '../components/InputRow';
import SwitchRow from '../components/SwitchRow';

export default function Settings() {

    const [ defaultTaxRate, setDefaultTaxRate ] = useState('7');
    const [ defaultTipPercent, setDefaultTipPercent ] = useState('20');

    const [ isRoundedOwed, setIsRoundedOwed ] = useState(true);
    const [ isRoundedTip,  setIsRoundedTip  ] = useState(false);

    const displayValidAlert = (description) => {

    }

    return (
        <ScrollView 
            style={styles.container}
            keyboardShouldPersistTaps='handled'
        >
            <InputRow 
                format={'tax'}
                state={defaultTaxRate}
                setState={setDefaultTaxRate}
            />
            <InputRow 
                format={'tip'}
                state={defaultTipPercent}
                setState={setDefaultTipPercent}
            />

            <SwitchRow 
                label={'Round up owed amounts'}
                description={'This rounds up the amount each patron owes to the bill payer to the nearest dollar.'}
                state={isRoundedOwed}
                setState={setIsRoundedOwed}
            />
            <View style={styles.line} />
            <SwitchRow 
                label={'Round up total tip amount'}
                description={'This rounds up the final tip written on the receipt to the nearest dollar.'}
                state={isRoundedTip}
                setState={setIsRoundedTip}
            />

            <Text style={styles.text}>Made by Brett Ennis</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
    },
    text: {
        fontSize: 15,
    },
    line: {
        height: 1,
        borderRadius: 3,
        backgroundColor: theme.taupe,
    },
});