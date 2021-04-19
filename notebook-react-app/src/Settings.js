import React from 'react';
import Logout from './Logout';
import { Stack, Text } from 'office-ui-fabric-react';

const Settings = props => {
    const sectionStackTokens = {
        padding:10
    };

    return (
        <Stack tokens={sectionStackTokens}> 
            <Text variant={'xxLarge'} block>
                Settings
            </Text>
            <Logout setToken={props.setToken}/>
        </Stack>
    );
}

export default Settings;