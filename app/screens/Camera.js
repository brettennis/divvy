import { 
    View, 
    Text, 
    Platform,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import axios from "axios"; 

export default function Camera() {
    const [imageUri, setImageUri] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [result, setResult] = useState(null);
  
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

    function fetchOCR() {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.veryfi.com/api/v8/partner/documents',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'CLIENT-ID': 'vrfmW8Vy6k4vupSsoCVUXX00KaDPDWPMbm6JVku', 
                'AUTHORIZATION': 'apikey brettennis4:222085c6d3c99263722e28b2005d669a', 
            },
            data : imageSource
        };
          
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
            <Button title="Continue" 
                onPress={fetchOCR} 
                disabled={!imageSource} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 15,
    },
});