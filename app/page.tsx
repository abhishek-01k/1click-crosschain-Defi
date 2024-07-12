"use client"
import Swap from "@/components/Swap";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {

  const activeAccount = useActiveAccount();

  console.log("Active Account ", activeAccount);
  return (
    <main className="flex p-24">
      hello world

      {activeAccount && <Swap />}
    </main>
  );
}
