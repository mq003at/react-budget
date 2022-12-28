import { Card, CardContent } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import React from "react";
import { Transaction } from "../types/common";
import getDate from "./getDate";

const TransactionCard: React.FC<Transaction> = (props) => {
    const {id, type, source, amount, date } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{`${source}: ${amount}EUR on ${getDate(date)}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
