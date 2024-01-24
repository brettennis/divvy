import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../config/supabaseClient';

import Button from '../common/Button';

export default function SaveBillButton({ 
    receipt,
    taxPercent,
    tipPercent,
    patrons,
    items
}) {

    const { navigate } = useNavigation();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ billId, setBillId ] = useState(null);
    const [ message, setMessage ] = useState(null);

    const disp = value => (value / 100).toFixed(2);
    const findItem = (target) => items.find(item => item.id === target);
    const billPayer = patrons.find(p => p.isBillPayer);

    const date_receipt = `${receipt.date} ${receipt.time}:00+00`;

    patrons.forEach(p => {
        p.totalOwed =           disp(p.totalOwed);
        p.taxOwed =             disp(p.taxOwed);
        p.totalOwedPlusTax =    disp(p.totalOwedPlusTax);
        p.tipOwed =             disp(p.tipOwed);
        p.totalOwedPlusTip =    disp(p.totalOwedPlusTip);
    });

    const bill = {
        restaurant_name: receipt.merchant_name,
        restaurant_address: receipt.merchant_address,
        date_receipt,
        tax_percent: taxPercent,
        tip_percent: tipPercent,
        payer_id: 1,
        receipt,
        bill_patrons: patrons,
        bill_items: items
    }

    const storeBill = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('bills')
            .insert([ bill ])
            .select()
            .single();

        if (error) {
            console.log(error);
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
            console.log(error);
            setMessage('Something went wrong.');
        }
        if (data) {
            console.log(data);
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