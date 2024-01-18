import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Alert,
    Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import theme from '../theme/Constants'

import Item from '../components/Item';
import AddPatronModal from '../components/AddPatronModal';
import Button from '../components/Button';

const DEV = true;

const TEST_ITEMS = [
{
    'id' : 0,
    "amount" : 19,
    "description" : "Parmigiana",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 1,
    "amount" : 12,
    "description" : "Old Fashioned",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 2,
    "amount" : 21,
    "description" : "Marsala",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 3,
    "amount" : 10,
    "description" : "Caprese",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 4,
    "amount" : 7,
    "description" : "Risotto",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 5,
    "amount" : 15,
    "description" : "Quattro Formaggi",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 6,
    "amount" : 24,
    "description" : "Grilled Salmon",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 7,
    "amount" : 19,
    "description" : "Al Pesto",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    'id' : 8,
    "amount" : 5,
    "description" : "Limoncello",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
} 
];

const TEST_PATRONS = [
    {
        id: 0,
        nameFirst: "Joey",
        nameLast: "Tribbiani",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }, {
        id: 1,
        nameFirst: "Ross",
        nameLast: "Geller",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }, {
        id: 2,
        nameFirst: "Chandler",
        nameLast: "Bing",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }, {
        id: 3,
        nameFirst: "Monica",
        nameLast: "Geller",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }, {
        id: 4,
        nameFirst: "Phoebe",
        nameLast: "Buffay",
        phone: "",
        isBillPayer: true,
        isCashTipper: false,
        purchases: []
    }, {
        id: 5,
        nameFirst: "Rachel",
        nameLast: "Green",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }
];

const TEST_PATRONS_1 = [
    {
        id: 0,
        nameFirst: "Joey",
        nameLast: "Tribbiani",
        phone: "704-555-0000",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [2]
    }, {
        id: 1,
        nameFirst: "Ross",
        nameLast: "Geller",
        phone: "704-555-0001",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [1,4,5]
    }, {
        id: 2,
        nameFirst: "Chandler",
        nameLast: "Bing",
        phone: "704-555-0002",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [3]
    }, {
        id: 3,
        nameFirst: "Monica",
        nameLast: "Geller",
        phone: "704-555-0003",
        isBillPayer: false,
        isCashTipper: false,
        purchases: []
    }, {
        id: 4,
        nameFirst: "Phoebe",
        nameLast: "Buffay",
        phone: "704-555-0004",
        isBillPayer: true,
        isCashTipper: false,
        purchases: [7]
    }, {
        id: 5,
        nameFirst: "Rachel",
        nameLast: "Green",
        phone: "704-555-0005",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [6,8]
    }
];

export default function ItemList() {

    const items = TEST_ITEMS;

    const [showAddPatronModal, setShowAddPatronModal] = useState(false);
    const [continueDisabled, setContinueDisabled] = useState(!DEV);

    const [patrons, setPatrons] = useState(DEV ? TEST_PATRONS_1 : TEST_PATRONS);
    const findItem = (target) => items.find(item => item.id === target)

    const { navigate } = useNavigation();

    useEffect(() => {
        const allocatedItems = Array(items.length).fill(false);

        patrons.forEach(patron => {
            patron.purchases.forEach(item => {
                allocatedItems[item] = true;
            })
        });

        const isFullyAllocated = allocatedItems.every(item => item);

        if (!DEV) setContinueDisabled(!isFullyAllocated);
    }, [patrons]);

    function ContinueButton() {
        const continueAlert = () => {
            Alert.alert(
                'Woah there!', 
                'There are a couple of items that still need to be divvied up.',
                [ { text: 'OK' } ]
            );
        }

        const callback = 
            continueDisabled ? 
            continueAlert :
            () => navigate('Totals', { patrons, items });
        
        return (
            <Button 
                newStyle={styles.button}
                onPress={callback}
                disabled={continueDisabled}
                text={'Next'}
            />
        )
    }

    return (
        <View style={styles.container}>
            {showAddPatronModal && <AddPatronModal 
                setPatrons={setPatrons} 
                setShowAddPatronModal={setShowAddPatronModal}
            />}
            <ContinueButton />
            <FlatList style={styles.listContainer}
                data={items}
                renderItem={({item}) => 
                    <Item 
                        item={item}
                        patrons={patrons}
                        setPatrons={setPatrons}
                        setShowAddPatronModal={setShowAddPatronModal}
                    />
                }
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <View style={{ height: 100 }} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: '100%',
    },
    button: {
        position: 'absolute',
        width: 100,
        height: 60,
        bottom: 20,
        right: 20,
    }
})