import React from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhoneCall, MessageSquareMore, Video, BellRing, Archive, Trash2, Edit2 } from 'lucide-react';
import UseFriends from "../hooks/useFriends";

const Details = () => {
    const { id } = useParams();
    const { friends, loading } = UseFriends();
    
    const friend = friends ? friends.find((f) => String(f.id) === id) : null;

    const handleCheckIn = (type) => {
        if (!friend) return;
        const iconMap = { 'Call': '/call.png', 'Text': '/text.png', 'Video': '/video.png' };
        const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const newEntry = {
            id: Date.now(),
            type: type,
            image: iconMap[type], 
            friendName: friend.name,
            date: timestamp,
        };

        const existingEntries = JSON.parse(localStorage.getItem('timeline')) || [];
        localStorage.setItem('timeline', JSON.stringify([newEntry, ...existingEntries]));
        
        toast.success(`${type} logged!`, { position: "bottom-right", autoClose: 2000 });
    };

    if (loading) return <div className="flex justify-center items-center h-screen font-bold">Loading...</div>;
    if (!friend) return <div className="p-10 text-center font-bold">Friend not found.</div>;

    return (
        <div className='max-w-7xl mx-auto p-6 mt-10'>
            <ToastContainer />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                <div className='md:col-span-4 w-full'>
                    <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center'>
                        <img 
                            src={friend.picture} 
                            className='w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#F8FAFC] shadow-md' 
                            alt={friend.name} 
                        />
                        <h3 className='text-2xl font-black text-gray-900'>{friend.name}</h3>
                        
                        
                       <span className='bg-red-500 text-white rounded-md p-1.5 mb-2 mt-2'>{friend.status}</span>
                       
                        

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {friend.tags?.map((tag, i) => (
                                <span key={i} className="px-3 py-2 bg-green-300 text-black text-[10px] font-bold rounded-lg border border-gray-100 uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-500 text-sm mb-4 ">"{friend.bio}"</p>
                        <p className='text-sm text-gray-500 font-bold mb-8'>{friend.email}</p>
                        
                        <div className='w-full space-y-3'>
                            <button className='w-full py-3 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 '>
                                <BellRing size={18}/> Snooze 2 Weeks
                            </button>
                            <button className='w-full py-3 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2  text-sm'>
                                <Archive size={18}/> Archive
                            </button>
                            <button className='w-full py-3 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2  text-sm'>
                                <Trash2 size={18}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className='md:col-span-8 w-full space-y-6'>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm'>
                            <p className='text-3xl font-black text-[#244D3F]'>{friend.days_since_contact}</p>
                            <p className='text-[10px] text-gray-400 font-black  mt-1'>Days Since Contact</p>
                        </div>
                        <div className='bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm'>
                            <p className='text-3xl font-black text-[#244D3F]'>{friend.goal}</p>
                            <p className='text-[10px] text-gray-400 font-black  mt-1'>Goal (Days)</p>
                        </div>
                        <div className='bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm'>
                            <p className='text-2xl font-black text-[#244D3F]'>{friend.next_due_date || 'N/A'}</p>
                            <p className='text-[10px] text-gray-400 font-black  mt-1'>Next Due Date</p>
                        </div>
                    </div>

                    {/*  Relationship Goal Card */}
                    <div className='bg-white p-8 rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm'>
                        <div>
                            <p className='text-[10px] text-gray-400 font-black mb-1'>Relationship Goal</p>
                            <h4 className='text-xl font-black text-gray-800 '>Every {friend.goal} Days</h4>
                        </div>
                        <button className='p-3 bg-gray-50 text-black rounded-xl font-medium '>
                      Edit  </button>
                    </div>

                    {/* Section 3: Quick Check-In Card */}
                    <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm'>
                        <p className='text-[#244D3F] font-black mb-8 text-xl tracking-tight'>Quick Check-in</p>
                        <div className='grid grid-cols-3 gap-6'>
                            <button onClick={() => handleCheckIn('Call')} className='flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-white text-black'>
                                <PhoneCall size={28} /> 
                                <span className='font-black text-xs '>Call</span>
                            </button>
                            <button onClick={() => handleCheckIn('Text')} className='flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-white text-black'>
                                <MessageSquareMore size={28} /> 
                                <span className='font-black text-xs '>Text</span>
                            </button>
                            <button onClick={() => handleCheckIn('Video')} className='flex flex-col items-center gap-3 p-6 rounded-2xl border-white text-black'>
                                <Video size={28}/> 
                                <span className='font-black text-xs '>Video</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Details;