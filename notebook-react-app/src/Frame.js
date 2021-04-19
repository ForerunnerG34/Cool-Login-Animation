import React, { useState, useEffect } from 'react';
import Accounts from './Accounts';
import Settings from './Settings';
import TransactionsHeader from './TransactionsHeader';
import Transactions from './Transactions';
import { getTheme } from '@fluentui/react';
import { Stack, Text } from 'office-ui-fabric-react';
import { capitalize } from './utils/common';

const Frame = props => {
    const theme = getTheme();
    const [leftMargin, setLeftMargin] = useState('');
    const [transactionsLeftMargin, setTransactionsLeftMargin] = useState('');
    const [transactionsPanel, setTransactionsPanel] = useState('transactions-panel');
    const [activeAccountId, setActiveAccountId] = useState(0);
    const [activeAccountName, setActiveAccountName] = useState('');
    const [selectionMode, setSelectionMode] = useState(false); 
    const [headerShadow, setHeaderShadow] = useState(false); 
    const [transactionUpdated, setTransactionUpdated] = useState(null);
    const sectionStackTokens = {
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:0,
    };
    const [transactionDetailsVisible, setTransactionDetailsVisible] = useState(false);
    const [transactionId, setTransactionId] = useState(0);
    const onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop >=30)
            setHeaderShadow(true);
        else
            setHeaderShadow(false);
    }
    const handleTransactionSaved = (transaction) => {
        setTransactionUpdated(transaction);
    }
    useEffect(() => {
        if (props.activeNavItem === 'accounts') {
            if (transactionsLeftMargin === 'navigated-out')
                setTransactionsLeftMargin('navigated-out motion-reduce-left');
        } else{
            setTransactionsLeftMargin('navigated-out');
            setLeftMargin('navigated-out motion-expand-left');
            props.setTransactionPanelMaximize('');
            setTransactionsPanel('panel-default');
        }
      }, [props, setTransactionsLeftMargin, transactionsLeftMargin]);

    switch(props.activeNavItem) {
        case "accounts":
            return (
                <div id="accounts-list" 
                className={"app-wrapper login-form window-bg " + props.resizeWrapper + " " + props.maximizeWrapper} 
                style={{ boxShadow: theme.effects.elevation64 }}                
                >
                    <Accounts 
                    token={props.token} 
                    visible={ props.maximizeWrapper !== '' } 
                    setActiveAccountId = { setActiveAccountId }
                    activeAccountId = { activeAccountId }
                    setActiveAccountName={ setActiveAccountName }
                    activeAccountName = { activeAccountName }
                    />
                    <div id="transactions-list" 
                    className={ transactionsPanel + ' ' + props.transactionPanelMaximize + ' ' + transactionsLeftMargin }
                    onScroll={onScroll}
                    >
                        <Stack tokens={sectionStackTokens}>
                            <TransactionsHeader 
                            token={props.token} 
                            activeAccountId={ activeAccountId } 
                            activeAccountName={ activeAccountName } 
                            setActiveAccountName={ setActiveAccountName }
                            selectionMode = { selectionMode }
                            setSelectionMode = { setSelectionMode }
                            transactionDetailsVisible = {transactionDetailsVisible}
                            setTransactionDetailsVisible = {setTransactionDetailsVisible}
                            transactionId = {transactionId}
                            setTransactionId = {setTransactionId}
                            headerShadow = { headerShadow }
                            onTransactionSaved = { handleTransactionSaved }
                            />
                            <Transactions 
                            token={props.token} 
                            activeAccountId={ activeAccountId }
                            selectionMode = { selectionMode }
                            setSelectionMode = { setSelectionMode }
                            setTransactionDetailsVisible = {setTransactionDetailsVisible}
                            setTransactionId = {setTransactionId}
                            transactionUpdated = { transactionUpdated }
                            />
                        </Stack>
                    </div>
                </div>
            );
        case "settings":
            return (
                <div className="app-wrapper window-bg motion-resize motion-maximize" style={{ boxShadow: theme.effects.elevation64 }}>
                    <div className={"panel-default " + leftMargin}>
                        <Settings setToken={props.setToken} />
                    </div>
                </div>
            );
        default:
            return (
                <div className="app-wrapper window-bg motion-resize motion-maximize" style={{ boxShadow: theme.effects.elevation64 }}>
                    <div className={"panel-default " + leftMargin}>
                    <Stack tokens={sectionStackTokens}> 
                        <Text variant={'xxLarge'} block>
                            {capitalize (props.activeNavItem)}
                        </Text>
                    </Stack>
                    </div>
                </div>
            );
    }
}
    
export default Frame;