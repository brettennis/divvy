import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';
import { useState } from 'react';
import supabase from '../../config/supabaseClient';

import Button from '../common/Button';

export default function SaveBillButton({ 
    receipt,
    taxPercent,
    tipPercent,
    patrons
}) {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ billId, setBillId ] = useState(null);
    const [ message, setMessage ] = useState(null);

    const disp = value => (value / 100).toFixed(2);
    const findItem = (target) => receipt.items.find(item => item.id === target);
    const billPayer = patrons.find(p => p.isBillPayer);

    patrons.forEach(p => {
        p.totalOwed =           disp(p.totalOwed);
        p.taxOwed =             disp(p.taxOwed);
        p.totalOwedPlusTax =    disp(p.totalOwedPlusTax);
        p.tipOwed =             disp(p.tipOwed);
        p.totalOwedPlusTip =    disp(p.totalOwedPlusTip);
    });

    const bill = {
        restaurant_name: receipt.merchant.name,
        restaurant_address: receipt.merchant.address,
        date_receipt: receipt.date,
        tax_percent: taxPercent,
        tip_percent: tipPercent,
        payer_id: 1, // TODO: set to billPayer.id after storing all patrons
        receipt: receipt.ocr_text,
        bill_patrons: patrons,
        bill_items: receipt.items
    }

    const storeBill = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('bills')
            .insert([ bill ])
            .select()
            .single();

        if (error) {
            setMessage('Something went wrong.');
        }
        if (data) {
            setBillId(data.id);
        }
        setIsLoading(false);
    }

    const updateBill = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('bills')
            .update([ bill ])
            .eq('id', billId)
            .select();

        if (error) {
            setMessage('Something went wrong.');
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            {message && <Text style={styles.message}>{message}</Text>}
            <Button 
                newStyle={styles.button}
                onPress={billId ? updateBill : storeBill}
                disabled={false}
                text={isLoading ? 'Loading...' : (billId ? 'Update Bill' : 'Save Bill')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        margin: 20,
    },
});