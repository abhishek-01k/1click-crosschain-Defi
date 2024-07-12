"use client"
import React from 'react';
import { ThirdwebProvider } from "thirdweb/react";


const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    );
};

export default Provider;