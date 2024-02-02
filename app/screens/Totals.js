import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList
} from 'react-native';
import { useState } from 'react';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

import TipSlider from '../components/totals/TipSlider';
import PatronTotals from '../components/totals/PatronTotals';
import SaveBillButton from '../components/totals/SaveBillButton';

export default function Totals() {

    let taxRate = 7; // TODO: calculate tax rate
    let givenTip = 20;
    
    const { params } = useRoute();
    const patrons = params.patrons;
    const receipt = params.receipt;

    const disp = value => (value / 100).toFixed(2);
    const findItem = (target) => receipt.items.find(item => item.id === target);
    const billPayer = patrons.find(p => p.isBillPayer);

    const shiftLeft = (p) => {
        const newp = { ...p };
        
        newp.taxOwed =          disp(p.taxOwed);
        newp.totalOwedPlusTax = disp(p.totalOwedPlusTax);
        newp.tipOwed =          disp(p.tipOwed);
        newp.totalOwedPlusTip = disp(p.totalOwedPlusTip);
        
        return newp;
    }

    const [ tip, setTip ] = useState(givenTip);
    
    patrons.forEach(p => {
        p.totalOwed = p.purchases.reduce((curr, itemId) => {
            return (findItem(itemId).amount * 100) + curr;
        }, 0);
        p.taxOwed =             p.totalOwed * (taxRate * 0.01);
        p.totalOwedPlusTax =    p.totalOwed + p.taxOwed;
        p.tipOwed =             p.totalOwedPlusTax * (tip * 0.01);
        p.totalOwedPlusTip =    p.totalOwedPlusTax + p.tipOwed;
        p.totalOwedRounded =    Math.ceil(p.totalOwedPlusTip / 100);
    });

    let totalPreTip = patrons.reduce((accum, p) => {
        return p.totalOwedPlusTax + accum;
    }, 0);
    let totalTipAmount = patrons.reduce((accum, p) => {
        return p.tipOwed + accum;
    }, 0);
    let totalPostTip = patrons.reduce((accum, p) => {
        return p.totalOwedPlusTip + accum;
    }, 0);

    function Summary() {
        return (
            <View style={styles.summary.container}>
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Total before tip</Text>
                    <Text style={styles.summary.bold}>${disp(totalPreTip)}</Text>
                </View>
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Tip</Text>
                    <Text style={styles.summary.bold}>${disp(totalTipAmount)}</Text>
                </View>
                <View style={styles.summary.row}>
                    <Text style={styles.summary.text}>Total</Text>
                    <Text style={styles.summary.bold}>${disp(totalPostTip)}</Text>
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
                        const patron = shiftLeft(item);
                        return (<>
                            <PatronTotals 
                                patron={patron} 
                                items={receipt.items} 
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
                        patron={shiftLeft(billPayer)} 
                        items={receipt.items} 
                        billPayer={billPayer}
                        taxRate={taxRate}
                    />
                    <Summary />
                    <SaveBillButton 
                        receipt={receipt}
                        taxPercent={taxRate}
                        tipPercent={tip}
                        patrons={patrons}
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