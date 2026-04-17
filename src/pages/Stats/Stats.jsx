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
        <div className="max-w-4xl mx-auto p-8 mt-10 bg-[#F8FAFC] min-h-screen">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight text-startr">
                Friendship Analytics
            </h1>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-8 w-full text-start">By Interaction Type</h3>
                
                <div className="w-full h-[400px]">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={100} 
                                    outerRadius={140}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        borderRadius: '16px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36} 
                                    iconType="circle"
                                    formatter={(value) => <span className="text-gray-600 font-bold">{value}s</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 font-medium italic">
                            No data available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;