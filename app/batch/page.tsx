// Batch.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ActionBlock from '../../components/action-block';
import styles from '@/styles/batch.module.css';
import { Reorder } from "framer-motion";
import { ACTIONS, ActionType, ProtocolName, PROTOCOLS } from '@/constants/constants';

type ActionBlockState = {
  id: number;
  action: ActionType;
  protocol: ProtocolName;
}

const initBlockState: ActionBlockState = { id: 1, action: ActionType.SWAP, protocol: ProtocolName.THORCHAIN };

const Batch = () => {
  const [actionBlocks, setActionBlocks] = useState<ActionBlockState[]>([initBlockState]);
  const [batchActions, setBatchActions] = useState<ActionBlockState[]>([]);
  const wallet = "0x12";

  const addActionBlock = () => {
    setActionBlocks([...actionBlocks, { id: actionBlocks.length + 1, action: ActionType.ADD_LIQUIDITY, protocol: ProtocolName.THORCHAIN }]);
  };

  const removeActionBlock = (id: number) => {
    setActionBlocks(actionBlocks.filter((block) => block.id !== id));
  }

  const updateActionBlock = (id: number, field: keyof ActionBlockState, value: string) => {
    setActionBlocks(actionBlocks.map((block) =>
      block.id === id ? { ...block, [field]: value } : block
    ));
  };

  const handleBatchActions = (actions: ActionBlockState[]) => {
    setBatchActions(actions);
  };

  if (!wallet) {
    return (
      <div className="marginTop=50">
        Connect your Wallet to start
      </div>
    )
  }

  return (
    <div className='flex flex-col w-screen p-8 items-center gap-8'>
      <div className='flex gap-8'>
        <Button onClick={addActionBlock} className="mt-8">
          ➕ Add Block
        </Button>
        <Button onClick={() => removeActionBlock(actionBlocks.length)} className="mt-8" variant='destructive'>
          Delete Block
        </Button>
        <Button
          variant='secondary'
          onClick={() => {
            setBatchActions([]);
            setActionBlocks([initBlockState]);
          }} className="mt-8">
          🗑️ Clear Batch
        </Button>
      </div>
      <Reorder.Group
        as="ul"
        className={styles.actionsWrapper}
        axis="x"
        values={actionBlocks}
        onReorder={setActionBlocks}
        layoutScroll
        style={{ overflowX: "auto" }}
      >
        {actionBlocks.map((block) => (
          <Reorder.Item key={block.id} value={block}>
            <ActionBlock
              key={block.id}
              actionName={ACTIONS[block.action].type}
              protocolName={PROTOCOLS[block.protocol].name}
              onActionChange={(action: ActionType) => updateActionBlock(block.id, 'action', action)}
              onProtocolChange={(protocol: ProtocolName) => updateActionBlock(block.id, 'protocol', protocol)}
              setBatchActions={handleBatchActions}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

    </div>
  )
}

export default Batch;