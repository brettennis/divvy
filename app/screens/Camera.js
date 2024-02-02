import { 
    View, 
    Text, 
    Platform,
    Button,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import useFetchOcr from '../config/useFetchOcr';

export default function Camera() {

    const { navigate } = useNavigation();

    const { fetchData, isPending, fetchError } = useFetchOcr();

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

    const submit = async () => {
        const receipt = await fetchData(imageSource);
        if (fetchError) console.log(fetchError);
        navigate('Purchases', { receipt });
    }

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" 
                onPress={pickImageLibrary} 
            />
            <Button title="Take a picture" 
                onPress={pickImageCamera} 
            />
            <Button title="Use demo receipt" 
                onPress={pickImageDemo} 
            />
            {imageUri && <Image 
                source={{ uri: imageUri }}
                resizeMode='contain'
                style={{ width: 350, height: 400 }} 
            />}
            <Button title="Submit" 
                onPress={submit} 
                disabled={!imageSource} 
            />
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
});