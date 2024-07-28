// constants.ts
enum ProtocolName {
  CHAINFLIP = 'CHAINFLIP',
  MAYOCHAIN = 'MAYOCHAIN',
  THORCHAIN = 'THORCHAIN',
}

enum ActionType {
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  APPROVE = 'APPROVE',
  SWAP = 'SWAP',
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
}

interface Protocol {
  name: ProtocolName;
  address: string;
  abi: any[];
}

interface Action {
  type: ActionType;
  name: string;
  availableProtocols: ProtocolName[];
}

interface Token {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
}

const PROTOCOLS: { [key in ProtocolName]: Protocol } = {
  [ProtocolName.CHAINFLIP]: {
    name: ProtocolName.CHAINFLIP,
    address: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    abi: [],
  },
  [ProtocolName.MAYOCHAIN]: {
    name: ProtocolName.MAYOCHAIN,
    address: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    abi: [],
  },
  [ProtocolName.THORCHAIN]: {
    name: ProtocolName.THORCHAIN,
    address: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    abi: [],
  },
};

const ACTIONS: { [key in ActionType]: Action } = {
  [ActionType.ADD_LIQUIDITY]: {
    type: ActionType.ADD_LIQUIDITY,
    name: ActionType.ADD_LIQUIDITY,
    availableProtocols: [ProtocolName.CHAINFLIP, ProtocolName.MAYOCHAIN],
  },
  [ActionType.REMOVE_LIQUIDITY]: {
    type: ActionType.REMOVE_LIQUIDITY,
    name: ActionType.REMOVE_LIQUIDITY,
    availableProtocols: [ProtocolName.CHAINFLIP, ProtocolName.MAYOCHAIN],
  },
  [ActionType.APPROVE]: {
    type: ActionType.APPROVE,
    name: ActionType.APPROVE,
    availableProtocols: [ProtocolName.CHAINFLIP, ProtocolName.MAYOCHAIN],
  },
  [ActionType.SWAP]: {
    type: ActionType.SWAP,
    name: ActionType.SWAP,
    availableProtocols: [ProtocolName.CHAINFLIP, ProtocolName.THORCHAIN],
  },
  [ActionType.TRANSFER]: {
    type: ActionType.TRANSFER,
    name: ActionType.TRANSFER,
    availableProtocols: [],
  },
  [ActionType.WITHDRAW]: {
    type: ActionType.WITHDRAW,
    name: ActionType.WITHDRAW,
    availableProtocols: [],
  },
};

const SELECTABLE_TOKENS: Token[] = [
  {
    name: 'BTC',
    address: '',
    decimals: 18,
    symbol: 'BTC',
  },
  {
    name: 'USDT',
    address: '',
    decimals: 18,
    symbol: 'USDT',
  },
  {
    name: 'USDC',
    address: '',
    decimals: 6,
    symbol: 'USDC',
  },
  {
    name: 'ETH',
    address: '',
    decimals: 18,
    symbol: 'ETH',
  },
];

const MY_SWAP_ROUTER_ADDRESS = '0x071faa7d6c3ddb081395574c5a6904f4458ff648b66e2123b877555d9ae0260e';
const JEDI_FACTORY_ADDRESS = '0x06b4115fa43c48118d3f79fbc500c75917c8a28d0f867479acb81893ea1e036c';
const JEDI_REGISTRY_ADDRESS = '0x0413ba8d51ec05be863eb82314f0cf0ffceff949e76c87cae0a4bd7f89cfc2b1';

export {
  ProtocolName,
  ActionType,
  PROTOCOLS,
  ACTIONS,
  SELECTABLE_TOKENS,
  MY_SWAP_ROUTER_ADDRESS,
  JEDI_FACTORY_ADDRESS,
  JEDI_REGISTRY_ADDRESS,
};