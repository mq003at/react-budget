import React from "react";

export interface Transaction {
    id: string,
    amount: number,
    type: "expense" | "income",
    source: string,
    date: Date
}

export interface Balance {
    current: number,
    saving: number
}

export interface TransferForm {
    transferSaving: number,
    savingTarget: number
}

export interface InteractionForm {
    sourceName: string,
    transactionAmount: number,
    date: Date,
    mode: "income" | "expense"
}

export interface InteractionCardErrorMessage {
    transfer?: string,
    income?: string,
    expense?: string
}


