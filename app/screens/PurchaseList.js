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

import Purchase from './Purchase';

const items = [
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

const patronsInitialize = [
    {
        id: 0,
        nameFirst: "Joey",
        nameLast: "Tribbiani",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [0,3]
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
        purchases: [6,7,1]
    }, {
        id: 3,
        nameFirst: "Monica",
        nameLast: "Geller",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [2,8]
    }, {
        id: 4,
        nameFirst: "Phoebe",
        nameLast: "Buffay",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [4]
    }, {
        id: 5,
        nameFirst: "Rachel",
        nameLast: "Green",
        phone: "",
        isBillPayer: false,
        isCashTipper: false,
        purchases: [5,6]
    }
];

export default function PurchaseList() {

    const [patrons, setPatrons] = useState(patronsInitialize);

    const findItem = (target) => items.find(item => item.id === target)

    return (
        <View style={styles.container}>
            <View 
                style={{
                    backgroundColor:'orange',
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
                        <Text style={{color:'white'}}>
                            {patron.nameFirst}
                        </Text>
                        {patron.purchases.map(itemId => 
                            <Text style={{color:'white',fontSize:8,}}>
                                {findItem(itemId).description}
                            </Text>
                        )}
                    </View>
                )}
            </View>
            <FlatList style={styles.listContainer}
                data={items}
                renderItem={({item}) => 
                    <Purchase 
                        item={item}
                        patrons={patrons}
                        setPatrons={setPatrons}
                    />
                }
                keyExtractor={item => uuid()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: '100%',
    },
})