import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import theme from '../theme/Constants';

import Button from '../components/common/Button';
import ButtonNewBill from '../components/home/ButtonNewBill';

export default function Home() {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>divvy</Text>
            <Button text={'My Bills'}
                newStyle={styles.button1}
                onPress={() => navigate('My Bills', {})}
                disabled={false}
            />
            <ButtonNewBill />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 22,
    },
    button1: {
        backgroundColor: theme.purplelight,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    logo: {
        position: 'absolute',
        left: -5,
        width: 400,
        bottom: 200,
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: theme.purple,
        opacity: 0.1,
    },
});