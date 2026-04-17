import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Timeline = () => {
    const [history, setHistory] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        try {
            const savedHistory = JSON.parse(localStorage.getItem('timeline')) || [];
            setHistory(savedHistory);
        } catch (error) {
            console.error("Error loading timeline:", error);
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredHistory = activeFilter === 'All' 
        ? history 
        : history.filter(item => item.type === activeFilter);

    const countInteractions = (type) => {
        if (type === 'All') return history.length;
        return history.filter(item => item.type === type).length;
    };

    const filterOptions = ['All', 'Call', 'Text', 'Video'];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#F8FAFC] min-h-screen mt-10">
            {/* Left Header */}
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Timeline </h1>

            {/* Left  Section */}
            <div className="flex flex-col items-start mb-10">
                <div className="relative w-full max-w-[200px]" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-sm font-bold text-gray-700 hover:border-[#244D3F] transition-all"
                    >
                        <span>{activeFilter === 'All' ? 'Filter Timeline' : activeFilter}</span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                            {filterOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setActiveFilter(option);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors flex justify-between items-center ${
                                        activeFilter === option 
                                        ? 'bg-[#244D3F] text-white' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {option}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeFilter === option ? 'bg-white/20' : 'bg-gray-100'}`}>
                                        {countInteractions(option)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            {filteredHistory.length === 0 ? (
                <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 font-bold italic">No entries logged yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredHistory.map((item) => (
                        <div 
                            key={item.id} 
                            className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center"
                        >
                            <div className="bg-[#F8FAFC] p-4 rounded-2xl mr-6 border border-gray-50">
                                <img 
                                    src={item.image} 
                                    alt={item.type} 
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => e.target.src = "https://placehold.co/40x40?text=Icon"}
                                />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.type} with <span className="text-[#244D3F]">{item.friendName}</span>
                                </h3>
                                <p className="text-xs text-gray-400 font-black mt-1 uppercase tracking-[0.15em]">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timeline;