import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';
import { useState } from 'react';
import theme from '../theme/Constants'
import { useRoute } from '@react-navigation/native';

export default function PatronTotals({ patron, items }) {

    const findItem = (target) => items.find(item => item.id === target);
    const [isDropdown, setIsDropdown] = useState(false);

    // let name = patron.nameFirst;
    // if (patron.nameLast) {
    //     name += ' ' + patron.nameLast[0] + '.';
    // }
    let name = patron.nameFirst + ' ' + patron.nameLast;

    let totalOwed = patron.purchases.reduce((currentTotal, itemId) => {
        return findItem(itemId).amount + currentTotal;
    }, 0);

    function Purchase({ itemId }) {
        const item = findItem(itemId);
        return (
            <View style={styles.containerPurchase}>
                <Text style={styles.purchaseDescription}>
                    {item.description}
                </Text>
                <Text style={styles.purchasePrice}>
                    {item.amount}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.containerPatron}>
            <View style={styles.patronInformation}>
                <Text style={styles.patronName}> {name} </Text>
                <Text style={styles.patronOwed}> ${totalOwed} </Text>
            </View>
            <View style={styles.containerDropdown}>
                {patron.purchases.map(itemId => 
                    <Purchase key={itemId} itemId={itemId} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    containerPatron: {
        height: 85,
        marginTop: 10,
        // padding: 15,
    },
    patronInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    patronName: {
        fontSize: 23,
    },
    patronOwed: {
        fontSize: 23,
    },
    containerDropdown: {
        padding: 10,
    },
    containerPurchase: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    purchaseDescription: {
        fontSize: 20,
    },
    purchasePrice: {
        fontSize: 20,
    }
});