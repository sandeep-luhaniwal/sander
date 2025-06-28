'use client';
import React, { useState } from 'react';
import Icons from '../common/Icons';
import CalenderAndTime from './CalenderAndTime';

const STAFF_LIST = [
    { id: 1, name: "Sandeep Kumar" },
    { id: 2, name: "Ritika Sharma" },
    { id: 3, name: "Ankit Mehta" },
    { id: 4, name: "Divya Gupta" },
];
const TimeMangment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleSelect = (staff) => {
        setSelectedStaff(staff);
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <p className="font-lora text-base pb-2 font-semibold text-dark-black leading-110">Select Any Staff Member</p>

            <div className="relative">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer flex justify-between items-center text-base text-[#113125] border border-light-white rounded-md px-4 py-2 bg-white hover:border-green transition-all"
                >
                    <span className="text-dark-black">
                        {selectedStaff ? selectedStaff.name : "Select"}
                    </span>
                    <span className={`${isOpen ? "rotate-180" : "rotate-0"} duration-300`}>
                        <Icons icon={"ChevronDown"} />
                    </span>
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-light-white rounded-md shadow-lg max-h-60 overflow-auto">
                        {STAFF_LIST.map((staff) => (
                            <div
                                key={staff.id}
                                onClick={() => handleSelect(staff)}
                                className="px-4 py-2 hover:bg-green/10 cursor-pointer text-dark-black"
                            >
                                {staff.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CalenderAndTime />
            <button className='border mt-6 md:mt-8 lg:mt-9 rounded-lg cursor-pointer text-white duration-300 hover:text-green hover:bg-white border-green bg-green w-full py-[8.5px] font-lora text-lg md:text-xl'>
                Next
            </button>
        </div>
    );
};

export default TimeMangment;
