"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
// import { Chain, SwapKit } from "@swapkit/core";
// import { ledgerWallet } from "@swapkit/wallet-ledger";
// // import { keystoreWallet } from "@swapkit/wallet-keystore";
// import { xdefiWallet } from "@swapkit/wallet-xdefi";
// import { ThorchainPlugin } from "@swapkit/thorchain";
import { AssetValue, Chain } from "@swapkit/helpers";
import { useSwapKit } from "@/lib/swapKit";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const SDKPage = () => {
  console.log("Chain", Chain);

  // const bitcoinAsset = AssetValue.from(Chain.Bitcoin);

  const [sellamount, setSellAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [fromToken, setFromToken] = useState("ETH.ETH");
  const [toToken, setToToken] = useState("BTC.BTC");

  const { swapKit } = useSwapKit();

  console.log("swapKit", swapKit);

  const getQuote = async () => {
    console.log("Getting quote");

    try {
      const THORSWAP_QUOTE_BASE_URL =
        "https://api.thorswap.net/aggregator/tokens/quote";
      const thorswapApiUrl = new URL(THORSWAP_QUOTE_BASE_URL);
      thorswapApiUrl.searchParams.append("sellAsset", fromToken);
      thorswapApiUrl.searchParams.append("buyAsset", toToken);
      thorswapApiUrl.searchParams.append("sellAmount", sellamount.toString());
      thorswapApiUrl.searchParams.append("recipientAddress", recipientAddress);
      thorswapApiUrl.searchParams.append("senderAddress", sellerAddress);
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
        title: "Error",
        description: "Failed to get Quote",
      });
    }
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            <div className="flex gap-12">
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
                  <SelectItem value="ETH.ETH">ETH</SelectItem>
                  <SelectItem value="BTC.BTC">BTC</SelectItem>
                  <SelectItem value="AVAX.AVAX">AVAX</SelectItem>
                  <SelectItem value="BSC.BNB">BNB</SelectItem>
                  <SelectItem value="ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48">
                    ETH-USDC
                  </SelectItem>
                  <SelectItem value="ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7">
                    ETH-USDT
                  </SelectItem>
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
                    <SelectItem value="ETH.ETH">ETH</SelectItem>
                    <SelectItem value="BTC.BTC">BTC</SelectItem>
                    <SelectItem value="AVAX.AVAX">AVAX</SelectItem>
                    <SelectItem value="BSC.BNB">BNB</SelectItem>
                    <SelectItem value="ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48">
                      ETH-USDC
                    </SelectItem>
                    <SelectItem value="ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7">
                      ETH-USDT
                    </SelectItem>
                  </SelectContent>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4">
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
                <Label>Your Address</Label>
                <Input
                  value={sellerAddress}
                  onChange={(e) => {
                    setSellerAddress(e.target.value);
                  }}
                  placeholder="Enter your Address"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label>Amount</Label>
                <Input
                  value={sellamount}
                  onChange={(e) => {
                    setSellAmount(Number(e.target.value));
                  }}
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => {
              getQuote();
            }}
          >
            Get Quote
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SDKPage;
