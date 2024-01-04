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
import SaveBillButton from '../components/SaveBillButton';

export default function Totals() {

    let taxRate = 7;
    let givenTip = 20;
    
    const { params } = useRoute();
    const patrons = params.patrons;
    const items = params.items;

    const disp = value => (value / 100).toFixed(2)
    const findItem = (target) => items.find(item => item.id === target);
    const billPayer = patrons.find(p => p.isBillPayer);

    const [ tip, setTip ] = useState(givenTip);

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
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Total before tip</Text>
                    <Text style={styles.summary.bold}>${totalPreTip}</Text>
                </View>
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Tip</Text>
                    <Text style={styles.summary.bold}>${totalTipAmount}</Text>
                </View>
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Total</Text>
                    <Text style={styles.summary.bold}>${totalPostTip}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
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
                    <SaveBillButton 
                        
                    />
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
            backgroundColor: theme.purplelight,
            padding: 20,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        text: {
            color: '#ffffff',
            fontSize: 22,
        },
        bold: {
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 22,
        }
    },
});