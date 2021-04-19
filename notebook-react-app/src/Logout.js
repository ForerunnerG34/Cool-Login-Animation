import React from 'react';
import { removeSessionToken } from './utils/common';
import { ActionButton } from 'office-ui-fabric-react';
import { initializeIcons } from '@fluentui/react/lib/Icons';

const Logout = props => {
    initializeIcons();
    const signOutIcon = { iconName: 'SignOut' };
    const handleLogout = () => {
        removeSessionToken();
        props.setToken(null);
    }

    return (
        <ActionButton iconProps={signOutIcon} text="Sign out" onClick={handleLogout} allowDisabledFocus />
    );
}

export default Logout;