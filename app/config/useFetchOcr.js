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
            console.log(data);

            const receipt = buildReceipt(data);
            return receipt;

        } catch (error) {

            setFetchError(error);
            setIsPending(false);
            return null;

        }
    };

    const fetchDemo = async () => {
        setIsPending(true);
        setFetchError(null);

        const res = await fetch("https://api.adviceslip.com/advice");
        const advice = await res.json();

        const data = {
            "account_number": null, "cashback": null, "category": "Meals & Entertainment", "created_date": "2024-02-02 18:23:23", "currency_code": "USD", "date": "2023-09-22 16:14:00", "delivery_date": null, "discount": null, "document_reference_number": "a5ca2d5240537575", "document_title": null, "document_type": "receipt", "due_date": null, "duplicate_of": 181607648, "external_id": null, "id": 182702319, "img_file_name": "182702319.jpg", "img_thumbnail_url": "https://scdn.veryfi.com/receipts/4eb785b8dc3c4d58/fddd5efc-10da-4d66-9ecb-446157104e5e/thumbnail.jpg?Expires=1706899103&Signature=HYnVQceRmQH0IywcrX38alkGZFmWbB3mC-t4-47CuHqb~7ubnzK1IFzzFBuJVDHjLY~lhnNqM9tUyzJeuz4ClCFgrM8xTGTZPzJ2PH-xXCnIqDbW~A9gNTRPYS8hQ8deh~wm9G3OuGzwgvlspFnvbF07jLW3Gq6Rxd8V0N26FKca2twSuGtH6PWUWF7d2I~BO5mMRQ~jboqJwj~oU3BiTMqcmsD5R4OmrdvIQQQrSXj0v2cAPJgkCO2qW0HWvVDQShPQ1nj~uYFlFc8pB5Eyeae0SN3Qm6Gx9ECc9dpyczAesg7DNHVp7gic8e1W8v7Qg7-feK1r1dIyQXXj5Qc0lg__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ", 
            "img_url": "https://scdn.veryfi.com/receipts/4eb785b8dc3c4d58/fddd5efc-10da-4d66-9ecb-446157104e5e/0c01ebb7-4822-4e2d-93a4-57887c79a304.jpg?Expires=1706899103&Signature=NRk1EMaghUHOlz0RMIL7B1jA2AfRbpL4MUK7lLPvhPSk7YUWVIWyjFeZx-i4-lnpLWhmuQwj8~oFNPO1RMn3-YswIJ-IzG5dWPdiHgnWJIi8FHmIXqfUiARrCu6WD9KEGn6dvR6TGZYkw3jNkj~23vXFvpzINZQ8Yyj~NtT8DIHUGF3ka59huYBNylnDsnb4k8AibzaQTqBJM5Bx0w39Is08bEBCXEgPUF7mVk5GcICOE7S~KhsB4QWSmYc-uHAlsTK0F45PcVwHIQPZ6mUXGZ0pvUwlDJi4QkeYbeHr9a2rL9gDGfC184HRWZwFXejzJt0SfOhmcoEDWK8V4jA5kg__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ", 
            "insurance": null, "invoice_number": "417", "is_duplicate": true, "is_money_in": false, 
            "line_items": [
                {"date": null, "description": "Carr's Original Crackers", "discount": null, "discount_rate": null, "id": 806336764, "order": 0, "price": null, "quantity": 1, "reference": null, "section": null, "sku": null, "tax": null, "tax_rate": null, "text": "Carr's Original Crackers $8.99", "total": 8.99, "type": "food", "unit_of_measure": null, "upc": null}, 
                {"date": null, "description": "Scaglione Ottino Con Il Pesce Arneis 21", "discount": null, "discount_rate": null, "id": 806336765, "order": 1, "price": null, "quantity": 1, "reference": null, "section": null, "sku": null, "tax": null, "tax_rate": null, "text": "Scaglione Ottino Con Il Pesce Arneis 21", "total": null, "type": "food", "unit_of_measure": null, "upc": null}, 
                {"date": null, "description": "San Giuseppe Hot Sopressata Chub", "discount": null, "discount_rate": null, "id": 806336766, "order": 2, "price": null, "quantity": 1, "reference": null, "section": null, "sku": null, "tax": null, "tax_rate": null, "text": "San Giuseppe Hot Sopressata Chub       $14.99", "total": 14.99, "type": "food", "unit_of_measure": null, "upc": null}, 
                {"date": null, "description": "Port Salut LB", "discount": null, "discount_rate": null, "id": 806336767, "order": 3, "price": null, "quantity": 1, "reference": null, "section": null, "sku": null, "tax": null, "tax_rate": null, "text": "Port Salut LB            $9.12", "total": 9.12, "type": "food", "unit_of_measure": null, "upc": null}, 
                {"date": null, "description": "Point Reyes Toma LB", "discount": null, "discount_rate": null, "id": 806336768, "order": 4, "price": null, "quantity": 1, "reference": null, "section": null, "sku": null, "tax": null, "tax_rate": null, "text": "Point Reyes Toma LB          $15.05", "total": 15.05, "type": "food", "unit_of_measure": null, "upc": null}
            ], 
            "meta": {"language": ["en", "it"], "owner": "brettennis4", "processed_pages": 1, "source": "api", "total_pages": 1}, "notes": null, "ocr_text": "demo", "order_date": null, "payment": {"card_number": "2245", "display_name": "Master Card ***2245", "terms": null, "type": "master_card"}, "pdf_url": "https://scdn.veryfi.com/receipts/4eb785b8dc3c4d58/fddd5efc-10da-4d66-9ecb-446157104e5e/00768f42-49b5-4ccb-b620-41fa86492180.pdf?Expires=1706899103&Signature=e0Xr5dR2qK1aHG35WkCLZZCOOB6NNV~h8ghNgpRxup1nB-sFjeWdM~5JhJzPIKYU7RY4IaZ1cwEL6ssdBjAdaBwO-qbEqH2jQFh~1mCOV1Y7CchAbrzclDeBg6O1c-HYBSA~d1rz7QKmT2WWS85nRZrn0po0uw29KERP2yHEMwI~8Q2A~k-n3XkhU2r8wpFU2KE2gABwqZdqLHsSTm8~D7wTF8GN9wgQnM8iVj31MWeSEqvj-~60zRK9Eej3XYZlzp946IuPe5LxTOaYNduiP9p-OZzzE~5AmWLeTAPXZ4M5ceJd74TgKPn6zGJNWXasTX8sZxumt50qLPV6jefb0w__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ", "purchase_order_number": "02496Z", "reference_number": "VBGEH-02319", "rounding": null, "service_end_date": null, "service_start_date": null, "ship_date": null, "ship_to": {"address": null, "name": null, "parsed_address": null}, "shipping": null, "store_number": "1928", "subtotal": 77.14, "tags": [], "tax": 3.06, "tax_lines": [], "tip": null, "total": 80.2, "total_weight": null, "tracking_number": null, "updated_date": "2024-02-02 18:23:24", "vendor": {"abn_number": null, "account_number": null, "address": "4331 Barclay Downs Drive, Charlotte, North Carolina 28209, United States", "bank_name": null, "bank_number": null, "bank_swift": null, "category": null, "email": null, "fax_number": null, "iban": null, "lat": 35.152533, "lng": -80.834711, "logo": "https://cdn.veryfi.com/logos/tmp/85323a4b-d637-46cc-be1a-2f8ed2207364.png", "name": "Reid's Fine Foods South Park", "phone_number": null, "raw_address": "4331 Barclay Downs Dr Charlotte, NC 28209", "raw_name": "Reid's Fine Foods South Park", "reg_number": null, "type": null, "vat_number": null, "web": null}
        }


        const receipt = buildReceipt(data);
        setIsPending(false);
        return receipt;
    }

    return { fetchData, fetchDemo, isPending, fetchError };
}