import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export default function Purchase({ item, patrons, setPatrons }) {

    const [isDropdown, setIsDropdown] = useState(false);
    const handleFlip = () => setIsDropdown(!isDropdown);

    const [selectedPatron, setPatron] = useState(null);

    const addPurchase = (itemId, patronId) => {
        const patronNew = patrons.find(patron => patron.id === patronId);
        patronNew.purchases.push(itemId);
        setPatrons(prev => { return { ...prev, patronNew}});
    }

    const patronList = () => {
        if (isDropdown) { 
            return (
                <View style={styles.buttonContainer}>
                    {patrons.map(patron => 
                        <Patron 
                            key={patron.id}
                            setPatron={setPatron}
                            setIsDropdown={setIsDropdown} 
                            patron={patron}
                        />
                    )}
                </View>
            )
        }
    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.purchase}
                onPress={handleFlip}
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
            {patronList()}
        </View>
    );
    
}

function Patron({ setPatron, setIsDropdown, patron }) {

    const handleSelectPatron = () => {
        setPatron(patron);
        setIsDropdown(false);
    }

    return (
        <TouchableOpacity 
            style={styles.patronButton}
            onPress={handleSelectPatron}
        >
            <Text style={styles.patronName}>
                {patron.nameFirst} {patron.nameLast[0] + '.'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    purchase: {
        backgroundColor: 'lightblue',
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
        backgroundColor: 'white',
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