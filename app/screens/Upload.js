import { 
    View, 
    Text, 
    Platform,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchOcr from '../config/useFetchOcr';
import Button from '../components/common/Button';

const DEV = true;

export default function Upload() {

    const { navigate } = useNavigation();

    const { fetchData, fetchDemo, isPending, fetchError } = useFetchOcr();

    const [imageUri, setImageUri] = useState(null);
    const [imageSource, setImageSource] = useState(null);

    const pickImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        });
  
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setImageSource(
                JSON.stringify({
                    "file_data": result.assets[0].base64
                })
            );
        }
    }

    const pickImageCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Please allow Divvy to access the camera");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 1,
        });
  
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setImageSource(
                JSON.stringify({
                    "file_data": result.assets[0].base64
                })
            );
        }
    }

    const pickImageDemo = () => {
        const host = 'https://divvy-receipt.static.domains/receipt-sample.jpg';

        setImageUri(host);
        setImageSource(JSON.stringify({ "file_url": host }));
    }

    function ContinueButton() {

        const submit = async () => {
            if (!imageSource) {
                Alert.alert(
                    'Woah there!', 
                    'Upload an image of your receipt, or choose the demo receipt to continue.',
                    [ { text: 'OK' } ]
                );
                return;
            }

            const receipt = DEV ? await fetchDemo() : await fetchData(imageSource);
    
            if (fetchError) console.log(fetchError);
            
            navigate('Purchases', { receipt });
        }
        
        return (
            <Button 
                newStyle={styles.button}
                onPress={submit}
                text={'Next'}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Button text="Pick an image from camera roll" 
                onPress={pickImageLibrary} 
            />
            <Button text="Take a picture" 
                onPress={pickImageCamera} 
            />
            <Button text="Use demo receipt" 
                onPress={pickImageDemo} 
            />
            {imageUri && <Image 
                source={{ uri: imageUri }}
                resizeMode='contain'
                style={{ width: 350, height: 400 }} 
            />}
            <ContinueButton />
            <ActivityIndicator 
                color={theme.purple}
                size={'large'}
                animating={isPending}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
    },
    button: {
        position: 'absolute',
        width: 100,
        height: 60,
        bottom: 20,
        right: 20,
    }
});