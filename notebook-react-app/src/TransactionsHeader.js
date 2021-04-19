import React from 'react';
import axios from 'axios';
import { Stack, DefaultButton } from 'office-ui-fabric-react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Depths } from '@fluentui/theme';
import TransactionModal from './TransactionModal';

const TransactionsHeader = props => {
    initializeIcons();
    const editName = (e) => {
        console.log('editName'); 
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            const input = document.getElementById('accountName');
            input.blur();
        } else {
            props.setActiveAccountName(e.target.value);
        }
    }
    const updateAccountName = () => {
       
    };
    const addIcon = { iconName: 'Add' };
    const saveName = e => {
        console.log('saveName');        
        updateAccountName();
    }
    const enterEditMode = (e) => {
        console.log('enterEditMode');
        props.setActiveAccountName(e.target.value);
    }
    const controlStyles = {
        root: {
          margin: '0 30px 20px 0',
          maxWidth: '300px',
        },
    };
    const changeSelectionMode = e => {
        props.setSelectionMode(!props.selectionMode);
    }
    const addTransaction = (e) => {
        props.setTransactionId(0);
        props.setTransactionDetailsVisible(true);
    }
    const stackStyles =  {};
    if (props.headerShadow) {
        stackStyles.root = { boxShadow: Depths.depth16 };
    }

    if (props.activeAccountId === 0){
        return (
            <TransactionModal 
            isModalOpen={props.transactionDetailsVisible} 
            setIsModalOpen={props.setTransactionDetailsVisible}
            token = {props.token}
            transactionId = {props.transactionId}
            />
        );
    }
    return (
        <Stack 
        styles={stackStyles} 
        >
            <div className="editableTitleBox">
                <input id="accountName"
                    value={ props.activeAccountName }
                    onKeyPress={editName}
                    onInput={enterEditMode}
                    onBlur={saveName} />
                <div>{ props.activeAccountName }</div>
            </div>
            <Fabric>
                <div className="transaction-toolbar">
                    <DefaultButton iconProps={addIcon} text="New Transaction" onClick={addTransaction} allowDisabledFocus styles={controlStyles}/>
                    <Toggle inlineLabel
                        label="Selection mode"
                        checked={props.selectionMode}
                        onChange={changeSelectionMode}
                        styles={controlStyles}
                    />
                </div>
                <TransactionModal 
                    isModalOpen={props.transactionDetailsVisible} 
                    setIsModalOpen={props.setTransactionDetailsVisible}
                    token = {props.token}
                    transactionId = {props.transactionId}
                    onTransactionSaved = {props.onTransactionSaved}
                />
            </Fabric>
        </Stack>
    );
}

export default TransactionsHeader;