"use client";

import { Tokens } from "@zohal/app/_helpers/tokens";
import useMarketTokenBalance from "@zohal/app/_hooks/use-market-token-balance";
import { type PropsWithClassName } from "@zohal/app/_lib/utils";
import { useState } from "react";

import Button from "../../_ui/button";
import Fieldset from "../../_ui/fieldset";
import Form from "../../_ui/form";
import Input from "../../_ui/input";
import useMarketLong from "../_hooks/use-market-long";
import ChooseTokenButton from "./choose-token-button";
import PriceInfo from "./price-info";
import TokenSwapButton from "./token-swap-button";
import TradeLeverageInput from "./trade-leverage-input";

export default function Trade({ className }: PropsWithClassName) {
  const [payValue, setPayValue] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("ETH"); 
  const { marketTokenBalance: ethTokenBalance } = useMarketTokenBalance({
    marketTokenAddress: Tokens.ETH.address,
  });

  const { long } = useMarketLong();

  return (
    <Form className={className}>
      <Fieldset
        field={
          <div className="flex items-center justify-between">
            <Input
              className="bg-transparent text-lg"
              onChange={setPayValue}
              placeholder="0.00"
              value={payValue}
            />
            <div className="relative">
              <span className="absolute -top-5 right-0 w-full whitespace-nowrap text-xs text-[#BCBCBD]">
                Balance: {ethTokenBalance}
              </span>
              <ChooseTokenButton
                onTokenSymbolChange={() => {}}
                tokenSymbol={tokenSymbol}
              />
            </div>
          </div>
        }
        label="Pay"
      />

      <TokenSwapButton />

      <Fieldset
        field={
          <div className="flex items-center justify-between">
            <Input
              className="bg-transparent text-lg"
              onChange={setPayValue}
              placeholder="0.00"
              value={payValue}
            />
            <div className="relative">
              <span className="absolute -top-5 right-0 w-full whitespace-nowrap text-xs text-[#BCBCBD]">
                Balance: {ethTokenBalance}
              </span>
              <ChooseTokenButton
                onTokenSymbolChange={() => {}}
                tokenSymbol={tokenSymbol}
              />
            </div>
          </div>
        }
        label="Long/Short"
      />

      <TradeLeverageInput className="py-6" />

      <div className="flex flex-col gap-2 rounded-md border border-[#363636] p-3">
        {priceInfos.map((priceInfo, index) => (
          <PriceInfo key={index} {...priceInfo} />
        ))}
      </div>

      <div className="mt-4 grid w-full grid-cols-2 items-center gap-2">
        <Button onClick={() => long(tokenSymbol, payValue)} type="submit" variant="success">
          Buy/Long
        </Button>
        <Button type="submit" variant="danger">
          Sell/Short
        </Button>
      </div>

      <h3 className="mt-8">ETH Trade</h3>
      <div className="flex flex-col gap-2 rounded-md border border-[#363636] p-3">
        {tokenPriceInfos.map((priceInfo, index) => (
          <PriceInfo key={index} {...priceInfo} />
        ))}
      </div>
    </Form>
  );
}

const priceInfos = [
  { label: "Entry Price", value: "$5 000.882" },
  { label: "Price Impact", value: "12%" },
  { label: "Acceptable Price", value: "$4 998.882" },
  { label: "Liq. Price", value: "$0.000" },
  { label: "Fees and Price Impact", value: "-$1.91" },
];

const tokenPriceInfos = [
  { label: "Market", value: "ETH-USD" },
  { label: "Entry Price", value: "$5 000.12" },
  { label: "Exit Price", value: "$0.000" },
  { label: "Borrow Fee", value: "$0.0007/h" },
  { label: "Funding Fee", value: "$0.0007/h" },
  { label: "Available Liquidity", value: "$100 000.00" },
  { label: "Open Interest Balance", value: "-$85.91" },
];
