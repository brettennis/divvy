import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList
} from 'react-native';
import { useState } from 'react';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

import PatronTotals from '../components/PatronTotals';

const DEV = true;

export default function Totals() {

    const { params } = useRoute();
    const patrons = params.patrons;
    const items = params.items;

    const findItem = (target) => items.find(item => item.id === target)

    return (
        <View style={styles.container}>
            {DEV && <View 
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
            </View>}
            <FlatList
                style={styles.patronList}
                data={patrons}
                renderItem={({ item }) =>
                    <PatronTotals patron={item} items={items}/>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    patronList: {

    },
});