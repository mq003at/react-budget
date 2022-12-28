import React from "react";
import {Transaction, Balance} from "./common";

export interface BankCardProps {
    balance: Balance;
    target: number;
    setShowIncomeCard: () => void;
    setShowExpenseCard: () => void
    setShowTransferCard: () => void;
}

export interface InteractionCardProps {
    option: "income" | "expense" | "target" | "transfer"
    target: number
    balance: Balance
    setBalance:React.Dispatch<React.SetStateAction<Balance>>
    setTarget?: React.Dispatch<React.SetStateAction<number>>
    setTransactionList?: (transaction: Transaction) => void
}
