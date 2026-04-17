import React from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhoneCall, MessageSquareMore, Video, BellRing, Archive, Trash2 } from 'lucide-react';
import UseFriends from "../hooks/useFriends";

const Details = () => {
    const { id } = useParams();
    const { friends, loading } = UseFriends();
    
    // Find the specific friend based on the URL ID
    const expectedFriend = friends ? friends.find((friend) => String(friend.id) === id) : null;

    const handleCheckIn = (type) => {
        if (!expectedFriend) return;

        // Map interaction type to your images in the public folder
        const iconMap = {
            'Call': '/call.png',   // Replace with your actual filename in public folder
            'Text': '/text.png',
            'Video': '/video.png'
        };

        const timestamp = new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });

        const newEntry = {
            id: Date.now(),
            type: type,
            image: iconMap[type], // Path to the image in public folder
            friendName: expectedFriend.name,
            date: timestamp,
        };

        try {
            // Save to LocalStorage for the Timeline page
            const rawData = localStorage.getItem('timeline');
            const existingEntries = rawData ? JSON.parse(rawData) : [];
            localStorage.setItem('timeline', JSON.stringify([newEntry, ...existingEntries]));
            
            // Show toast notification
            toast.success(`${type} logged for ${expectedFriend.name}!`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            console.error("Storage error:", error);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-[#244D3F] font-bold">
            Loading...
        </div>
    );
    
    if (!expectedFriend) return <div className="p-10 text-center">Friend not found.</div>;

    return (
        <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8'>
            <ToastContainer />
            
            {/* Left Column - Profile Card */}
            <div className='md:col-span-4'>
                <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center'>
                    <img 
                        src={expectedFriend.picture} 
                        className='w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md' 
                        alt={expectedFriend.name} 
                    />
                    <h3 className='text-2xl font-bold text-gray-900'>{expectedFriend.name}</h3>
                    <p className='text-sm text-gray-500 mb-6'>{expectedFriend.email}</p>
                    
                    <div className='w-full space-y-2'>
                        <button className='w-full py-2 bg-amber-50 text-amber-700 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors'>
                            <BellRing size={18}/> Snooze
                        </button>
                        <button className='w-full py-2 bg-gray-50 text-gray-700 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors'>
                            <Archive size={18}/> Archive
                        </button>
                        <button className='w-full py-2 bg-red-50 text-red-600 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors'>
                            <Trash2 size={18}/> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column - Content & Actions */}
            <div className='md:col-span-8 space-y-6'>
                {/* Stats */}
                <div className='grid grid-cols-3 gap-4'>
                    <div className='bg-white p-6 rounded-xl border text-center shadow-sm'>
                        <p className='text-2xl font-bold text-[#244D3F]'>{expectedFriend.days_since_contact}</p>
                        <p className='text-xs text-gray-400 font-bold uppercase'>Days Since</p>
                    </div>
                    <div className='bg-white p-6 rounded-xl border text-center shadow-sm'>
                        <p className='text-2xl font-bold text-[#244D3F]'>{expectedFriend.goal}</p>
                        <p className='text-xs text-gray-400 font-bold uppercase'>Goal</p>
                    </div>
                    <div className='bg-white p-6 rounded-xl border text-center shadow-sm'>
                        <p className='text-2xl font-bold text-[#244D3F]'>{expectedFriend.next_due_date || 'N/A'}</p>
                        <p className='text-xs text-gray-400 font-bold uppercase'>Next Due</p>
                    </div>
                </div>

                {/* Quick Check-in Interaction Card */}
                <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
                    <p className='text-[#244D3F] font-bold mb-6 text-lg'>Quick Check-in</p>
                    <div className='grid grid-cols-3 gap-4'>
                        <button 
                            onClick={() => handleCheckIn('Call')} 
                            className='flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-50 text-blue-600 hover:bg-blue-50 transition-all font-bold'
                        >
                            <PhoneCall size={24}/> <span>Call</span>
                        </button>
                        
                        <button 
                            onClick={() => handleCheckIn('Text')} 
                            className='flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-50 text-green-600 hover:bg-green-100 transition-all font-bold'
                        >
                            <MessageSquareMore size={24}/> <span>Text</span>
                        </button>
                        
                        <button 
                            onClick={() => handleCheckIn('Video')} 
                            className='flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-purple-50 text-purple-600 hover:bg-purple-100 transition-all font-bold'
                        >
                            <Video size={24}/> <span>Video</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;