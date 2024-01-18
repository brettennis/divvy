import { 
    View, 
    Text, 
    FlatList,
    StyleSheet,
    Pressable
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import supabase from '../config/supabaseClient';

import Button from '../components/Button';

export default function Recall() {

    const { navigate } = useNavigation();
    const [ fetchError, setFetchError ] = useState(null);
    const [ bills, setBills ] = useState([]);

    const getBills = async () => {
        const { data, error } = await supabase
            .from('bills')
            .select();

        if (error) {
            setFetchError('Could not fetch bills');
            setBills(null);
            console.log(error);
        }
        if (data) {
            setBills(data);
            setFetchError(null);
        }
    }

    useEffect(() => {getBills()}, []);

    function Bill({ data }) {
        return (
            <View style={styles.bill.container}>
                <Text style={styles.bill.text}>{data.restaurant_name}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {fetchError && <Text style={styles.text}>{fetchError}</Text>}
            <FlatList 
                style={styles.bill.list}
                data={bills}
                renderItem={({item}) => 
                    <Bill data={item} />
                }
                keyExtractor={item => item.id}
                // ListFooterComponent={}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 22,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    bill: {
        list: {

        },
        container: {

        },
        text: {
            fontSize: 15,
        }
    },
});