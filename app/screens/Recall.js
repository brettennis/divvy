import { 
    View, 
    Text, 
    FlatList,
    StyleSheet,
    Pressable
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

export default function Recall() {

    const { navigate } = useNavigation();
    const endpoint = 'http://localhost:3000';
    const [ bills, setBills ] = useState([]);

    const getBills = async () => {
        try {
            const response = await fetch(`${endpoint}/bills`);
            const data = await response.json();
            setBills(data);
            console.log(data);
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getBills();
    }, []);

    function Bill({ data }) {
        return (
            <View style={styles.bill.container}>
                <Text>{data.restaurant}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.bill.list}
                data={bills}
                renderItem={({item}) => 
                    <Bill data={item} />
                }
                keyExtractor={item => item.restaurant}
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