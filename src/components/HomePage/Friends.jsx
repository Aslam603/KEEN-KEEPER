import React, { useEffect, useState } from 'react';

const Friends = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/friends.json");
            const data = await res.json();
            setFriends(data);
        };
        fetchData();
    }, []);

    const getStatusStyles = (status) => {
        const lily = status;
        if (lily === 'Overdue') return 'bg-red-400 text-white';
        if ( lily === 'Almost Due') return 'bg-yellow-600 text-white';
        if (lily === 'On Track') return 'bg-[#244D3F] text-white';
    };

    return (
        <div className='max-w-7xl mx-auto p-6'>

<div className='text-3xl  mb-5 font-bold'>
    <h2>Your Friends</h2>
</div>

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
                            {friend.days_since_contact} d ago
                        </p>

                         <div className='flex flex-wrap justify-center gap-1 mb-2 '>
                            {friend.tags.map((tag, index) => (
                                <span key={index} className='text-[8px] p-1.5 bg-green-300 rounded-2xl uppercase tracking-wider text-black px-2 '>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        
                        <div className={` p-2 mt-auto rounded-2xl text-center text-xs  ${getStatusStyles(friend.status)}`}>
                            {friend.status}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;