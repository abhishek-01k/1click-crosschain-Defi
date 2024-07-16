
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
import { ACTIONS, ActionTypes, PROTOCOLS, ProtocolNames } from '../constants/constants';
import TokenChooser from "./token-chooser";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { SELECTABLE_TOKENS } from "../constants/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {ChainflipList} from "@swapkit/tokens";

const ActionBlock = ({ actionName, protocolName, onActionChange, onProtocolChange, setBatchActions } : any) => {
  const x = useMotionValue(0);
  const xPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const [xPos, setXPos] = useState(x);

  const [blockedAction, setBlockedAction] = useState(false);

  const [currentActionName, setCurrentActionName] = useState(actionName || ACTIONS['ADD_LIQUIDITY'].type);
  const [currentProtocolName, setProtocolName] = useState(protocolName || PROTOCOLS['Mayochain'].name);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState<any>(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState<any>(SELECTABLE_TOKENS[1]);

  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const [sellAmount, setSellAmount] = useState<number>();
  const [quote, setQuote] = useState<string>();


  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();


  const wallet = "0x123";

  console.log(currentActionName,"current action name")
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

  const handleActionChange = (value) => {

    // const selectedActionKey = event.target.value;
    console.log(currentActionName)
    setCurrentActionName(value);
    
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
    console.log("Sell Amount valueeee>>>>>", sellAmountValue, event.target.value, currentProtocolName, currentProtocolName === PROTOCOLS['NAVI'].name,);
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
    console.log(currentProtocolName,"swap with")
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
        console.log(selectedTokenFrom.type,selectedTokenTo.type, true,"sd");
        console.log(`${selectedTokenFrom.symbol}-${selectedTokenTo.symbol}`,"pool");


      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (currentProtocolName === "") {
      console.log(selectedTokenFrom,"yoi",selectedTokenTo)


      const slippage = 2;

        console.log(sellAmount,"sellAmount")
        const amountinstring = sellAmount?.toString();
        console.log(selectedTokenFrom.type,selectedTokenTo.type,amountinstring,abortQuerySmartRef.current.signal, true,"sd");
  
    } 
  };

  useEffect(() => {

  }, [x]);

  const handlesubmit = async (actionname: string) => {
    console.log(actionName,"Action name", currentActionName)
    if (currentActionName == "SWAP") {
      handleSwap();
    } else if (currentActionName == "Add_Liquidity") {

    }
  }

  return (
    <div className={styles.block} >
      <p className={styles.protocolName}>{currentProtocolName}</p>

      <div className='text-xl font-semibold tracking-tight'>
        <h3 className={styles.actionName}>{currentActionName}</h3>
      </div>

      <div className="flex flex-col gap-8 mt-12 ">
        <Select disabled={blockedAction} onValueChange={handleActionChange} value={currentActionName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {Object.keys(ACTIONS).map((key) => (
                <div key={key}>
                  <SelectItem value={key}>{ACTIONS[key].name}</SelectItem>
                </div>
              )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled={blockedAction} onValueChange={handleProtocolChange} value={currentProtocolName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Protocol" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(PROTOCOLS).map((key) => (
                <div key={key}>
                  <SelectItem value={key}> {PROTOCOLS[key].name}</SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className={cn("", styles.actionInputsWrapper)}>
        <div className={styles.actionInputField}>
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
        </div>


        {currentActionName == "Add_Liquidity" || currentActionName == "Remove_Liquidity" ? <IoIosAddCircleOutline className="w-10 h-10" color={"#fff"} /> : <IoIosArrowDown className="w-10 h-10" color={"#fff"} />}

        {/* Don't display this when the action is related to FlashLoans */}
        {currentActionName !== ActionTypes.RepayFlashLoan &&
          currentActionName !== ActionTypes.TakeFlashLoan && (
            <div className={styles.actionInputField}>
              <TokenChooser
                blockedAction={blockedAction}
                selectedToken={selectedTokenTo}
                setSelectedToken={setSelectedTokenTo}
                selectableTokens={selectableTokens}
              />
              <Input
                disabled={blockedAction}
                readOnly
                className="flex-1"
                placeholder="Output amount"
                color="gray.300"
                height={"3rem"}
                // borderRadius="md"
                // borderColor="gray.300"
                // _hover={{ borderColor: "gray.500" }}
                // _focus={{ borderColor: "gray.500" }}
                value={quote ? quote : ''}
              />
            </div>
          )
        }

        <div>
          {loading ? <p style={{ color: 'green' }}>Loading...</p> : <Button style={{ color: 'green' }} onClick={() => handlesubmit(currentActionName)}>{currentActionName}</Button>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>Success</p>}
        </div>

        <Button disabled={blockedAction} onClick={handleLockAction}>Lock This Action 🔒</Button>
        <Button onClick={handleGetLockedBlocksData}>Execute Locked Blocks 🔥</Button>
      </div>
    </div>
  );
};
export default ActionBlock;