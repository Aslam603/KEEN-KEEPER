import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#244D3F] pt-16 pb-12 md:pb-8 text-white w-full">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col items-center text-center">
                    <img 
                        src="/logo-xl.png" 
                        alt="Parallel Logo" 
                        className="h-10 md:h-12 w-auto mb-6" 
                    />
                    
                    <p className="text-white mb-8 font-normal text-base md:text-xl opacity-85 max-w-2xl mx-auto leading-relaxed">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                    </p>

                    <p className="text-xl md:text-2xl font-medium text-white mb-6">
                        Social Links
                    </p>

                    <div className="flex gap-5 mb-12">
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src="/facebook.png" alt="Facebook" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src="/twitter.png" alt="Twitter" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src="/instagram.png" alt="Instagram" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
                        </a>
                    </div>
                </div>

                
                <div className="h-[1px] bg-white opacity-10 w-full mb-10"></div>

                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 md:pb-0">
                    
                    <div className="text-center md:text-left order-2 md:order-1">
                        <p className="text-sm md:text-lg text-white opacity-55 font-normal">
                            © 2026 Parallel AI Hub. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-lg text-white opacity-55 font-normal order-1 md:order-2">
                        <a href="#" className="hover:text-white hover:opacity-100 transition-all">Privacy Policy</a>
                        <a href="#" className="hover:text-white hover:opacity-100 transition-all">Terms of Service</a>
                        <a href="#" className="hover:text-white hover:opacity-100 transition-all">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;