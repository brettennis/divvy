import { 
    View, 
    Text, 
    StyleSheet,
    Pressable, 
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

export default function PatronTotals({ patron, items, billPayer, tip }) {

    const findItem = (target) => items.find(item => item.id === target);
    const [isDropdown, setIsDropdown] = useState(false);

    let name = patron.nameFirst + ' ' + patron.nameLast;

    let taxRate = 7;

    let totalOwed = patron.purchases.reduce((currentTotal, itemId) => {
        return findItem(itemId).amount + currentTotal;
    }, 0);

    let tax = (totalOwed * (taxRate * 0.01)).toFixed(2);

    let totalOwedPlusTax = Number(totalOwed) + Number(tax);

    let patronTip = (totalOwedPlusTax * (tip * 0.01)).toFixed(2);

    let totalOwedPlusTip = (totalOwedPlusTax + Number(patronTip)).toFixed(2);

    function Dropdown() {
        if (isDropdown) {
            return (
                <View style={styles.containerDropdown}>
                    {patron.purchases.map(itemId => 
                        <Purchase key={itemId} itemId={itemId} />
                    )}
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Tax ({taxRate}%)
                        </Text>
                        <Text style={styles.purchasePrice}>
                            + ${tax}
                        </Text>
                    </View>
                    <View style={styles.totalLine}/>
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Total before tip
                        </Text>
                        <Text style={styles.purchasePrice}>
                            + ${totalOwedPlusTax}
                        </Text>
                    </View>
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Tip
                        </Text>
                        <Text style={styles.purchasePrice}>
                            + ${patronTip}
                        </Text>
                    </View>
                    <View style={styles.totalLine}/>
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Total
                        </Text>
                        <Text style={styles.patronOwed}> 
                            ${totalOwedPlusTip} 
                        </Text>
                    </View>
                </View>
            )
        }
    }

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
            style={styles.container}
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
                {!isDropdown &&
                    <View style={styles.patronInformationRight}> 
                        {patron.id !== billPayer.id &&
                            <Text style={styles.patronOwes}> owes {billPayer.nameFirst} </Text>
                        }
                        <Text style={styles.patronOwed}> ${totalOwedPlusTip} </Text>
                    </View>
                }
            </View>
            <Dropdown />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundImage: 'linearGradient(red, yellow)',
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
    patronInformationRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    patronName: {
        fontSize: 23,
    },
    patronOwed: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    patronOwes: {
        fontSize: 15,
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
    totalLine: {
        backgroundColor: theme.taupe,
        height: 1,
        marginLeft: 20,
        marginRight: 5,
        borderRadius: '100%',
    }
});