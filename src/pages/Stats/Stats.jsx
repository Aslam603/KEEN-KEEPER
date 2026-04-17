import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Stats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('timeline')) || [];
        
        // Count interactions by type
        const counts = history.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        }, {});

        // Format data for Recharts
        const chartData = [
            { name: 'Call', value: counts['Call'] || 0 },
            { name: 'Text', value: counts['Text'] || 0 },
            { name: 'Video', value: counts['Video'] || 0 },
        ].filter(item => item.value > 0); // Only show segments with data

        setData(chartData);
    }, []);

    // Figma-inspired color palette
    const COLORS = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue for Call, Green for Text, Purple for Video

    return (
        <div className="max-w-7xl mx-auto p-8 bg-[#F8FAFC] min-h-screen">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">
                Friendship Analytics
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 w-full text-left">Interaction Distribution</h3>
                    
                    <div className="w-full h-80">
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80} // Donut style
                                        outerRadius={110}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 font-medium italic">
                                No data available yet. Start logging interactions!
                            </div>
                        )}
                    </div>
                </div>

                {/* Stat Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.map((item, index) => (
                        <div key={item.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.name}s</span>
                            </div>
                            <p className="text-4xl font-black text-gray-900">{item.value}</p>
                            <p className="text-sm text-gray-500 mt-1">Total interactions</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;