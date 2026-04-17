import React from 'react';
import { HashLoader } from 'react-spinners';
import UseFriends from '../../hooks/useFriends';

const Friends = () => {
    
    const { friends, loading } = UseFriends();

    const getStatusStyles = (status) => {
        if (status === 'Overdue') return 'bg-red-400 text-white';
        if (status === 'Almost Due') return 'bg-yellow-600 text-white';
        if (status === 'On Track') return 'bg-[#244D3F] text-white';
        
    };

    return (
        <div className='max-w-7xl mx-auto p-6 bg-[#F8FAFC]'>
            <div className='text-3xl mb-5 font-bold'>
                <h2>Your Friends</h2>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-64'>
                    <HashLoader color='#244D3F' />
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {friends.map((friend) => (
                        <div key={friend.id} className='bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center'>
                            <img 
                                src={friend.picture} 
                                alt={friend.name} 
                                className='w-20 h-20 rounded-full object-cover mb-4 shadow-sm'
                            />
                            <h3 className='text-lg font-bold text-gray-900'>{friend.name}</h3>
                            <p className='text-xs text-gray-500 mt-1 mb-3'>
                                {friend.days_since_contact}d ago
                            </p>
                            <div className='flex flex-wrap justify-center gap-1 mb-2 '>
                                {friend.tags.map((tag, index) => (
                                    <span key={index} className='text-[8px] p-1.5 bg-green-300 rounded-2xl uppercase tracking-wider text-black px-2 '>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className={` p-2 mt-auto rounded-2xl text-center text-xs ${getStatusStyles(friend.status)}`}>
                                {friend.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Friends;