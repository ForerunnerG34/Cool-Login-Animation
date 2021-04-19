import './App.css';
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { getSessionToken } from './utils/common';
import { loadTheme } from '@fluentui/react';

loadTheme({
  palette: {
    themePrimary: '#708C8B',
    themeLighterAlt: '#fefcfa',
    themeLighter: '#fbf5ea',
    themeLight: '#f8ecd8',
    themeTertiary: '#f1dab3',
    themeSecondary: '#ebca92',
    themeDarkAlt: '#d1b077',
    themeDark: '#b09565',
    themeDarker: '#826d4a',
    neutralLighterAlt: '#eee9e2',
    neutralLighter: '#eae5df',
    neutralLight: '#e1dbd5',
    neutralQuaternaryAlt: '#d1ccc7',
    neutralQuaternary: '#c8c3be',
    neutralTertiaryAlt: '#c0bbb6',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#F6F0E9',
  }
});

function App() {
  const [token, setToken] = useState('');
  const [resizeWrapper, setResizeWrapper] = useState('');
  const [maximizeWrapper, setMaximizeWrapper] = useState('');
  const [resizeNavigation, setResizeNavigation] = useState('');

  var sessionToken = getSessionToken();

  if (sessionToken && !token)
    setToken(sessionToken);
      
  if (!token)
  
    return <Login 
      setToken={setToken}
      setResizeWrapper={setResizeWrapper}
      setMaximizeWrapper={setMaximizeWrapper}
      setResizeNavigation={setResizeNavigation}/>
  return <Dashboard 
      setToken={setToken}
      token={token}
      resizeWrapper={resizeWrapper}
      setResizeWrapper={setResizeWrapper}
      maximizeWrapper={maximizeWrapper}
      setMaximizeWrapper={setMaximizeWrapper}
      resizeNavigation={resizeNavigation}
      setResizeNavigation={setResizeNavigation}/>
}

export default App;