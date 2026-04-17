import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router';
const RootLayout = () => {
    return (
        <div>
<Navbar></Navbar>
<Outlet />
<Footer></Footer>



        </div>
    );
};

export default RootLayout;