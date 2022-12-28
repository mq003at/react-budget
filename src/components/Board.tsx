import React, { useEffect, useState } from 'react';
import { Card, Container, Grid } from '@material-ui/core';
import BankCard from './BankCard';
import TransactionCard from './TransactionCard';
import InteractionCard from './InteractionCard';
import { Balance, Transaction } from '../types/common';
import { List, ListItem } from '@mui/material/';

const Board: React.FC = () => {
  const [showIncomeCard, setShowIncomeCard] = useState(false);
  const [showExpenseCard, setShowExpenseCard] = useState(false);
  const [showTransferCard, setShowTransferCard] = useState(false);
  const [showTargetCard, setShowTargetCard] = useState(false);

  const [balance, setBalance] = useState<Balance>({ current: 500, saving: 1000 });
  const [target, setTarget] = useState(5);
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) =>
    setTransactionList([...transactionList, transaction]);

  useEffect(() => {
    console.log(transactionList);
  }, [transactionList]);

  return (
    <Container maxWidth="sm">
      <h2> MONEY SAVER </h2>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <BankCard
            balance={balance}
            target={target}
            setShowIncomeCard={() => setShowIncomeCard(!showIncomeCard)}
            setShowExpenseCard={() => setShowExpenseCard(!showExpenseCard)}
            setShowTransferCard={() => setShowTransferCard(!showTransferCard)}
          />
        </Grid>

        {showTransferCard && (
          <Grid xs={8}>
            <InteractionCard
              option="transfer"
              target={target}
              setTarget={setTarget}
              balance={balance}
              setBalance={setBalance}
            />
          </Grid>
        )}

        {showIncomeCard && (
          <Grid xs={8}>
            <InteractionCard
              option="income"
              target={target}
              balance={balance}
              setBalance={setBalance}
              setTransactionList={addTransaction}
            />
          </Grid>
        )}

        {showExpenseCard && (
          <Grid xs={8}>
            <InteractionCard
              option="expense"
              target={target}
              balance={balance}
              setBalance={setBalance}
              setTransactionList={addTransaction}
            />
          </Grid>
        )}
      </Grid>

      <h2> TRANSACTION DETAILS </h2>
      <Grid container spacing={2}>
        <List>
          {transactionList
            .filter((transaction) => transaction.type === 'income')
            .map((transaction) => (
              <ListItem disablePadding>
                <TransactionCard
                  key={transaction.id}
                  id={transaction.id}
                  amount={transaction.amount}
                  type={transaction.type}
                  source={transaction.source}
                  date={transaction.date}
                />
              </ListItem>
            ))}
        </List>

        <List>
          {transactionList
            .filter((transaction) => transaction.type === 'expense')
            .map((transaction) => (
              <ListItem disablePadding>
                <TransactionCard
                  key={transaction.id}
                  id={transaction.id}
                  amount={transaction.amount}
                  type={transaction.type}
                  source={transaction.source}
                  date={transaction.date}
                />
              </ListItem>
            ))}
        </List>
      </Grid>
    </Container>
  );
};

export default Board;
