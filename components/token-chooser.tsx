"use client";

import { Button } from "./ui/button";
//@ts-ignore
import { Btc, Usdt } from 'react-cryptocoins';
import { inspect } from "util";
import styles from './token-chooser.module.css';
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// Define the Token interface
interface Token {
  chain: string;
  chainId: string;
  ticker: string;
  identifier: string;
  decimals: number;
  logoURI: string;
  address?: string;
}

// Define the props interface
interface TokenChooserProps {
  blockedAction: boolean;
  selectedToken: Token;
  setSelectedToken: (token: Token) => void;
  selectableTokens: {
    provider: string;
    name: string;
    timestamp: string;
    version: {
      major: number;
      minor: number;
      patch: number;
    };
    keywords: string[];
    count: number;
    tokens: Token[];
  };
}

const TokenChooser = (props: TokenChooserProps) => {
  console.log(props, "props");

  const handleTokenChange = (value: string) => {
    const selectedToken = props.selectableTokens.tokens.find(token => token.identifier === value);
    if (selectedToken) {
      props.setSelectedToken(selectedToken);
    }
  };

  return (
    <Select disabled={props.blockedAction} onValueChange={handleTokenChange}>
      <SelectTrigger className="w-[180px]">
        <Button variant="outline" className="min-w-[100px] w-auto px-2 py-1 gap-2 justify-start">
          <div className="flex gap-2">
            {/* <Image className="mix-blend-multiply" src={props.selectedToken.logoURI} width={20} height={20} alt={props.selectedToken.ticker} /> */}
            <span>{props.selectedToken?.ticker}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col gap-2">
          {props.selectableTokens.tokens.map((token: Token) => (
            <SelectItem key={token.identifier} value={token?.identifier}>
              <div className="flex flex-row gap-2">
                {/* <Image className="mix-blend-multiply" src={token.logoURI} width={25} height={25} alt={token.ticker} /> */}
                <div className="text-lg">{token?.ticker}</div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TokenChooser;
