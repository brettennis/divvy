import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity,
    TextInput,
    Button,
} from 'react-native';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import theme from '../theme/Constants'

import Purchase from '../components/Purchase';
import AddPatronModal from '../components/AddPatronModal';

const DEV = false;

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
        isBillPayer: false,
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

export default function PurchaseList() {

    const items = TEST_ITEMS;

    const [showAddPatronModal, setShowAddPatronModal] = useState(false);

    const [patrons, setPatrons] = useState(TEST_PATRONS);
    const findItem = (target) => items.find(item => item.id === target)

    return (
        <View style={styles.container}>
            {DEV && <View 
                style={{
                    height: 100,
                    width: 60,
                    flexDirection: 'row',
                    justifyContent: 'center'
            }}>
                {patrons.map(patron => 
                    <View 
                        key={patron.id}
                        style={{
                        backgroundColor:'blue',
                        width: 64,
                    }}>
                        <Text style={{color:theme.white}}>
                            {patron.nameFirst}
                        </Text>
                        {patron.purchases.map(itemId => 
                            <Text 
                                style={{color:theme.white,fontSize:8,}}
                                key={itemId}>
                                {findItem(itemId).description}
                            </Text>
                        )}
                    </View>
                )}
            </View>}
            {showAddPatronModal && <AddPatronModal 
                setPatrons={setPatrons} 
                setShowAddPatronModal={setShowAddPatronModal}
            />}
            <View style={styles.buttonNext}>
                <Text style={styles.buttonNextText}>
                    Next
                </Text>
            </View>
            <FlatList style={styles.listContainer}
                data={items}
                renderItem={({item}) => 
                    <Purchase 
                        item={item}
                        patrons={patrons}
                        setPatrons={setPatrons}
                        setShowAddPatronModal={setShowAddPatronModal}
                    />
                }
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <View style={{
                        height: 100,
                    }}/>
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
    buttonNext: {
        backgroundColor: theme.purplelight,
        borderColor: theme.purple,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        position: 'absolute',
        width: 100,
        height: 60,
        zIndex: 10,
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonNextText: {
        fontWeight: 'bold',
        color: theme.white,
        fontSize: 20,
    },
})