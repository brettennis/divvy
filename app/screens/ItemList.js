import { 
    View, 
    Text,
    StyleSheet, 
    FlatList, 
    Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';

import Item from '../components/itemlist/Item';
import AddPatronModal from '../components/common/AddPatronModal';
import Button from '../components/common/Button';

const DEV = false;

const TEST_RECEIPT = {
    "tax":0.7,"tip":null,"date":"2016-01-13","mall":"600 @ Toa Payoh","time":"15:49",
    "items":[
        {
            'id' : 0,
            "amount" : 19,
            "description" : "Parmigiana",
            "qty" : 1,
        }, {
            'id' : 1,
            "amount" : 12,
            "description" : "Old Fashioned",
            "qty" : 1,
        }, {
            'id' : 2,
            "amount" : 21,
            "description" : "Marsala",
            "qty" : 1,
        }, {
            'id' : 3,
            "amount" : 10,
            "description" : "Caprese",
            "qty" : 1,
        }, {
            'id' : 4,
            "amount" : 7,
            "description" : "Risotto",
            "qty" : 1,
        }, {
            'id' : 5,
            "amount" : 15,
            "description" : "Quattro Formaggi",
            "qty" : 1,
        }, {
            'id' : 6,
            "amount" : 24,
            "description" : "Grilled Salmon",
            "qty" : 1,
        }, {
            'id' : 7,
            "amount" : 19,
            "description" : "Al Pesto",
            "qty" : 1,
        }, {
            'id' : 8,
            "amount" : 5,
            "description" : "Limoncello",
            "qty" : 1,
        } 
    ],
    "total":5.35,"region":null,"country":"US","currency":"USD",
    "merchant_name":"Osteria Cicchetti","merchant_phone":"62596362",
    "merchant_address":"1125 Military Cutoff Rd K, Wilmington, NC 28405","merchant_website":null
};

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

    const { params } = useRoute();
    // console.log(params.receipt);
    const receipt = DEV ? TEST_RECEIPT : params.receipt;

    const [showAddPatronModal, setShowAddPatronModal] = useState(false);
    const [continueDisabled, setContinueDisabled] = useState(!DEV);
    const [patrons, setPatrons] = useState(DEV ? TEST_PATRONS_1 : TEST_PATRONS);

    const { navigate } = useNavigation();

    useEffect(() => {
        const allocatedItems = Array(receipt.items.length).fill(false);

        patrons.forEach(patron => {
            patron.purchases.forEach(item => {
                allocatedItems[item] = true;
            })
        });

        const isFullyAllocated = allocatedItems.every(item => item);

        if (!DEV) setContinueDisabled(!isFullyAllocated);
    }, [patrons]);

    function ContinueButton() {

        const callback = () => {
            if (continueDisabled) {
                Alert.alert(
                    'Woah there!', 
                    'There are a couple of items that still need to be divvied up.',
                    [ { text: 'OK' } ]
                );
                return;
            }

            navigate('Totals', { patrons, receipt });
        }
        
        return (
            <Button 
                newStyle={styles.button}
                onPress={callback}
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
                data={receipt.items}
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