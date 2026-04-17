import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

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

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter Logic
    const filteredHistory = activeFilter === 'All' 
        ? history 
        : history.filter(item => item.type === activeFilter);

    // Count Logic
    const countInteractions = (type) => {
        if (type === 'All') return history.length;
        return history.filter(item => item.type === type).length;
    };

    const filterOptions = ['All', 'Call', 'Text', 'Video'];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-[#F8FAFC] min-h-screen">
            <h1 className="text-3xl font-black text-gray-900 mb-10 text-center tracking-tight">Timeline History</h1>

            <div className="flex flex-col items-center mb-12">
                {/* Custom Dropdown Container */}
                <div className="relative w-full max-w-xs" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-gray-700 hover:border-[#244D3F] transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-[#244D3F]" />
                            <span>{activeFilter === 'All' ? 'Filter Timeline' : activeFilter}</span>
                        </div>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                            {filterOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setActiveFilter(option);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors flex justify-between items-center ${
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

                {/* Interaction Summary Count Display */}
                <div className="mt-6">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                        Showing {filteredHistory.length} {activeFilter !== 'All' ? activeFilter : 'Total'} Interactions
                    </p>
                </div>
            </div>

            {/* Timeline Cards */}
            {filteredHistory.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 max-w-4xl mx-auto">
                    <p className="text-gray-400 font-bold">No entries found for this category.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    {filteredHistory.map((item) => (
                        <div 
                            key={item.id} 
                            className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition-all duration-300"
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
                                <p className="text-xs text-gray-400 font-black mt-1 uppercase tracking-widest">
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