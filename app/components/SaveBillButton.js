import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';

export default function SaveBillButton() {

    const { navigate } = useNavigation();

    const endpoint = 'http://localhost:3000';

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);
    const [ billId, setBillId ] = useState(null);
    const [ message, setMessage ] = useState(null);

    const storeBill = async () => {
        setIsLoading(true);

        const bill = { 'restaurant': 'mommy' };

        try {
            const body = bill;

            if (billId) {
                const response = await fetch(`${endpoint}/bills/${billId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                setMessage('Bill updated!');
            } else {
                const response = await fetch(`${endpoint}/bills`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                setMessage('Bill saved! ID: ' + 69);
                setBillId(69);
            }

            setIsLoading(false);
        } catch(err) {
            setMessage('Something went wrong.');
            console.log(err);
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {isLoading && <Text style={styles.message}>LOADING...</Text>}
            {message && <Text style={styles.message}>{message}</Text>}
            <Button 
                newStyle={styles.button}
                onPress={storeBill}
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