import { 
    View, 
    Text, 
    StyleSheet,
    Pressable, 
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import theme from '../theme/Constants'

export default function PatronTotals({ patron, items }) {

    const findItem = (target) => items.find(item => item.id === target);
    const [isDropdown, setIsDropdown] = useState(false);

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
                    + ${item.amount}
                </Text>
            </View>
        )
    }

    return (
        <Pressable 
            style={styles.containerPatron}
            onPress={() => setIsDropdown(!isDropdown)}
        >
            <View style={styles.patronInformation}>
                <View style={styles.patronInformationLeft}> 
                    {isDropdown ?
                        <Ionicons name="ios-caret-down"    size={21} color="black" /> :
                        <Ionicons name="ios-caret-forward" size={21} color="black" />
                    }  
                    <Text style={styles.patronName}> {name} </Text>
                </View>
                <Text style={styles.patronOwed}> ${totalOwed} </Text>
            </View>
            {isDropdown && <View style={styles.containerDropdown}>
                {patron.purchases.map(itemId => 
                    <Purchase key={itemId} itemId={itemId} />
                )}
                <View style={styles.containerPurchase}>
                    <Text style={styles.purchaseDescription}>
                        Tax (7%)
                    </Text>
                    <Text style={styles.purchasePrice}>
                        + $4.20
                    </Text>
                </View>
            </View>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    containerPatron: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    patronInformation: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    patronInformationLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    patronName: {
        fontSize: 23,
    },
    patronOwed: {
        fontSize: 23,
    },
    containerDropdown: {
        flex: 1,
    },
    containerPurchase: {
        height: 33,
        marginLeft: 10,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    purchaseDescription: {
        fontSize: 19,
    },
    purchasePrice: {
        fontSize: 19,
    },
});