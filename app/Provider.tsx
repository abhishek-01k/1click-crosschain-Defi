"use client"
import React from 'react';
import { Provider as JotaiProvider } from "jotai";
import { TooltipProvider } from "@/components/ui/tooltip";


const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <JotaiProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </JotaiProvider>
    );
};

export default Provider;