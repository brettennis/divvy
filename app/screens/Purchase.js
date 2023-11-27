import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const patrons = [
    {
        nameFirst: "Joey",
        nameLast: "Tribbiani",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }, {
        nameFirst: "Ross",
        nameLast: "Geller",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }, {
        nameFirst: "Chandler",
        nameLast: "Bing",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }, {
        nameFirst: "Monica",
        nameLast: "Geller",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }, {
        nameFirst: "Phoebe",
        nameLast: "Buffay",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }, {
        nameFirst: "Rachel",
        nameLast: "Green",
        phone: "",
        isBillPayer: false,
        isCashTipper: false
    }
];
    
export default function Purchase({ item }) {

    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => setIsFlipped(true);

    const [selectedPatron, setPatron] = useState(null);

    if (!isFlipped) {
        return (
            <TouchableOpacity 
                style={styles.purchase}
                onPress={handleFlip}
            >
                <View style={styles.itemInformation}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>{'$'}{item.amount}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <View>
                <FlatList style={styles.buttonContainer}
                    data={patrons}
                    renderItem={({patron}) => 
                        <Patron 
                            setPatron={setPatron}
                            setIsFlipped={setIsFlipped} 
                            patron={patron}
                        />
                    }
                    keyExtractor={patron => uuid()}
                    horizontal={true}
                />
            </View>

        );
    }
}

export function Patron({ setPatron, setIsFlipped, patron }) {

    const handleSelectPatron = () => {
        setPatron(patron);        
        setIsFlipped(false);
    }

    return (
        <TouchableOpacity 
            style={styles.patronButton}
            onPress={handleSelectPatron}
        >
            <Text style={styles.patronName}>
                Yeah boy
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
    },
    itemInformation: {
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
    buttonContainer: {
        // backgroundColor: 'white',
        height: 120,
        marginTop: 10,
        flex: 1,
    },
    patronButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 80,
        marginLeft: 5,
        padding: 5,
    },
})