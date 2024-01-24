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

import Bill from '../components/recall/Bill';

export default function Recall() {

    const { navigate } = useNavigation();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ fetchError, setFetchError ] = useState(null);
    const [ bills, setBills ] = useState([]);

    useEffect(() => {getBills()}, []);

    async function getBills() {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    const deleteBill = async (target) => {
        const { data, error } = await supabase
            .from('bills')
            .delete()
            .eq('id', target.id)
            .select();

        if (error) {
            setFetchError('Could not delete bill');
            console.log(error);
        }
        if (data) {
            setFetchError(null);
            getBills();
        }
    }

    function FilterHeader() {
        return (
            <View>
                <Text>Filter</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {fetchError && <Text style={styles.text}>{fetchError}</Text>}

            {isLoading ? <Text>LOADING...</Text> :
                <FlatList 
                    data={bills}
                    renderItem={({item}) => 
                        <Bill data={item} />
                    }
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<FilterHeader />}
                    // ListFooterComponent={}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 22,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
});