import React, { Fragment, useEffect, useState } from 'react';
import { InteractionCardProps } from '../types/props-interface';
import { FormControl, Card, CardContent, Input, TextField, Button, Alert } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import {
  InteractionCardErrorMessage,
  TransferForm,
  InteractionForm,
  Transaction,
} from '../types/common';
import getDate from './getDate';

const InteractionCard: React.FC<InteractionCardProps> = (props) => {
  const { option, target, setTarget, balance, setBalance, setTransactionList } = props;

  const [errorMess, setErrorMess] = useState<InteractionCardErrorMessage>();

  // Formik function (prob looks better than writting my own custom Hook)
  const transferForm = useFormik<TransferForm>({
    initialValues: {
      transferSaving: 0,
      savingTarget: target,
    },
    onSubmit: (values: TransferForm) => {
      if (values.savingTarget >= 100 || values.savingTarget < 0)
        setErrorMess({ transfer: 'Target saving must be between 0 and 100' });
      else setTarget?.(values.savingTarget);

      if (values.transferSaving > balance.current)
        setErrorMess({ transfer: 'You do not have enough money.' });
      else if (values.transferSaving < 0)
        setErrorMess({ transfer: 'You cannot tranfer negative ammount of balance.' });
      else {
        setBalance({ current: balance.current - values.transferSaving, saving: balance.saving });
        setErrorMess({ transfer: '' });
      }
    },
  });

  const interactionForm = useFormik<InteractionForm>({
    initialValues: {
      sourceName: '',
      transactionAmount: 0,
      date: new Date(),
      mode: 'income',
    },
    onSubmit: (values: InteractionForm) => {
      const dateStr = getDate(values.date);
      const id = values.date.toISOString();
      console.log(dateStr);
      if (values.sourceName === '') setErrorMess({ [values.mode]: 'Source cannot be blank.' });
      else if (values.transactionAmount < 0)
        setErrorMess({ [values.mode]: 'Transaction cannot be negative.' });
      else if (option === 'expense' && values.transactionAmount > balance.current)
        setErrorMess({ [values.mode]: 'Expense exceeds bank limit.' });
      else {
        if (option === 'expense') Math.abs(values.transactionAmount)
        console.log(balance, values.transactionAmount);
        setBalance({ current: balance.current + Number(values.transactionAmount), saving: balance.saving });
        setTransactionList?.({
          id: id,
          amount: values.transactionAmount,
          type: values.mode,
          source: values.sourceName,
          date: values.date,
        });
        setErrorMess({ [values.mode]: '' });
        if (option === 'expense') Math.abs(values.transactionAmount)
      }
    },
  });

  return (
    <Fragment>
      {option === 'transfer' && (
        <Card>
          <CardContent>
            <form onSubmit={transferForm.handleSubmit}>
              <FormControl>
                <TextField
                  label="transfer to saving"
                  variant="filled"
                  name="transferSaving"
                  type="number"
                  value={transferForm.values.transferSaving}
                  onChange={transferForm.handleChange}
                ></TextField>
                <TextField
                  label="saving target"
                  variant="filled"
                  name="savingTarget"
                  type="number"
                  value={transferForm.values.savingTarget}
                  onChange={transferForm.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                {errorMess?.transfer && <Alert severity="error">{errorMess.transfer}</Alert>}
              </FormControl>
              <Button type="submit">Submit</Button>
              <Button onClick={() => setTarget?.(5)}>Reset Target</Button>
            </form>
          </CardContent>
        </Card>
      )}
      {(option === 'income' || option === 'expense') && (
        <Card>
          <CardContent>
            <form onSubmit={interactionForm.handleSubmit}>
              <FormControl>
                <TextField
                  label={option + ' source'}
                  variant="filled"
                  name="sourceName"
                  value={interactionForm.values.sourceName}
                  onChange={interactionForm.handleChange}
                ></TextField>
                <TextField
                  label={option + ' amount'}
                  variant="filled"
                  name="transactionAmount"
                  type="number"
                  value={interactionForm.values.transactionAmount}
                  onChange={interactionForm.handleChange}
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="date"
                    inputFormat="DD/MM/YYYY"
                    value={interactionForm.values.date}
                    onChange={interactionForm.handleChange}
                    renderInput={(params) => <TextField variant="filled" {...params} />}
                  />
                </LocalizationProvider>
                {option === 'income' && errorMess?.income && (
                  <Alert severity="error">{errorMess.income}</Alert>
                )}
                {option === 'expense' && errorMess?.expense && (
                  <Alert severity="error">{errorMess.expense}</Alert>
                )}
              </FormControl>
              <Button type="submit" onClick={() => (interactionForm.values.mode = option)}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default InteractionCard;
