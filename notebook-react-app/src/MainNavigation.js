import React, { useState } from 'react';

const MainNavigation = props => {
    const [links ] = useState([
        {
            id: 'search',
            src: "images/icons/search.svg",
            to: "/search",
            alt: "Search"
        },
        {
            id: 'home',
            src: "images/icons/home.svg",
            to: "/home",
            alt: "Home"
        },
        {
            id: 'accounts',
            src: "images/icons/notebook.svg",
            to: "/accounts",
            alt: "Accounts"
        },
        {
            id: 'reports',
            src: "images/icons/library.svg",
            to: "/reports",
            alt: "Reports"
        },
        {
            id: 'settings',
            src: "images/icons/settings.svg",
            to: "/settings",
            alt: "Settings"
        }
    ]);

    return (
        <ul className="nav-icons">
        {links.map(link => {
            return (
                    <li key={link.id}
                    onClick={() => props.setActiveNavItem(link.id)}
                    className={
                        (link.id === props.activeNavItem ? 'active-item' : '')
                    }>
                        <img src={link.src} alt={link.alt}/>
                    </li>
            );
        })}        
    </ul>
    );
}

export default MainNavigation;