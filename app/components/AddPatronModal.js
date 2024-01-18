import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    Button,
    Switch,
} from 'react-native';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import theme from '../theme/Constants'

export default function AddPatronModal({ setPatrons, setShowAddPatronModal }) {

    const [newPatronFirst, setNewPatronFirst] = useState('');
    const [newPatronLast, setNewPatronLast] = useState('');
    const [newPatronPhone, setNewPatronPhone] = useState('');
    const [formInvalid, setFormInvalid] = useState(false);

    const handleSubmit = () => {
        if (newPatronFirst) {
            setPatrons(patrons => [...patrons, {
                id: uuid(),
                nameFirst: newPatronFirst,
                nameLast: newPatronLast,
                phone: newPatronPhone,
                isBillPayer: false,
                isCashTipper: false,
                purchases: []
            }]);
            handleClose();
        }
        else {
            setFormInvalid(true);
        }
    }

    const handleClose = () => {
        setShowAddPatronModal(false);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Add New Patron
            </Text>

            <View style={styles.containerForm}>
                <Text style={styles.titleInput}>First Name</Text>
                <TextInput
                    onChangeText={setNewPatronFirst}
                    placeholder='John'
                    placeholderTextColor={'#636363'}
                    style={formInvalid ? styles.inputAlert : styles.input}/>
                <Text style={styles.titleInput}>Last Name</Text>
                <TextInput 
                    onChangeText={setNewPatronLast}
                    placeholder='Doe'
                    placeholderTextColor={'#636363'}
                    style={styles.input}/>
                <Text style={styles.titleInput}>Phone</Text>
                <TextInput 
                    onChangeText={setNewPatronPhone}
                    placeholder='123-555-6789'
                    placeholderTextColor={'#636363'}
                    style={styles.input}/>
            </View>

            <View style={styles.containerButton}>
                <Button
                    onPress={handleSubmit}
                    title='SUBMIT'
                    color={theme.purple}
                    style={styles.buttonSubmit}
                />
                <Button
                    onPress={handleClose}
                    title='CANCEL'
                    color={theme.purple}
                    style={styles.buttonSubmit}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.white,
        zIndex: 100,
        width: '100%',
        height: '100%',
        padding: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20,
    },
    containerForm: {
        padding: 10,
    },
    titleInput: {
        fontSize: 18,
        marginTop: 10,
    },
    input: {
        color: theme.black,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    inputAlert: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: 'red',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})