import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Link, Text, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import axios from 'axios';
import { setSessionToken } from './utils/common';
import Layout from './Layout';

const Login = props => {
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const getUsernameErrorMessage = (value) => {
        var msg = value.length > 0 ? '' : 'Enter your username.';
        setUsernameErrorMessage(msg);
    };

    const getPasswordErrorMessage = (value) => {
        var msg = value.length > 0 ? '' : 'Enter your password.';
        setPasswordErrorMessage(msg);
    };
      
    const onUsernameChange = (e, value) => {
        setUsername(value);
    };

    const onPasswordChange = (e, value) => {
        setPassword(value);
    };

    const sectionStackTokens = {  };

    const stackItemStyles  = {
        root: {
            paddingTop: 20,
            paddingBottom: 30,
        },
    };

    const stackItemLastStyles  = {
        root: {
            paddingTop: 20,
        },
    };

    const handleLogin = () => {
        // Reset initial position of Accounts panel before triggering the new animation.
        props.setResizeWrapper('');
        props.setMaximizeWrapper('');
        props.setResizeNavigation('');

        getUsernameErrorMessage(username);
        getPasswordErrorMessage(password);
        
        if (usernameErrorMessage === '' && passwordErrorMessage === '') {
            setError(null);
            setLoading(true);

            if (username === 'notebook' && password === 'password') {
                setLoading(false);
                setSessionToken("real-topken-after-auth");
                props.setToken("real-topken-after-auth");
            }        
        }
      };

      const stackStyles = {
        root: {
          height: 306,
        },
      };

    if (loading)
      return (
        <Layout windowType="login-type">
            <Stack verticalAlign="center" styles={stackStyles}>
                    <Spinner size={SpinnerSize.large} />
                </Stack>
        </Layout>
        );

    return (
        <Layout windowType="login-type">
            <Stack tokens={sectionStackTokens}> 
                <Stack.Item align="center">
                    <Text variant={'xLarge'} nowrap block>
                        Notebook Login
                    </Text>
                </Stack.Item>
                <Stack.Item align="stretch" styles={stackItemStyles}>
                    <TextField label="Username"
                        required 
                        value={username} 
                        onChange={onUsernameChange} 
                        errorMessage={usernameErrorMessage}
                        onGetErrorMessage={getUsernameErrorMessage}
                        validateOnLoad={false}/>
                    <TextField label="Password" 
                        required 
                        type="password" 
                        value={password} 
                        onChange={onPasswordChange} 
                        errorMessage={passwordErrorMessage}
                        onGetErrorMessage={getPasswordErrorMessage}
                        canRevealPassword
                        validateOnLoad={false}/>
                </Stack.Item>
                <PrimaryButton text="Sign in" onClick={handleLogin} allowDisabledFocus />
                {error}
                <Stack.Item align="center" styles={stackItemLastStyles}>
                    <Text variant={'medium'} nowrap block>
                        <Link href="/">I forgot my passsword</Link>
                    </Text>
                </Stack.Item> 
                <Stack.Item align="center" styles={stackItemLastStyles}>
                    <Text variant={'medium'} nowrap block>
                        <Link href="/">Not a user? Sign up!</Link>
                    </Text>
                </Stack.Item>
            </Stack>
        </Layout>
    );
}

export default Login;