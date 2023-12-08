import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

export default function Purchase({ item, patrons, setPatrons }) {

    const [selectedPatron, setSelectedPatron] = useState(null); 
    const [isDropdown, setIsDropdown] = useState(false);

    const addPurchase = (patronTarget) => {
        setSelectedPatron(patronTarget);
        setIsDropdown(false);

        // remove purchase from all patron objects, if present
        let patronsNew = patrons.map(p => {
            let purchasesNew = [];
            for (let i = 0; i < p.purchases.length; i++) {
                if (p.purchases[i] !== item.id) {
                    purchasesNew.push(p.purchases[i]);
                }
            }
            p.purchases = purchasesNew;
            return p;
        }); 

        // add purchase to targeted patron object
        patronsNew = patronsNew.map(p => {
            if (p.id === patronTarget.id) {
                p.purchases.push(item.id);
            }
            return p;
        });

        setPatrons(patronsNew);
    }

    function PatronList() {
        if (isDropdown) { 
            return (
                <View style={styles.buttonContainer}>
                    {patrons.map(patron => 
                        <Patron 
                            key={patron.id}
                            patron={patron}
                        />
                    )}
                </View>
            )
        }
    }

    function Patron({ patron }) {
        return (
            <TouchableOpacity 
                style={styles.patronButton}
                onPress={()=>addPurchase(patron)}
            >
                <Text style={styles.patronName}>
                    {patron.nameFirst} {patron.nameLast[0] + '.'}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.purchase}
                onPress={() => setIsDropdown(!isDropdown)}
            >
                <View style={styles.itemInfoContainer}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>{'$'}{item.amount}</Text>
                </View>
                {selectedPatron && <View style={styles.itemPatronContainer}>
                    <Text style={styles.itemPatronText}>
                        {selectedPatron.nameFirst}{' '}
                        {selectedPatron.nameLast}
                    </Text>
                </View>}
            </TouchableOpacity>
            <PatronList />
        </View>
    );
    
}

const styles = StyleSheet.create({
    purchase: {
        backgroundColor: '#ffffff',
        height: 85,
        borderRadius: 15,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemInfoContainer: {
        margin: 15,
    },
    itemDescription: {
        fontSize: 25,
        fontFamily: 'Avenir',
    },
    itemPrice: {
        fontSize: 20,
        fontFamily: 'American Typewriter',
    },
    itemPatronContainer: {
        // backgroundColor: 'purple',
        margin: 15
    },
    itemPatronText: {
        fontFamily: 'Avenir',
        fontSize: 18,
    },
    buttonContainer: {
        // backgroundColor: 'white',
        paddingTop: 3,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    patronButton: {
        backgroundColor: '#ffffff',
        margin: 3,
        borderRadius: 10,
        height: 50,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patronName: {
        fontFamily: 'Avenir',
        fontSize: 20,
    }
})