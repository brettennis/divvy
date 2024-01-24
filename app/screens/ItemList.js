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

import Item from '../components/itemlist/Item';
import AddPatronModal from '../components/common/AddPatronModal';
import Button from '../components/common/Button';

const DEV = true;

const TEST_RECEIPT = {"tax":0.7,"tip":null,"date":"2016-01-13","mall":"600 @ Toa Payoh","time":"15:49",
    "items":[
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
        ],
    "total":5.35,"width":954,"height":1170,"region":null,"country":"US","currency":"USD","ocr_text":"         McDonald's Toa Payoh Central\n            600 @ Toa Payoh #01-02,\n              Singapore 319515\n                Tel: 62596362\n       McDonald's Restaurants Pte Ltd\n          GST REGN NO : M2-0023981-4\n                 TAX INVOICE\n   INV# 002201330026\n  ORD $57 -REG # 1 - 13/01/2016 15:49:52\n  QTY ITEM                            TOTAL\n    1 Med Ice Lemon Tea                2.95\n    1 Coffee with Milk                 2.40\n Eat- In Total (incl GST)              5.35\n Cash Tendered                         10.00\n Change                                 4.65\n TOTAL INCLUDES GST OF                  0.35\n     Thank You and Have A Nice Day","subtotal":null,"receipt_no":"002201330026","merchant_logo":"/ocr/api/img/demo/logos/mcd.jpg",
    "merchant_name":"Osteria Cicchetti","avg_char_width":null,"merchant_phone":"62596362","ocr_confidence":96.6,"payment_method":"cash","service_charge":null,"avg_line_height":null,"payment_details":null,"credit_card_type":null,
    "merchant_address":"1125 Military Cutoff Rd K, Wilmington, NC 28405","merchant_website":null,"source_locations":{"doc":[[{"x":44,"y":163},{"x":1094,"y":157},{"x":1102,"y":1444},{"x":52,"y":1450}]],"tax":[[{"x":949,"y":1200},{"x":1057,"y":1201},{"x":1056,"y":1258},{"x":948,"y":1257}]],"date":[[{"x":500,"y":684},{"x":965,"y":681},{"x":966,"y":747},{"x":501,"y":750}]],"total":[[{"x":936,"y":957},{"x":1041,"y":957},{"x":1041,"y":1012},{"x":936,"y":1012}]],"receipt_no":[[{"x":246,"y":588},{"x":528,"y":587},{"x":528,"y":645},{"x":246,"y":646}]],"merchant_name":[[{"x":254,"y":223},{"x":876,"y":215},{"x":877,"y":260},{"x":255,"y":269}]],"merchant_phone":[[{"x":539,"y":354},{"x":719,"y":354},{"x":719,"y":396},{"x":539,"y":397}]],"merchant_address":[[{"x":318,"y":262},{"x":832,"y":261},{"x":832,"y":309},{"x":318,"y":309}],[{"x":383,"y":308},{"x":768,"y":304},{"x":769,"y":356},{"x":384,"y":361}]],"merchant_tax_reg_no":[[{"x":574,"y":444},{"x":856,"y":438},{"x":857,"y":482},{"x":575,"y":488}]]},"credit_card_number":null,"merchant_tax_reg_no":"M2-0023981-4","merchant_company_reg_no":null}

const receipt = TEST_RECEIPT;

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

    const items = receipt.items;

    const [showAddPatronModal, setShowAddPatronModal] = useState(false);
    const [continueDisabled, setContinueDisabled] = useState(!DEV);

    const [patrons, setPatrons] = useState(DEV ? TEST_PATRONS_1 : TEST_PATRONS);
    const findItem = (target) => items.find(item => item.id === target);

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
            () => navigate('Totals', { patrons, items, receipt });
        
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