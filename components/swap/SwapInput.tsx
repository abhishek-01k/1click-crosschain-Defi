import React, { useState, useEffect } from "react";
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
import { RequestClient } from '@swapkit/helpers';
import { SwapKitApi } from '@swapkit/core';
import { Slider } from "@/components/ui/slider";

const SwapInput = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sellAmount, setSellAmount] = useState(0);
  const [quote, setQuote] = useState(null);
  const [bestRoute, setBestRoute] = useState(null);
  const [slippage, setSlippage] = useState(3); // 3% slippage   
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("BTC");
  const [senderAddress, setSenderAddress] = useState(null);

  const { swapKit, walletType, isWalletConnected } = useSwapKit();

  console.log("swapKit", swapKit, walletType, isWalletConnected);

  const fetchSenderAddress = (chain: string) => {
    if (swapKit && isWalletConnected) {
      const allWallets = swapKit.getAllWallets();
      const selectedWallet = allWallets[chain];
      return selectedWallet ? selectedWallet.address : null;
    }
    return null;
  };

  const getQuote = async () => {
    console.log("Getting quote for", fromToken, slippage);
  
    if (senderAddress) {
      try {
        const response: { routes: any[] } = await RequestClient.post(
          "https://dev-api.swapkit.dev/quote",
          {
            json: {
              sellAsset: `${fromToken}.${fromToken}`,
              sellAmount,
              buyAsset: `${toToken}.${toToken}`,
              sourceAddress: senderAddress,
              destinationAddress: recipientAddress,
              slippage: 1,
              providers: ["THORCHAIN","CHAINFLIP", "MAYACHAIN"],
              affiliate: "t",
              affiliateFee: 10,
            },
            headers: {
              "x-api-key": "58a7bf5c-c117-4a28-b",
              "content-type": "application/json",
            },
          }
        );
  
        console.log(response,"resp");
  
        // const swapResponse = await SwapKitApi.getSwapQuoteV2(
        //   {
        //     sellAsset: `${fromToken}.${fromToken}`,
        //     sellAmount,
        //     buyAsset: `${toToken}.${toToken}`,
        //     sourceAddress: senderAddress,
        //     destinationAddress: recipientAddress,
        //     slippage: 3,
        //     providers: ["THORCHAIN"],
        //     affiliate: "t",
        //     affiliateFee: 10,
        //   },
        //   true
        // );
  
        if (!response || !response.routes || response.routes.length === 0) {
          throw new Error("Invalid response format or no routes available");
        }
  
        const bestRoute = response.routes[0];
        console.log("Best Route", bestRoute);
        setBestRoute(bestRoute);
        setQuote(bestRoute.expectedBuyAmount);
  
        // const swapKitClientRoute = await swapKit.swap({
        //   route: bestRoute,
        // });
  
        // console.log("SwapKit Client Route", swapKitClientRoute);
  
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to get quote",
          description: "Failed to get Quote",
        });
      }
    } else {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to get a quote",
      });
    }
  };

  useEffect(() => {
    if (isWalletConnected && fromToken) {
      const address = fetchSenderAddress(fromToken);
      setSenderAddress(address);
    }
  }, [isWalletConnected, fromToken]);

  useEffect(() => {
    if (sellAmount > 0) {
      getQuote();
    }
  }, [sellAmount]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
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
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="AVAX">AVAX</SelectItem>
              <SelectItem value="BSC">BNB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-4">
          <Label>Input Amount</Label>
          <Input
            type="number"
            value={sellAmount}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setSellAmount(value);
              }
            }}
            placeholder="Input Amount"
          />
        </div>

          <div className="flex flex-col gap-4">
            <Label>Output Expected Amount</Label>
            <Input value={quote || 0} readOnly />
          </div>

        <div className="flex flex-col gap-4">
          <Label>Recipient Address</Label>
          <Input
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter Recipient Address"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Slippage</Label>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={[slippage]} // Pass an array with the slippage value
            onValueChange={(value) => setSlippage(value[0])}
            aria-label="Slippage"
          />
          <Input value={`${slippage}%`} readOnly />
        </div>
      </div>
    </>
  );
};

export default SwapInput;
