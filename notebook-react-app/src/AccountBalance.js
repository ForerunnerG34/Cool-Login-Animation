import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text } from 'office-ui-fabric-react';

const AccountBalance = props => {
    const [balance, setBalance] = useState(0);
    const fetchBalance = () => {
        var config = {
            method: 'get',
            url: 'https://localhost:5003/api/v1/balance/account?accountId=' + props.accountId,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        };           
    
        axios(config)
        .then(function (response) {
            setBalance(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [props.accountId]);

    if (balance === 0)
        return null;

    var nf = new Intl.NumberFormat();

    if (balance > 0)
        return (
            <Text variant={'mediumPlus'} nowrap>${ nf.format(balance) }</Text>
        );
    else
        return (
            <Text variant={'mediumPlus'} nowrap>-${ nf.format(Math.abs(balance)) }</Text>
        );
}

export default AccountBalance