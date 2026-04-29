import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        
<div className="flex flex-col min-h-dvh w-full">            
            <Navbar />

               
            <main className="flex-grow ">
                <Outlet />
            </main>

            <Footer></Footer>

        </div>
    );
};

export default RootLayout;