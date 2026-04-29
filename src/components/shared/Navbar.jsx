import React, { useState } from 'react';
import logo from '../../assets/assets/logo.png';
import { ChartSpline, Clock, HomeIcon, Menu } from 'lucide-react';
import MyNavLink from './MyNavLink';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        // Added relative here to ensure the dropdown anchors to the navbar bottom
        <nav className='relative bg-white shadow-md z-50'>
            <div className='flex justify-between items-center py-4 px-6 md:px-20'>
                
                {/* Logo */}
                <img src={logo} alt="Logo" className="h-8 md:h-10" />

                {/* Mobile Menu Button */}
                <button 
                    className='md:hidden text-gray-700' 
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <Menu size={28} />
                </button>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex gap-8'>
                    <NavItems />
                </ul>
            </div>

            {/* Small Dropdown Menu - Aligned to the bottom edge of the Navbar */}
            <div className={`
                absolute top-full right-6 w-48 bg-white shadow-2xl rounded-b-lg border border-gray-100 overflow-hidden
                transition-all duration-200 ease-in-out origin-top
                ${isOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'}
                md:hidden
            `}>
                <ul className='flex flex-col' onClick={() => setIsOpen(false)}>
                    <NavItems isMobile={true} />
                </ul>
            </div>
        </nav>
    );
};

const NavItems = ({ isMobile }) => (
    <>
        <li className={`flex items-center ${isMobile ? 'px-4 py-3 hover:bg-gray-50' : ''}`}>
            <MyNavLink to="/">
                <div className='flex items-center gap-2'>
                    <HomeIcon size={18} /> <span>Home</span>
                </div>
            </MyNavLink>
        </li>
        <li className={`flex items-center ${isMobile ? 'px-4 py-3 hover:bg-gray-50' : ''}`}>
            <MyNavLink to="/Timeline">
                <div className='flex items-center gap-2'>
                    <Clock size={18} /> <span>Timeline</span>
                </div>
            </MyNavLink>
        </li>
        <li className={`flex items-center ${isMobile ? 'px-4 py-3 hover:bg-gray-50' : ''}`}>
            <MyNavLink to="/Stats">
                <div className='flex items-center gap-2'>
                    <ChartSpline size={18} /> <span>Stats</span>
                </div>
            </MyNavLink>
        </li>
    </>
);

export default Navbar;