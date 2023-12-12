import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    Button,
    Switch,
} from 'react-native';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

export default function Totals() {

    const { params } = useRoute();
    const patrons = params.patrons;
    const items = params.items;
    const findItem = (target) => items.find(item => item.id === target)

    function Patron({ patron }) {
        return (
            <View style={styles.containerPatron}>
                <Text style={styles.patronName}>
                    {patron.nameFirst} {patron.nameLast}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View 
                style={{
                    height: 100,
                    flexDirection: 'row',
            }}>
                {patrons.map(patron => 
                    <View 
                        key={patron.id}
                        style={{
                        backgroundColor:'blue',
                        width: 64,
                    }}>
                        <Text style={{color:theme.white}}>
                            {patron.nameFirst}
                        </Text>
                        {patron.purchases.map(itemId => 
                            <Text 
                                style={{color:theme.white,fontSize:8,}}
                                key={itemId}>
                                {findItem(itemId).description}
                            </Text>
                        )}
                    </View>
                )}
            </View>
            <Text>totals</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    title: {

    },
    containerPatron: {

    },
    patronName: {

    },
});