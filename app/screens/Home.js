import { 
    View, 
    Text, 
    StyleSheet,
    Pressable,
    LogBox
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import theme from '../theme/Constants';
import Button from '../components/common/Button';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Home() {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>divvy</Text>
            <Button text={'My Bills'}
                newStyle={styles.button1}
                onPress={() => navigate('My Bills')}
                disabled={false}
            />
            <Button text={'New Bill'}
                newStyle={styles.button2}
                onPress={() => navigate('MainStackGroup')}
                disabled={false}
            />
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
    button2: {
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