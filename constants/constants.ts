export enum ActionTypes {
  ADD_LIQUIDITY,
  REMOVE_LIQUIDITY,
  APPROVE,
  SWAP,
  REVOKE_APPROVAL,
  TRANSFER,
  WITHDRAW,
}

export enum ProtocolNames {
  ChainFlip,
  Mayochain,
  Thorchain
}

export const PROTOCOLS: { [key in keyof typeof ProtocolNames]?: any} = {
  [ProtocolNames.ChainFlip]: {
    name: 'ChainFlip',
    address: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    abi: []
  }
}


export const ACTIONS: { [key in keyof typeof ActionTypes]?: any} = {
  [ActionTypes.ADD_LIQUIDITY]: {
    type: ActionTypes.ADD_LIQUIDITY,
    name: 'Add Liquidity',
    availableProtocols: [
      ProtocolNames.ChainFlip,
      ProtocolNames.Mayochain
    ],
  },
  [ActionTypes.REMOVE_LIQUIDITY]: {
    type: ActionTypes.REMOVE_LIQUIDITY,
    name: 'Remove Liquidity',
    availableProtocols: [
      ProtocolNames.ChainFlip,
      ProtocolNames.Mayochain
    ],
  },
  [ActionTypes.APPROVE]: {
    type: ActionTypes.APPROVE,
    name: 'Approve',
    availableProtocols: [
      ProtocolNames.ChainFlip,
      ProtocolNames.Mayochain
    ],
  },
  [ActionTypes.SWAP]: {
    type: ActionTypes.SWAP,
    name: 'Swap',
    availableProtocols: [
      ProtocolNames.ChainFlip,
      ProtocolNames.Thorchain
    ],
  },
  [ActionTypes.REVOKE_APPROVAL]: {
    type: ActionTypes.REVOKE_APPROVAL,
    availableProtocols: [
      ProtocolNames.ChainFlip,
      ProtocolNames.Thorchain
    ],
  },
  [ActionTypes.TRANSFER]: {
    type: ActionTypes.TRANSFER,
    name: 'Transfer',
    availableProtocols: [
    ],
  },
  [ActionTypes.WITHDRAW]: {
    type: ActionTypes.WITHDRAW,
    name: 'Withdraw',
    availableProtocols: [
    ],
  },
};

export const SELECTABLE_TOKENS = [
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


export const MY_SWAP_ROUTER_ADDRESS = '0x071faa7d6c3ddb081395574c5a6904f4458ff648b66e2123b877555d9ae0260e';
export const JEDI_FACTORY_ADDRESS = '0x06b4115fa43c48118d3f79fbc500c75917c8a28d0f867479acb81893ea1e036c';
export const JEDI_REGISTRY_ADDRESS = '0x0413ba8d51ec05be863eb82314f0cf0ffceff949e76c87cae0a4bd7f89cfc2b1'
