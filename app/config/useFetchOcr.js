import axios from "axios"; 
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


function buildReceipt(response) {

    const receipt = {
        items: [],
        date: response.date,
        ocr_text: response.ocr_text,
        payment: response.payment.display_name,
        total: response.total,
        subtotal: response.subtotal,
        tax_amount: response.tax,
        tax_rate: null,
        tip: response.tip,
        merchant: {
            name: response.vendor.name,
            address: response.vendor.address,
            email: response.vendor.email
        }
    }

    let idIter = 0;
    response.line_items.forEach(
        (item) => {
            receipt.items.push(
                {
                    id: idIter++,
                    amount: item.total,
                    description: item.description,
                    qty: item.quantity,
                }
            )
        }
    )

    return receipt;
}

export default function useFetchOcr() {
    // const [receipt, setReceipt] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const { navigate } = useNavigation();

    const fetchData = async (imageSource) => {

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.veryfi.com/api/v8/partner/documents',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'CLIENT-ID': 'vrfmW8Vy6k4vupSsoCVUXX00KaDPDWPMbm6JVku', 
                'AUTHORIZATION': 'apikey brettennis4:222085c6d3c99263722e28b2005d669a', 
            },
            data: imageSource
        };

        setIsPending(true);

        try {
            const res = await axios(config);

            setFetchError(null);
            setIsPending(false);

            const data = await res.data;

            const receipt = buildReceipt(data);
            return receipt;

        } catch (error) {
            setFetchError(error);
            setIsPending(false);
            return null;
        }
    };

    return { fetchData, isPending, fetchError };
}