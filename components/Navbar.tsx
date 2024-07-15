import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

const Navbar = () => {

    const client = createThirdwebClient({ clientId: "9dbaca0c09760c29ab2aec57240823c9" });



  return (
    <>
        <div className="relative self-center flex w-full max-w-[1217px] items-center justify-between gap-5">
          <Link
            href={"/"}
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 self-center my-auto"
          >
             1ClickSuiDeFi
          </Link>
          <div className="hidden items-center xl:flex gap-0">
            <Link
              href={"/batch"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[145px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              batch
            </Link>
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[181px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Strategy Vault
            </Link>
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[147px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Portofolio
            </Link>
          </div>

        </div>
        <Link
          href={"/batch"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[145px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Batch
        </Link>
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[181px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Strategy Vault
        </Link>
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[147px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Portofolio
        </Link>

      <ConnectButton client={client} />
    </>
  );
};

export default Navbar;