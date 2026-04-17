import React from 'react';
import { NavLink } from 'react-router'; // or 'react-router-dom'

const MyNavLink = ({ to, children }) => {
    return (
        <NavLink 
            to={to}
            className={({ isActive }) =>
                `font-semibold px-4 py-2 rounded-md transition-colors 
            ${ isActive 
                    ? "bg-[#244D3F] text-white" 
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`
            }
        > 
            {children}
        </NavLink>
    );
};

export default MyNavLink;