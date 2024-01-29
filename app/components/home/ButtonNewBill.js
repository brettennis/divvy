import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

export default function ButtonNewBill() {

    const { navigate } = useNavigation();
    
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Pressable 
            style={styles.container}
            onPress={() => {setIsExpanded(true)}}
        >
            {isExpanded ?
                <View style={styles.containerInner}>
                    <Pressable 
                        style={styles.buttonInner}
                        onPress={() => navigate('MainStackGroup', {})}
                    >
                        <Text style={styles.text}>
                            From Camera
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.buttonInner}
                        onPress={() => navigate('MainStackGroup', {})}
                    >
                        <Text style={styles.text}>
                            From Library
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.buttonInner}
                        onPress={() => navigate('MainStackGroup', {})}
                    >
                        <Text style={styles.text}>
                            Demo
                        </Text>
                    </Pressable>
                </View>
                :
                <View style={styles.notExpanded}>
                    <Text style={styles.text}>
                        New Bill
                    </Text>
                </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.purplelight,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
    },
    containerInner: {
        borderRadius: 10,
        flexDirection:'column',
        gap: 10,
        padding: 10,
    },
    notExpanded: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInner: {
        height: 60,
        borderRadius: 8,
        backgroundColor: theme.purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: theme.white,
        fontSize: 20,
    },
})