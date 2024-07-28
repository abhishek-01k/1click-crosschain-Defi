"use client";

import { Chain, CosmosChains, EVMChains, UTXOChains, WalletOption } from "@swapkit/helpers";
import { Power, PowerOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useSwapKit } from "@/lib/swapKit";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { name: "Swap", href: "/swap" },
  { name: "Batch", href: "/batch" },
];

interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> { }

const AllChains: readonly Chain[] = [...UTXOChains, ...EVMChains, ...CosmosChains] as const;

const allowedChainsByWallet: Record<WalletOption, readonly Chain[]> = {
  [WalletOption.XDEFI]: AllChains.filter((chain) => ![Chain.Dash].includes(chain)),
  [WalletOption.METAMASK]: EVMChains,
  [WalletOption.KEPLR]: CosmosChains,
};

export default function Navbar({ className, ...props }: NavigationBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChains, setSelectedChains] = useState<readonly Chain[]>([]);
  const { walletType, disconnectWallet, isWalletConnected, connectWallet } = useSwapKit();
  const pathname = usePathname();

  const handleChainSelect = (chain: Chain) => (checked: boolean) => {
    if (checked) {
      setSelectedChains((prev) => [...prev, chain]);
    } else {
      setSelectedChains((prev) => prev.filter((c) => c !== chain));
    }
  };

  const checkWalletDisabled = useCallback(
    (option: WalletOption) => {
      const allowedChains = allowedChainsByWallet[option];

      if (!(allowedChains?.length && selectedChains?.length)) return false;

      return !selectedChains.every((chain) => allowedChains.includes(chain));
    },
    [selectedChains],
  );

  const handleWalletSelect = useCallback(
    async (option: WalletOption) => {
      setIsDropdownOpen(false);

      const allowedChains = allowedChainsByWallet[option];

      if (!allowedChains.length || checkWalletDisabled(option)) return;

      if (selectedChains.length === 0) {
        setSelectedChains(allowedChains);
      } else if (isWalletConnected) {
        disconnectWallet();
      } else {
        try {
          console.log("connectWallet", option, selectedChains);
          const a = await connectWallet(option, selectedChains);
          console.log(a, "result")
        } catch (err) {
          console.error("Failed to connect wallet:", err);
        }
      }
    },
    [checkWalletDisabled, isWalletConnected, disconnectWallet, connectWallet, selectedChains],
  );

  return (
    <ScrollArea className="max-w-[600px] lg:max-w-none pt-4 mb-4 border-b">
      <div className="flex justify-between flex-row">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {items.map(({ href, name }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "flex h-10 items-center justify-center rounded-full px-4 text-center transition-colors hover:text-primary",
                pathname === href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {name}
            </Link>
          ))}
        </div>

        <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
          {isWalletConnected ? (
            <Button onClick={disconnectWallet} asChild variant="ghost" className="space-x-2">
              <div>
                <PowerOff size={18} className="text-red-400" />
                <span>{`Disconnect (${walletType})`}</span>
              </div>
            </Button>
          ) : (
            <DropdownMenuTrigger>
              <Button asChild variant="ghost" className="space-x-2">
                <div>
                  <Power size={18} className="text-slate-400" />
                  <span>Connect Wallet</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
          )}

          <DropdownMenuContent className="max-w-[400px] z-auto">
            <div className="flex flex-row flex-wrap bg-slate-900 p-4 gap-3">
              {AllChains.map((chain) => (
                <div key={chain} className="flex w-[70px] justify-between items-center">
                  <span
                    className={
                      selectedChains.includes(chain) ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {chain}
                  </span>

                  <Checkbox
                    checked={selectedChains.includes(chain)}
                    onCheckedChange={handleChainSelect(chain)}
                    key={chain}
                  />
                </div>
              ))}
            </div>

            <div className="bg-slate-800 p-4">
              {[WalletOption.XDEFI, WalletOption.METAMASK, WalletOption.KEPLR].map((option) => (
                <div key={option}>
                  {selectedChains.length && !checkWalletDisabled(option) ? (
                    <Button
                      onClick={() => handleWalletSelect(option)}
                      variant="ghost"
                      className="text-primary p-2"
                    >
                      Connect
                    </Button>
                  ) : null}

                  <Button
                    variant={
                      selectedChains.length && !checkWalletDisabled(option) ? "default" : "ghost"
                    }
                    className={checkWalletDisabled(option) ? "text-muted-foreground" : ""}
                    disabled={checkWalletDisabled(option)}
                    onClick={() => handleWalletSelect(option)}
                  >
                    {option}
                  </Button>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>



      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
