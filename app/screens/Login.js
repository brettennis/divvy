import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

export default function Login() {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Button 
                newStyle={styles.button}
                onPress={() => navigate('My Bills', {})}
                disabled={false}
                text={'Login'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 22,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
});