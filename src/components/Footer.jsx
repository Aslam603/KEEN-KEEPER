import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#244D3F] pt-16 pb-8  text-white ">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col items-center text-center">
                    <img 
                        src="/logo-xl.png" 
                        alt="Parallel Logo" 
                        className="h-12 w-auto mb-4" 
                    />
                    
                    <p className="text-white  mb-6 font-normal text-xl opacity-85 whitespace-nowrap">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                    </p>

                    <p className="text-2xl font-medium text-white  mb-4">
                        Social Links
                    </p>

                    <div className="flex gap-3.5 mb-12">
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src="/facebook.png" alt="Facebook" className="w-10  h-10 object-contain" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src="/twitter.png" alt="Twitter" className="w-10 h-10 object-contain" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src="/instagram.png" alt="Instagram" className="w-10 h-10 object-contain" />
                        </a>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-100 opacity-10 w-full mb-8"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-lg text-white opacity-55 font-normal">
                        © 2026 Parallel AI Hub. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-lg text-white opacity-55 font-normal">
                        <a href="#" className="hover:text-[#244D3F] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#244D3F] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#244D3F] transition-colors">Cookies</a>

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;