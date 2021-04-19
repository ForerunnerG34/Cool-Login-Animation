import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Stack } from 'office-ui-fabric-react';
import AccountBalance from './AccountBalance';

const Accounts = props => {
    const [accounts, setAccounts] = useState([]);
    const [activingAccount, setActivingAccount] = useState(0);
    const fetchAccounts = () => {
        
    };
    const sectionStackTokens = { 
        childrenGap: 10,
        padding: 20,
    };
    const stackStyles = { 
        root: [
            {
              overflow: 'hidden',
            },
          ],  
    };
    const selectAccount = id => {
        if (props.activeAccountId !== id) {
            props.setActiveAccountId(id);
            props.setActiveAccountName(accounts.find(account => account.id === id).name);
        }

        setActivingAccount(0);
    }
    
    useEffect(() => {
        setTimeout(()=>{
            fetchAccounts()
        }, 2000);  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (props.activeAccountId > 0){
            var item = accounts.find(account => account.id === props.activeAccountId);
            
            if (item !== null && item !== undefined)
                item.name = props.activeAccountName;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeAccountId, props.activeAccountName]);

    return (
        <ul className={props.visible ? 'nav-accounts visible':'nav-accounts'}>
        {accounts.map(account => {
            return (
                <li key={account.id}
                onMouseDown={ () => setActivingAccount(account.id) }
                onMouseUp={ () => selectAccount(account.id) }
                className={
                    (account.id === props.activeAccountId ? 'active-item' : '')
                    + (account.id === activingAccount ? ' activating-item' : '')
                }
                >
                <Stack horizontal horizontalAlign="space-between" tokens={sectionStackTokens}>
                    <Stack styles={stackStyles}>
                        <Text variant={'medium'} block nowrap>{ account.id === props.activeAccountId ? props.activeAccountName : account.name}</Text>
                    </Stack>
                    <Stack>
                        <AccountBalance accountId={account.id} token={ props.token }/>
                    </Stack>
                </Stack>
                </li>
            );
        })}        
        </ul>
    );
}

export default Accounts;