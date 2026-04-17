import React from 'react';
import logo from '../../assets/assets/logo.png';
import { ChartSpline, Clock, HomeIcon } from 'lucide-react';
import MyNavLink from './MyNavLink';

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between items-center py-[8px] shadow-2xl bg-white py-24 px-20'>
                <img src={logo} alt="Logo" className="h-10" />

                <ul className='flex gap-7'>
                    <li className='flex items-center'>
                        <MyNavLink to="/">
                            <div className='flex items-center gap-1'>
                                <HomeIcon size={18} /> Home
                            </div>
                        </MyNavLink>
                    </li>
                    <li className='flex items-center'>
                        <MyNavLink to="/Timeline">
                            <div className='flex items-center gap-1'>
                                <Clock size={18} /> Timeline
                            </div>
                        </MyNavLink>
                    </li>
                    <li className='flex items-center'>
                        <MyNavLink to="/Stats">
                            <div className='flex items-center gap-1'>
                                <ChartSpline size={18} /> Stats
                            </div>
                        </MyNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;