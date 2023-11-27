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
    "amount" : 19,
    "description" : "Parmigiana",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 12,
    "description" : "Old Fashioned",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 21,
    "description" : "Marsala",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 10,
    "description" : "Caprese",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 7,
    "description" : "Risotto",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 15,
    "description" : "Quattro Formaggi",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 24,
    "description" : "Grilled Salmon",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 19,
    "description" : "Al Pesto",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
}, {
    "amount" : 5,
    "description" : "Limoncello",
    "flags" : "",
    "qty" : 1,
    "remarks" : null,
    "unitPrice" : null
} 
];

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

export default function PurchaseList() {

    const items2 = items.concat(items);

    return (
        <View style={styles.container}>
            <FlatList style={styles.listContainer}
                data={items}
                renderItem={({item}) => <Purchase item={item}/>}
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