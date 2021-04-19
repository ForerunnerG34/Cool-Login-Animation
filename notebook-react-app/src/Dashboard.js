import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Layout from './Layout';
import MainNavigation from './MainNavigation';
import Frame from './Frame';
import { getTheme } from '@fluentui/react';

function initializeTransactionsPanel() {
    // Set the initial size and position of the Transactions panel to the size and position of the Accounts panel before trigering the animation.
    var accounts_box = $("#accounts-list");
  
    if (!accounts_box.hasClass('motion-maximize')) {
        var topBox = $("#transactions-list");
        var bottom = $(window).height() - accounts_box.offset().top - accounts_box.height();
        var right = $(window).width() - accounts_box.offset().left - accounts_box.width();
        topBox.css(accounts_box.offset());
        topBox.css('bottom', bottom);
        topBox.css('right', right);
    }
  }
    
const Dashboard = props => {
    const theme = getTheme();
    const [activeNavItem, setActiveNavItem] = useState('accounts');
    const [transactionPanelMaximize, setTransactionPanelMaximize] = useState('');
    
    useEffect(() => {
        // Trigger all dashboard animatons (Navigation, Accounts and Transactions)
        const resizeTimer = setTimeout(() => {
            props.setResizeWrapper('motion-resize');
        }, 250);
        const maximizeTimer = setTimeout(() => {
          initializeTransactionsPanel();
          props.setMaximizeWrapper('motion-maximize');
          setTransactionPanelMaximize('transactions-panel-maximize');
          props.setResizeNavigation('main-navigation-expand');
        }, 1000);    
        const maximizeNavTimer = setTimeout(() => {
            props.setResizeNavigation('main-navigation-expand');
        }, 1025);
        return () => {clearTimeout(resizeTimer); clearTimeout(maximizeTimer); clearTimeout(maximizeNavTimer);}
      }, [props]);
    
    return (
        <Layout>
           <div id="main-navigation" className={" main-navigation " + props.resizeNavigation} style={{ boxShadow: theme.effects.elevation64 }}>
                <MainNavigation 
                activeNavItem = {activeNavItem}
                setActiveNavItem={setActiveNavItem}
                />
            </div>

            <Frame
            setToken={props.setToken}
            token={props.token}
            resizeWrapper={props.resizeWrapper}
            maximizeWrapper={props.maximizeWrapper}
            activeNavItem = {activeNavItem}
            transactionPanelMaximize = {transactionPanelMaximize}
            setTransactionPanelMaximize = {setTransactionPanelMaximize}
            />
        </Layout>
    );
}

export default Dashboard;