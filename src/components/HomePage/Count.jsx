import React from 'react';

const Count = () => {
    return (
    <section className=' text-center py-10 bg-[#F8FAFC]'> 
        <div className='max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6  text-center'>
            <div className='rounded-xl shadow-xl p-10'>
                <p className='font-bold text-3xl text-[#244D3F]'>08</p>
                <p className='text-blue-900 font-medium'>Total Friends</p>
            </div>
            <div className='rounded-xl shadow-xl p-10'>
                <p className='font-bold text-3xl text-[#244D3F]'>03</p>
                <p className='text-blue-900 font-medium'>On Track</p>
            </div>
            <div className='shadow-xl p-10 rounded-xl'>
                <p className='font-bold text-3xl text-[#244D3F]'>07</p>
                <p className='text-gray-600 font-medium'>Need Attention</p>
            </div>
            <div className='shadow-xl p-10 rounded-xl'>
                <p className='font-bold text-3xl text-[#244D3F]'>12</p>
                <p className='text-blue-900 font-medium'>Interactions</p>
            </div>
        </div>
    </section>
);
};

export default Count;