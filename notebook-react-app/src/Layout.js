import React from 'react'
import { getTheme } from '@fluentui/react';

const Layout = props => {
    const theme = getTheme();

    if (props.windowType === undefined || props.windowType === '')
        return (
            <div className="App">
                {props.children}
            </div>
        );
    else
        return (
            <div className="App">
                <div className={"app-wrapper window-bg " + props.windowType} style={{ boxShadow: theme.effects.elevation64 }}>
                    {props.children}
                </div>
            </div>
        );
}

export default Layout