import { 
    View, 
    Text, 
    Platform,
    Button,
    StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const fs = require('fs');

const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
const imageFile = '../assets./receipt-sample.jpg';

export default function Camera() {

    const display = 'loading...';

    useEffect(() => {
            fetch(
                receiptOcrEndpoint, 
                {
                    api_key: 'TEST',
                    recognizer: 'auto',
                    ref_no: 'ocr_nodejs_123',
                    file: fs.createReadStream(imageFile)
                },
            )
            .then(res => {
                console.log(res);
            })
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )

            // request.post({
            //     url: receiptOcrEndpoint,
            //     formData: {
            //         api_key: 'TEST',
            //         recognizer: 'auto',
            //         ref_no: 'ocr_nodejs_123',
            //         file: fs.createReadStream(imageFile)
            //     },
            // }, (err, response, body) => {
            //     if(err) console.error(err);
            //     display = body;
            // });
        }, []
    );

    return (
        <View style={styles.container}>
            <Text>
                {display}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 15,
    },
});