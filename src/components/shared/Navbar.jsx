import React from 'react';

import logo from '../../assets/assets/logo.png'
import { Link } from 'react-router';
import { ChartSpline, Clock, Home } from 'lucide-react';
const Navbar = () => {
    return (
        <div>
            
<nav className='flex justify-between items-center py-[8px] shadow bg-white px-20'>

<img src={logo}></img>


<ul className='flex gap-7'>
<li className='flex items-center'><Link to={"/"} className='flex items-center gap-1'> <Home></Home>Home</Link></li>
<li className='flex items-center'><Link to={"/Timeline"} className='flex items-center gap-1'><Clock></Clock>  Timeline</Link></li>
<li className='flex items-center'><Link to={"/Stats"} className='flex items-center gap-1'><ChartSpline></ChartSpline>  Stats</Link></li>

</ul>


</nav>





        </div>
    );
};

export default Navbar;