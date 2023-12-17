import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export default function Item({ item, patrons, setPatrons, setShowAddPatronModal }) {

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
                    <ButtonAddPatron />
                </View>
            )
        }
    }

    function Patron({ patron }) {

        let name = patron.nameFirst;
        if (patron.nameLast) {
            name += ' ' + patron.nameLast[0] + '.';
        }

        return (
            <TouchableOpacity 
                style={styles.patronButton}
                onPress={()=>addPurchase(patron)}
            >
                <Text style={styles.patronName}>
                    {name}
                </Text>
            </TouchableOpacity>
        );
    }

    function ButtonAddPatron() {
        const handleShowModal = () => {
            setShowAddPatronModal(true);
        }
        return (
            <TouchableOpacity 
                style={styles.patronButton}
                onPress={handleShowModal}
            >
                <Text style={styles.patronName}>
                    Add new patron...
                </Text>
            </TouchableOpacity>
        )
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
        fontSize: 22,
    },
    itemPrice: {
        fontSize: 18,
    },
    itemPatronContainer: {
        // backgroundColor: 'purple',
        margin: 15
    },
    itemPatronText: {
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
        backgroundColor: theme.white,
        margin: 3,
        borderRadius: 10,
        height: 50,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patronName: {
        fontSize: 20,
    }
})