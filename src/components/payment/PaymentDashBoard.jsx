'use client';
import React, { useEffect, useState } from 'react';
import Icons from '../common/Icons';
import CardDetails from './CardDetails';

const PaymentDashBoard = () => {
    const [queryData, setQueryData] = useState({
        services: [],
        staff: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const services = JSON.parse(params.get('services') || '[]');
        const staff = params.get('staff');
        const date = params.get('date');
        const time = params.get('time');

        setQueryData({ services, staff, date, time });
    }, []);

    const getEndTime = (startTime) => {
        if (!startTime) return '';
        const [h, m] = startTime.split(':').map(Number);
        const end = new Date();
        end.setHours(h + 1, m);
        return end.toTimeString().slice(0, 5);
    };

    const formatDateTime = () => {
        if (!queryData.date || !queryData.time) return '';
        const dateObj = new Date(queryData.date);
        const day = dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '.');
        return `${day} ${queryData.time} - ${getEndTime(queryData.time)} Hour`;
    };

    return (
        <div className='max-w-[1260px] mx-auto px-4 pb-10 md:pb-12 lg:pb-14'>
            <div className='max-w-[880px]'>
                <p className='text-dark-black font-lora font-semibold leading-110'>
                    Your Appointment
                </p>

                <div className="mt-6">
                    {queryData.services.map((obj, i) => (
                        <div key={i}>
                            <p className={`text-sm ${i !== 0 && "mt-[13px]"} md:text-base leading-none duration-300 text-dark-black`}>
                                {obj.title}
                            </p>
                            <div className='mt-2 overflow-clip w-full flex justify-between gap-3 rounded-[5px] border border-green bg-off-white'>
                                <div className='flex p-3 items-center gap-2'>
                                    <div className="w-[17px] h-[17px] min-w-[17px] rounded-[2px] bg-white border border-green flex items-center justify-center">
                                        <span className='text-green text-xs'>✓</span>
                                    </div>
                                    <p className='text-sm text-dark-black font-semibold leading-none'>
                                        {obj.desOne}
                                        <span className='block'>{obj.desTwo}</span>
                                    </p>
                                </div>
                                <div className='px-3 p-[5px] flex flex-col justify-center items-center max-w-[88px] bg-green'>
                                    <p className='text-white text-nowrap leading-none text-sm font-bold'>{obj.price} €</p>
                                    <p className='text-white text-nowrap leading-none flex items-center text-[11px] font-normal font-lora'>
                                        <span className='me-[2px] flex items-center text-sm font-bold font-lora'>
                                            <Icons icon={"watch"} />
                                        </span>
                                        {obj.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className='font-lora text-sm md:text-[15px] text-dark-black font-semibold leading-110 pt-6 lg:pt-8 xl:pt-[34px]'>Location</p>
                <p className='pt-[5px] pb-4 md:pb-5 text-sm md:text-base text-dark-black/65 leading-none font-normal'>Sander Aesthetics
                    <span className='block'>
                        Harburger Strasse 49, 27356 Rotenburg
                    </span>
                </p>

                <div className='border-y border-dark-gray pt-4'>
                    <p className='font-lora text-sm md:text-[15px] text-dark-black font-semibold leading-110'>Time</p>
                    <p className='pt-[5px] pb-4 md:pb-5 text-sm md:text-base text-dark-black/65 leading-none font-normal'>
                        {formatDateTime()}
                    </p>
                </div>
                <CardDetails formatDateTime={formatDateTime} />
            </div>
        </div>
    );
};

export default PaymentDashBoard;
