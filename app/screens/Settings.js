import { 
    ScrollView,
    View, 
    StyleSheet,
} from 'react-native';
import { useState } from 'react';

import InputRow from '../components/settings/InputRow';
import SwitchRow from '../components/settings/SwitchRow';

export default function Settings() {

    const [ defaultTaxRate, setDefaultTaxRate ] = useState('7');
    const [ defaultTipPercent, setDefaultTipPercent ] = useState('20');

    const [ isRoundedOwed, setIsRoundedOwed ] = useState(true);
    const [ isRoundedTip,  setIsRoundedTip  ] = useState(false);

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
            <View style={styles.line} />
            <InputRow 
                format={'tip'}
                state={defaultTipPercent}
                setState={setDefaultTipPercent}
            />
            <View style={styles.line} />
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