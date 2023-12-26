import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList
} from 'react-native';
import { useState } from 'react';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

import TipSlider from '../components/TipSlider';
import PatronTotals from '../components/PatronTotals';

const DEV = false;

export default function Totals() {

    const { params } = useRoute();
    const patrons = params.patrons;
    const items = params.items;

    const [ tip, setTip ] = useState(20);

    const findItem = (target) => items.find(item => item.id === target);
    const billPayer = patrons.find(patron => patron.isBillPayer);

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
                renderItem={({ item }) => {
                    if (item.purchases.length > 0 && !item.isBillPayer) {
                        return (<>
                            <PatronTotals 
                                patron={item} 
                                items={items} 
                                billPayer={billPayer}
                                tip={tip}
                            />
                            <View style={styles.patronBorder}/>
                        </>)
                    }
                }}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <TipSlider tip={tip} setTip={setTip} />
                }
                ListFooterComponent={
                    <PatronTotals 
                        patron={billPayer} 
                        items={items} 
                        billPayer={billPayer}
                        tip={tip}
                    />
                }
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
    patronBorder: {
        backgroundColor: theme.taupe,
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: '100%',
    },
    containerTotals: {

    }
});