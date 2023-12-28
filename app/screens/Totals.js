import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList
} from 'react-native';
import { useState, useEffect } from 'react';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

import TipSlider from '../components/TipSlider';
import PatronTotals from '../components/PatronTotals';

const DEV = false;

export default function Totals() {

    const { params } = useRoute();
    const patrons = params.patrons;
    const items = params.items;

    const round = value => Math.round(value * 100) / 100;
    const disp  = value => (value / 100).toFixed(2)
    const findItem = (target) => items.find(item => item.id === target);
    const billPayer = patrons.find(p => p.isBillPayer);

    const [ tip, setTip ] = useState(20);

    let taxRate = 7;

    patrons.forEach(p => {
        p.totalOwed = p.purchases.reduce((curr, itemId) => {
            return (findItem(itemId).amount * 100) + curr;
        }, 0);
        p.taxOwed =             p.totalOwed * (taxRate * 0.01);
        p.totalOwedPlusTax =    p.totalOwed + p.taxOwed;
        p.tipOwed =             p.totalOwedPlusTax * (tip * 0.01);
        p.totalOwedPlusTip =    p.totalOwedPlusTax + p.tipOwed;
        p.totalOwedRounded =    Math.ceil(p.totalOwedPlusTip / 100) * 100;
    });

    let totalPreTip = disp(patrons.reduce((accum, p) => {
        return p.totalOwedPlusTax + accum;
    }, 0));
    let totalTipAmount = disp(patrons.reduce((accum, p) => {
        return p.tipOwed + accum;
    }, 0));
    let totalPostTip = disp(patrons.reduce((accum, p) => {
        return p.totalOwedPlusTip + accum;
    }, 0));

    function Summary() {
        return (
            <View style={styles.summary.container}>
                <Text style={styles.summary.text}>
                    The purchases add up to ${totalPreTip}.
                </Text>
                <Text style={styles.summary.text}>
                    {billPayer.nameFirst} pays ${totalTipAmount} on the tip line,
                </Text>
                <Text style={styles.summary.text}>
                    for a total of ${totalPostTip}.
                </Text>
            </View>
        )
    }

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
                                taxRate={taxRate}
                            />
                            {/* <View style={styles.line}/> */}
                        </>)
                    }
                }}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <TipSlider tip={tip} setTip={setTip} />
                }
                ListFooterComponent={<>
                    <PatronTotals 
                        patron={billPayer} 
                        items={items} 
                        billPayer={billPayer}
                        taxRate={taxRate}
                    />
                    <Summary />
                </>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    line: {
        backgroundColor: theme.black,
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: '100%',
    },
    summary: {
        container: {
            backgroundColor: theme.mintlight,
            padding: 20,
        },
        text: {
            fontSize: 20,
        }
    }
});