import { 
    View, 
    Text, 
    StyleSheet,
    Pressable
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

export default function Home() {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>

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