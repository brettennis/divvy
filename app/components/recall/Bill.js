import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Bill({ data }) {

    const [ isExpanded, setIsExpanded ] = useState(false);
    const toggleExpand = () => {setIsExpanded(!isExpanded)}

    const disp = value => (value / 100).toFixed(2);
    const findItem = (target) => items.find(item => item.id === target);
    const billPayer = data.bill_patrons.find(p => p.isBillPayer);
    const numPatrons = data.bill_patrons.length;
    const numItems = data.bill_items.length;

    const f = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
    })

    const date = new Date(data.date_receipt);
    const dateDisplay = f.format(date);

    return (
        <Pressable 
            style={styles.container}
            onPress={toggleExpand}
        >
            <View style={styles.row}>
                <View style={styles.headerLeft}>
                    <Text style={styles.text3}>{dateDisplay}</Text>
                    <Text style={styles.text1}>{data.restaurant_name}</Text>
                    {!isExpanded && <Text style={styles.text3}>
                        tap to expand
                    </Text>}
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.symbolContainer}>
                        <MaterialCommunityIcons name="food" size={26} color="black" /> 
                        <Text style={styles.textSymbol}>
                            {numItems}
                        </Text>
                        <Ionicons name="person-sharp" size={26} color="black" style={{marginLeft: 12}} /> 
                        <Text style={styles.textSymbol}>
                            {numPatrons} 
                        </Text>
                    </View>
                    <Text style={styles.textItalic}>
                        paid by {billPayer.nameFirst} {billPayer.nameLast}
                    </Text>
                </View>
            </View>
            
            {isExpanded && 
                <View style={styles.containerExpand}>
                    <Text style={styles.text2}>Patrons</Text>
                    {data.bill_patrons.map(patron => {
                        return (
                            <Text
                                style={styles.text3}
                                key={patron.id}
                            >
                                {patron.nameFirst} {patron.nameLast}
                            </Text>
                        );
                    })}
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={()=>{}}
                            style={styles.sendButton}
                        >
                            <Text style={styles.textButton}>Edit & Inspect  </Text>
                            <Entypo name="export" size={22} color={theme.white} />
                        </Pressable>
                    </View>
                </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.white,
        marginTop: 10,
        padding: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    symbolContainer: {
        backgroundColor: '#efefef',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5,
        padding: 8,
    },
    text1: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 8,
    },
    text2: {
        fontSize: 17,
    },
    text3: {
        fontSize: 14,
    },
    textItalic: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    textSymbol: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 3,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    sendButton: {
        backgroundColor: theme.purplelight,
        borderRadius: 10,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.white,
    }
});