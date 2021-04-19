import React, { useState, useEffect } from 'react';
import {
  getTheme,
  mergeStyleSets,
  Modal,
} from 'office-ui-fabric-react';
import axios from 'axios';
import { ChoiceGroup, TextField, Stack, Spinner, SpinnerSize, DefaultButton, PrimaryButton, DatePicker } from 'office-ui-fabric-react';


const TransactionModal = props => {  
  const theme =getTheme();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);  
  const updateTransaction = () => {     
   
  };
  const hideModal = () => {
      props.setIsModalOpen(false);
  };
  const save = (evt) => {
    updateTransaction();
    hideModal();
    props.onTransactionSaved(transaction);
  };
  const stackStyles = {
    root: {
      height: 180,
    },
  };
  const onNameChange = (e, value) => {
    setTransaction(transaction => ({...transaction, name: value }));
  };
  const onAmountChange = (e, value) => {
    setTransaction(transaction => ({...transaction, amount: value }));
  };
  const onSelectDate = (date)  => {
    setTransaction(transaction => ({...transaction, transactionDate: date }));
  };
  const sectionStackTokens = {
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:0
  };
  const options = [
    { key: 'debit', text: 'Debit', iconProps: { iconName: 'Shop' } },
    { key: 'credit', text: 'Credit', iconProps: { iconName: 'Savings' } },
    { key: 'transfer', text: 'Transfer', iconProps: { iconName: 'BuildDefinition' }, disabled: true },
  ];
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header: [
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });
  useEffect(() => {
    const fetchTransaction = () => {     
      var config = {
          method: 'get',
          url: 'https://localhost:5003/api/v1/transactions/get?id=' + props.transactionId,
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + props.token
          }
      };                  
      axios(config)
      .then(function (response) {
        setTransaction(response.data);    
        setLoading(false);
      })
      .catch(function (error) {
          console.log(error);
      });
    };
  
    if (props.isModalOpen){
      setLoading(true);
      fetchTransaction();
      
    }    
  }, [props.isModalOpen, props.transactionId, props.token]);

  if (transaction === null)
    return null;

  if (loading) {
      return (
        <Modal
          titleAriaId={props.transactionId}
          isOpen={props.isModalOpen}
          onDismiss={hideModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
          dragOptions={undefined}
        >
        <Stack verticalAlign="center" styles={stackStyles}>
          <Spinner size={SpinnerSize.large} />
        </Stack>
      </Modal>     
    );
  }

  return (
      <Modal
      titleAriaId={props.transactionId}
      isOpen={props.isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName={contentStyles.container}
      dragOptions={undefined}
    >
    <div className={contentStyles.header}>
      <span>
      <ChoiceGroup defaultSelectedKey="debit" options={options} />
      </span>
    </div>
    <div className={contentStyles.body}>
      <TextField label="Amount"
        required 
        value={transaction.amount} 
        onChange={onAmountChange} 
        validateOnLoad={false}
      />
      <TextField label="Name"
        required 
        value={transaction.name} 
        onChange={onNameChange} 
        validateOnLoad={false}
        />  
        <DatePicker
        label="Date"
        onSelectDate={onSelectDate}
        isRequired={true}
        value={new Date(transaction.transactionDate)} 
        placeholder="Select a date..."
        ariaLabel="Select a date"
      />    
    </div>
    <div className={contentStyles.body}>
      <Stack horizontal horizontalAlign="space-between" tokens={sectionStackTokens}>
        <DefaultButton text="Cancel" onClick={hideModal} />
        <PrimaryButton text="Save" onClick={save}/>
      </Stack>
    </div>
  </Modal>
  );
}

export default TransactionModal;