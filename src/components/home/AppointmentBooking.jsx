"use client"
import React, { useState } from 'react'
import { APPOINTMENT_TAB_DATA } from '../common/Helper'
import Icons from '../common/Icons'

const AppointmentBooking = () => {
    const [isTab, setIsTab] = useState("Permanent makeup");

    const activeTab = APPOINTMENT_TAB_DATA.find((tab) => tab.title === isTab);

    return (
        <div className='max-w-[1292px] mx-auto px-4'>
            <p className='text-dark-black font-lora font-semibold leading-110'>
                Quick Appointment Booking
            </p>
            <div className="flex max-w-[1260px] none_scrollbar overflow-auto gap-3 pt-5">
                {APPOINTMENT_TAB_DATA.map((obj, i) => {
                    return (
                        <div
                            onClick={() => setIsTab(obj.title)}
                            className={`border max-w-[80px] w-full min-w-[80px] border-green p-2 rounded-[5px] flex flex-col justify-center items-center cursor-pointer transition-all 
                            ${isTab === obj.title ? "bg-green text-white" : "text-green"}`}
                            key={i}>
                            <Icons isTab={isTab} icon={obj.icon} />
                            <p className='text-center capitalize pt-2 text-xs leading-110'>
                                {obj.title}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="mt-11">
                {activeTab?.allData || <p className='text-sm text-gray-600 leading-110'>No details available for this service yet.</p>}

            </div>
        </div>
    )
}

export default AppointmentBooking;
