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
} from "@/components/ui/select"
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const TokenChooser = (props: any) => {
  const DynamicIconComponent: any = dynamic(() => import(`react-cryptocoins/dist/icons/${props.selectedToken.symbol}`))

  const handleTokenChange = (value) => {
    props.setSelectedToken(value);
  }


  return (
    <Select disabled={props.blockedAction} onValueChange={handleTokenChange}>
      <SelectTrigger className="w-[180px]" asChild>
        <Button variant="outline" className="min-w-[100px] w-auto px-2 py-1 gap-2 justify-start">
          <div className="flex gap-2">
            <Image className="mix-blend-multiply" src={props.selectedToken.logoURI} width={20} height={20} alt={props.selectedToken.symbol} />
            <span>{props.selectedToken.symbol}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col gap-2">
          {props.selectableTokens.map((token) => (
            <div key={token.address}>
              <SelectItem value={token}>
                <div className="flex flex-row gap-2">
                  <Image className="mix-blend-multiply" src={token.logoURI} width={25} height={25} alt={token.symbol} />
                  <div className="text-lg"> {token.symbol}</div>
                </div>
              </SelectItem>
            </div>
          )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default TokenChooser;