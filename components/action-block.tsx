
// @ts-nocheck
import styles from "../styles/action-block.module.css";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIONS, ActionType, ProtocolName, PROTOCOLS } from '../constants/constants';
import TokenChooser from "./token-chooser";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { SELECTABLE_TOKENS } from "../constants/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChainflipList } from "@swapkit/tokens";
import SwapInput from "./swap/SwapInput";

const ActionBlock = ({ actionName, protocolName, onActionChange, onProtocolChange, setBatchActions }: any) => {
  const x = useMotionValue(0);
  const xPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const [xPos, setXPos] = useState(x);

  const [blockedAction, setBlockedAction] = useState(false);

  const [currentActionName, setCurrentActionName] = useState(actionName || ACTIONS['ADD_LIQUIDITY'].type);
  const [currentProtocolName, setProtocolName] = useState(protocolName || PROTOCOLS['MAYOCHAIN'].name);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState<any>(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState<any>(SELECTABLE_TOKENS[1]);

  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const [sellAmount, setSellAmount] = useState<number>();
  const [quote, setQuote] = useState<string>();


  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const [availableProtocols, setAvailableProtocols] = useState(Object.keys(PROTOCOLS));

  const wallet = "0x123";

  const [lockedBlocks, setLockedBlocks] = useState([]);

  const abortQuerySmartRef = useRef(new AbortController());
  const handleLockAction = () => {
    const newLockedBlock = {
      actionName: currentActionName,
      protocolName: currentProtocolName,
      data: {
        selectedTokenFrom: selectedTokenFrom,
        selectedTokenTo: selectedTokenTo,
        sellAmount: sellAmount,
        quote: quote
      }
    };
    // setLockedBlocks([...lockedBlocks, newLockedBlock]);
    // // Clear current state values
    // setCurrentActionName(currentActionName);
    // setProtocolName(currentProtocolName);
    // setSelectedTokenFrom(SELECTABLE_TOKENS[0]);
    // setSelectedTokenTo(SELECTABLE_TOKENS[1]);
    // setSellAmount(sellAmount);
    // setQuote(quote);

    // setLockedBlocks(prevBlocks => [...prevBlocks, newLockedBlock]);

    setBlockedAction(true);
    console.log("newLockedBlock", newLockedBlock)

    setBatchActions(prevActions => {
      if (prevActions) {
        return [...prevActions, newLockedBlock]
      } else {
        return [newLockedBlock]
      }
    }
    );

  };

  const handleGetLockedBlocksData = () => {
    // Use lockedBlocks array to access all the locked blocks' data
    console.log("Locked Blocks Data:", lockedBlocks);
  };

  const handleActionChange = (value: ActionType) => {

    // console.log("Value in Action change", value);

    // // const selectedActionKey = event.target.value;
    // console.log(currentActionName)
    // setCurrentActionName(value);

    console.log("Value in Action change", value);
    setCurrentActionName(value);
    const availableProtocols = ACTIONS[value].availableProtocols;
    setAvailableProtocols(availableProtocols);


    // onActionChange(selectedActionKey);
  };

  const handleProtocolChange = (value) => {
    console.log("value>>", value);
    setProtocolName(value);
  };

  // Determine which token list to use based on the protocolName
  const selectableTokens = ChainflipList;

  useEffect(() => {
    // Reset selected tokens when protocol changes
    setSelectedTokenFrom(selectableTokens[0]);
    setSelectedTokenTo(selectableTokens[1]);
  }, [protocolName, selectableTokens]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!wallet) return;
    setErrorMessage('');
    const sellAmountValue = Number(event.target.value);
    console.log("Sell Amount valueeee>>>>>", sellAmountValue, event.target.value, currentProtocolName, currentProtocolName === PROTOCOLS['CHAINFLIP'].name,);
    setSellAmount(sellAmountValue);
    if (currentProtocolName == PROTOCOLS['THORCHAIN'].name) {

      console.log("1");
      //TODO: See if the below code works or not

      // if (selectedTokenFrom.decimals) {
      //   const sellamountbaseunit = sellAmountValue * Math.pow(10, selectedTokenFrom.decimals);

      //   fetch('/api/quote', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': '*/*',
      //     },
      //     body: JSON.stringify({
      //       offer_address: selectedTokenFrom.address,
      //       ask_address: selectedTokenTo.address,
      //       units: sellamountbaseunit,
      //       slippage_tolerance: 0.001
      //     })
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
      //       setQuote(quote.toString());
      //       console.log("quote set", data.ask_units);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error);
      //     });
      // } else {

      //   console.log(sellAmountValue, selectedTokenFrom.decimals, "sellAmountValue");
      //   fetch('/api/quote', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': '*/*',
      //     },
      //     body: JSON.stringify({
      //       offer_address: selectedTokenFrom.address,
      //       ask_address: selectedTokenTo.address,
      //       units: sellAmountValue,
      //       slippage_tolerance: 0.001
      //     })
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
      //       setQuote(quote.toString());
      //       console.log("quote set", data.ask_units);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error);
      //     });
      // }
    } else if (currentProtocolName == PROTOCOLS['MAYOCHAIN'].name) {

      console.log("2");

      const sellAmountValue = Number(event.target.value);
      // get the quote
    }
    // setLoading(true);
  };


  const handleSwap = async () => {
    // if (!wallet || !sellAmount || !quote) return;
    console.log(currentProtocolName, "swap with")
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    if (protocolName === "NAVIPROTOCOL") {


      try {

      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (currentProtocolName === "KRIYADEX") {
      try {

        const amountinstring = sellAmount?.toString();
        console.log(selectedTokenFrom.type, selectedTokenTo.type, true, "sd");
        console.log(`${selectedTokenFrom.symbol}-${selectedTokenTo.symbol}`, "pool");


      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (currentProtocolName === "") {
      console.log(selectedTokenFrom, "yoi", selectedTokenTo)


      const slippage = 2;

      console.log(sellAmount, "sellAmount")
      const amountinstring = sellAmount?.toString();
      console.log(selectedTokenFrom.type, selectedTokenTo.type, amountinstring, abortQuerySmartRef.current.signal, true, "sd");

    }
  };

  useEffect(() => {

  }, [x]);

  const handlesubmit = async (actionname: string) => {
    console.log(actionName, "Action name", currentActionName)
    if (currentActionName == "SWAP") {
      handleSwap();
    } else if (currentActionName == "Add_Liquidity") {

    }
  }

  return (
    <div className="border rounded-lg w-[100%] min-w-[450px] p-8" >
      <p className="text-xl font-bold bg-gradient-to-r from-[rgb(255,0,128)] to-[#7928CA] dark:from-[#7928CA] dark:to-[#FF0080] bg-clip-text text-transparent">
        {currentProtocolName}
      </p>

      <div className='text-xl font-semibold tracking-tight'>
        <h1 className="font-bold tracking-tighter text-xl md:text-2xl">
          {currentActionName}
        </h1>
      </div>

      <div className="flex flex-col gap-8 mt-12 ">
        <Select disabled={blockedAction} onValueChange={handleActionChange} value={currentActionName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {Object.values(ACTIONS).map((action) => (
                <div key={action.type}>
                  <SelectItem value={action.type}>{action.name}</SelectItem>
                </div>
              )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled={blockedAction} onValueChange={handleProtocolChange} value={currentProtocolName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(availableProtocols as ProtocolName[]).map((protocol) => (
                <div key={protocol}>
                  <SelectItem value={protocol}>{PROTOCOLS[protocol].name}</SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {currentActionName === ACTIONS['SWAP'].type && <SwapInput />}

      </div>




      <div className="flex flex-col gap-8 mt-8">
        {/* <div className={styles.actionInputField}>
          <TokenChooser
            blockedAction={blockedAction}
            selectedToken={selectedTokenFrom}
            setSelectedToken={setSelectedTokenFrom}
            selectableTokens={selectableTokens}
          />
          <Input
            disabled={loading || blockedAction}
            className="flex-1"
            placeholder="Input amount"
            color="gray.300"
            height={"3rem"}
            // borderRadius="md"
            // borderColor="gray.300"
            // _hover={{ borderColor: "gray.500" }}
            // _focus={{ borderColor: "gray.500" }}
            onChange={handleChangeInput}
          />
        </div> */}


        {/* {currentActionName == "Add_Liquidity" || currentActionName == "Remove_Liquidity" ? <IoIosAddCircleOutline className="w-10 h-10" color={"#fff"} /> : <IoIosArrowDown className="w-10 h-10" color={"#fff"} />} */}

        {/* Don't display this when the action is related to FlashLoans */}

        <div className="w-[100%]">
          <Button disabled={loading} className="w-[100%]" variant='default' onClick={() => handlesubmit(currentActionName)}>
            {loading ? 'Loading....' : currentActionName}
          </Button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>Success</p>}
        </div>

        <div className="flex gap-8">
          <Button variant='secondary' className="hover:bg-slate-400" disabled={blockedAction} onClick={handleLockAction}>Lock This Action 🔒</Button>
          <Button variant='secondary' className="bg-green-600 text-white hover:bg-green-900" onClick={handleGetLockedBlocksData}>Execute Locked Blocks 🔥</Button>
        </div>
      </div>
    </div>
  );
};
export default ActionBlock;