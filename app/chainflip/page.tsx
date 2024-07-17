"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProviderName } from '@swapkit/helpers';
import React, { useState } from 'react';
import Web3 from 'web3';


type QuoteParams = {
    amount: string,
    fromAsset: string,
    toAsset: string,
    // senderAddress: string,
    // recipientAddress: string,
    // provider: ProviderName,
}
const ChainflipPage = () => {

    const [quote, setQuote] = useState();
    const fetchBestQuote = async ({
        amount,
        fromAsset,
        toAsset,
        // senderAddress,
        // recipientAddress,
        // provider,
    }: QuoteParams) => {
        try {
            const THORSWAP_QUOTE_BASE_URL =
                'https://api.thorswap.net/aggregator/tokens/quote'
            const thorswapApiUrl = new URL(THORSWAP_QUOTE_BASE_URL)
            thorswapApiUrl.searchParams.append('sellAsset', fromAsset)
            thorswapApiUrl.searchParams.append('buyAsset', toAsset)
            thorswapApiUrl.searchParams.append('sellAmount', amount)
            // thorswapApiUrl.searchParams.append('senderAddress', senderAddress)
            // thorswapApiUrl.searchParams.append('recipientAddress', recipientAddress)
            // thorswapApiUrl.searchParams.append('providers', provider)
            const response = await fetch(thorswapApiUrl.toString(), {
                headers: {
                    'x-api-key': '58a7bf5c-c117-4c28-ba1a-d15627e5fe50'
                }
            })
            const data = await response.json()

            const bestRoute = data.routes[0]
            return bestRoute
        } catch (error) {
            console.error(error)
        }
    }

    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');

    const handleGetQuote = async () => {
        const getQuote = await fetchBestQuote({
            amount: '100',
            fromAsset: `${fromToken}`,
            toAsset: `${toToken}`,
            // senderAddress: '0x9452BCAf507CD6547574b78B810a723d8868C85a',
            // recipientAddress: '3QWjbQ8EwLoznHNMSrmYMRcDXcHSsckTsV',
            // provider: ProviderName.THORCHAIN
        });

        // here you can get the route
        console.log("getQuote >>>", getQuote);

        const { transaction } = getQuote;
        setQuote(transaction);
    }



    return (
        <div className='flex justify-center items-center gap-8'>
            <Card className='w-[400px]'>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-8'>
                        <div className='flex gap-12'>
                            <Select onValueChange={(value) => {
                                console.log("From Token >>>", value);
                                setFromToken(value)
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="From Token" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ETH.ETH">ETH</SelectItem>
                                    <SelectItem value="BTC.BTC">BTC</SelectItem>
                                    <SelectItem value="AVAX.AVAX">AVAX</SelectItem>
                                    <SelectItem value="BSC.BNB">BNB</SelectItem>
                                    <SelectItem value="ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48">ETH-USDC</SelectItem>
                                    <SelectItem value="ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7">ETH-USDT</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => {
                                console.log("ToToken >>>", value);
                                setToToken(value)
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="To Token" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectContent>
                                        <SelectItem value="ETH.ETH">ETH</SelectItem>
                                        <SelectItem value="BTC.BTC">BTC</SelectItem>
                                        <SelectItem value="AVAX.AVAX">AVAX</SelectItem>
                                        <SelectItem value="BSC.BNB">BNB</SelectItem>
                                        <SelectItem value="ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48">ETH-USDC</SelectItem>
                                        <SelectItem value="ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7">ETH-USDT</SelectItem>
                                    </SelectContent>
                                </SelectContent>
                            </Select>


                        </div>
                        <Input placeholder='Enter Recipient Address' />
                    </div>

                </CardContent>

                <CardFooter>
                    <Button onClick={() => {
                        handleGetQuote()
                    }}>Get Quote</Button>
                </CardFooter>
            </Card>


        </div>
    );
};

export default ChainflipPage;