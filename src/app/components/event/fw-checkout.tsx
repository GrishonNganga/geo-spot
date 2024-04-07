import { CardTitle } from '@/components/ui/card';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import { useEffect, useState } from 'react';

export default function FlutterwaveCheckout({ customer, className }: { customer: { email: string, phone_number: string, name: string }, className: string }) {
    const fwCallback = (response: any) => {
        console.log("Callback called")
    }
    console.log("C", customer)
    const defaultConfig = {
        public_key: process.env.FW_PUBLIC_KEYS!,
        tx_ref: `trx_${Date.now().toString()}`,
        amount: 100,
        currency: 'KES',
        payment_options: 'card,mobilemoney',
        customer: { ...customer },
        customizations: {
            title: 'Arboretum plant trees',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
        text: 'Pay now',
        callback: fwCallback,
        onClose: () => { },
    };

    return (
        <div className='flex flex-col'>
            <FlutterWaveButton className={className} {...defaultConfig} />
        </div>
    )
}