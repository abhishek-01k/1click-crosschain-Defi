import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useSwapKit } from '@/lib/swapKit';
import { toast } from '../ui/use-toast';
import { Chain } from '@swapkit/helpers';
import { Button } from '../ui/button';

const SwapInput = () => {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [sellamount, setSellAmount] = useState(0);

    const [fromToken, setFromToken] = useState("ETH");
    const [toToken, setToToken] = useState("BTC");

    const { swapKit, walletType, isWalletConnected } = useSwapKit();
    console.log("swapKit", swapKit, walletType, isWalletConnected);

    const getSelectedAddress = (chain: string) => {
        if (swapKit) {
            const getAllWallet = swapKit.getAllWallets();
            console.log("getAllWallet", getAllWallet);
            const selectedWallet = getAllWallet[chain];
            console.log('selectedWallet', selectedWallet);

            return selectedWallet;
        }
    }

    const getQuote = async () => {
        console.log("Getting quote", fromToken);

        const senderAddress = getSelectedAddress(fromToken);
        console.log("Sender Address", senderAddress);

        if (senderAddress) {
            try {
                const THORSWAP_QUOTE_BASE_URL =
                    "https://api.thorswap.net/aggregator/tokens/quote";
                const thorswapApiUrl = new URL(THORSWAP_QUOTE_BASE_URL);
                thorswapApiUrl.searchParams.append("sellAsset", `${fromToken}.${fromToken}`);
                thorswapApiUrl.searchParams.append("buyAsset", `${toToken}.${toToken}`);
                thorswapApiUrl.searchParams.append("sellAmount", sellamount.toString());
                thorswapApiUrl.searchParams.append("recipientAddress", recipientAddress);
                thorswapApiUrl.searchParams.append("senderAddress", senderAddress.address);
                // thorswapApiUrl.searchParams.append('providers', provider)
                const response = await fetch(thorswapApiUrl.toString(), {
                    headers: {
                        "x-api-key": "58a7bf5c-c117-4c28-ba1a-d15627e5fe50",
                    },
                });
                console.log("Response >>.", response);

                const data = await response.json();
                const bestRoute = data.routes[0];
                console.log("ROutes >>>", data, bestRoute);

                const swapKitclientRoute = await swapKit.swap({
                    route: bestRoute,
                });

                console.log("swapKitclientRoute", swapKitclientRoute);

                return bestRoute;
            } catch (error) {
                console.error(error);
                toast({
                    title: error.message,
                    description: "Failed to get Quote",
                });
            }
        }


    };


    return (
        <>
            <div className='flex flex-col gap-8'>
                <div className='flex justify-between'>
                    <Select
                        onValueChange={(value) => {
                            console.log("From Token >>>", value);
                            setFromToken(value);
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="From Token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="AVAX">AVAX</SelectItem>
                            <SelectItem value="BSC">BNB</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) => {
                            console.log("ToToken >>>", value);
                            setToToken(value);
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectContent>
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="BTC">BTC</SelectItem>
                                <SelectItem value="AVAX">AVAX</SelectItem>
                                <SelectItem value="BSC">BNB</SelectItem>
                            </SelectContent>
                        </SelectContent>
                    </Select>

                </div>




                <div className="flex flex-col gap-4">
                    <Label>Recipient Address</Label>
                    <Input
                        value={recipientAddress}
                        onChange={(e) => {
                            setRecipientAddress(e.target.value);
                        }}
                        placeholder="Enter Recipient Address"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <Label>Amount</Label>
                    <Input
                        type='number'
                        value={sellamount}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);

                            if (!isNaN(value) && value >= 0) {
                                setSellAmount(value);
                            }
                        }}
                        placeholder="Amount"
                    />
                </div>

                <Button onClick={getQuote}>Get Quote</Button>

            </div>
        </>
    );
};

export default SwapInput;