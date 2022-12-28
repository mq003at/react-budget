import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import { BankCardProps } from "../types/props-interface";

const BankCard: React.FC<BankCardProps> = (props) => {
  const { balance, target, setShowIncomeCard, setShowExpenseCard, setShowTransferCard } = props;
  
  return (
    <Card>
      <CardContent>
        <Typography sx={{fontSize: 14}}>Current Balance: {balance.current}</Typography>
        <Typography sx={{fontSize: 14}}>Save Balance: {balance.saving + "."}</Typography>
        <Typography sx={{fontSize: 14}}>Target: {target + "%."}</Typography>
        <Typography sx={{fontSize: 14}}>Progress:</Typography>

        <Button onClick={setShowTransferCard}>Transfer</Button>
        <Button onClick={setShowIncomeCard}>Income</Button>
        <Button onClick={setShowExpenseCard}>Expense</Button>

      </CardContent>
    </Card>
  );
};

export default BankCard;