import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#244D3F', '#10B981', '#8B5CF6'];

const Stats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('timeline')) || [];
        const categories = ['Call', 'Text', 'Video'];
        const chartData = categories.map(type => ({
            name: type,
            value: history.filter(item => item.type === type).length
        })).filter(item => item.value > 0);
        setData(chartData);
    }, []);

    return (
        <div className="w-[95%] max-w-4xl mx-auto px-4 pt-4 pb-4 md:pt-10 md:pb-8 bg-[#F8FAFC]">
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 md:mb-8 tracking-tight">
                Friendship Analytics
            </h1>

            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    By Interaction Type
                </h3>
                
                <div className="w-full h-[280px] md:h-[350px]">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%" 
                                    innerRadius="60%" 
                                    outerRadius="90%"
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend 
                                    verticalAlign="bottom" 
                                    iconType="circle"
                                    wrapperStyle={{ bottom: 0 }} 
                                    formatter={(value) => (
                                        <span className="text-gray-600 font-bold text-xs md:text-sm">
                                            {value}s
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
                            No data available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;