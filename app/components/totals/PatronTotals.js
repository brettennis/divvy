import { 
    View, 
    Text, 
    StyleSheet,
    Pressable, 
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

export default function PatronTotals({ patron, items, billPayer, taxRate }) {

    const disp = value => (value / 100).toFixed(2)
    const findItem = (target) => items.find(item => item.id === target);
    const [isDropdown, setIsDropdown] = useState(false);

    const name = patron.nameFirst + ' ' + patron.nameLast;

    const owesText = 
        patron.id !== billPayer.id ? 
        'owes ' + billPayer.nameFirst : 
        'spent' ;

    const { 
        taxOwed,
        totalOwedPlusTax,
        tipOwed,
        totalOwedPlusTip,
        totalOwedRounded,
    } = patron;

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
                            ${taxOwed}
                        </Text>
                    </View>
                    <View style={styles.totalLine}/>
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Total before tip
                        </Text>
                        <Text style={styles.purchasePrice}>
                            ${totalOwedPlusTax}
                        </Text>
                    </View>
                    <View style={styles.containerPurchase}>
                        <Text style={styles.purchaseDescription}>
                            Tip
                        </Text>
                        <Text style={styles.purchasePrice}>
                            ${tipOwed}
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
                    ${item.amount}
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
                        <Ionicons name="ios-caret-down"    size={21} color={theme.black} /> :
                        <Ionicons name="ios-caret-forward" size={21} color={theme.black} />
                    }  
                    <Text style={styles.patronName}> {name} </Text>
                </View>
                {!isDropdown &&
                    <View style={styles.patronInformationRight}> 
                        <Text style={styles.owesText}> {owesText} </Text>
                        <Text style={styles.patronOwed}> ${totalOwedRounded / 100} </Text>
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
    owesText: {
        fontSize: 15,
    },
    containerDropdown: {
        flex: 1,
    },
    containerPurchase: {
        height: 33,
        marginTop: 3,
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
        marginLeft: 10,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: '100%',
    }
});