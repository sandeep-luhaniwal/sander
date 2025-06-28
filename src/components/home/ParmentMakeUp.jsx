import React, { useState } from 'react';
import Icons from '../common/Icons';
import { APPOINTMENT_CHECK_DATA } from '../common/Helper';
import TimeMangment from './TimeMangment';

const ParmentMakeUp = () => {
    const [checkedState, setCheckedState] = useState(
        new Array(APPOINTMENT_CHECK_DATA.length).fill(false)
    );

    const handleCheckboxChange = (index) => {
        const updatedChecked = [...checkedState];
        updatedChecked[index] = !updatedChecked[index];
        setCheckedState(updatedChecked);
    };

    return (
        <div className='max-w-[1260px] mx-auto pb-[50px]'>
            <div className="grid grid-cols-1 w-full md:grid-cols-[60%_38%] gap-8 md:gap-4 lg:grid-cols-[70%_27%] lg:gap-8 xl:gap-9 justify-between">
                <div>
                    {APPOINTMENT_CHECK_DATA.map((obj, i) => {
                        const isChecked = checkedState[i];
                        return (
                            <div key={i}>
                                <p className={`text-sm ${i !== 0 && "mt-[13px]"} md:text-base leading-none duration-300 ${isChecked ? "text-dark-black" : "text-dark-black/65"}`}>
                                    {obj.title}
                                </p>
                                <div className={`mt-[13px] overflow-clip w-full flex justify-between gap-3 rounded-[5px] border duration-300 ${isChecked ? "border-green bg-off-white" : "border-dark-gray bg-light-gray"}`}>
                                    <div className='flex p-3 items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(i)}
                                            className="appearance-none w-[17px] min-w-[17px] h-[17px] duration-300 rounded-[2px] border border-dark-black cursor-pointer bg-light-gray checked:bg-white checked:border-green checked:after:content-['✔'] checked:after:block checked:after:text-green checked:after:text-xs checked:after:translate-x-[3px] checked:after:translate-y-[-0.5px]"
                                        />
                                        <p className='text-sm text-dark-black font-semibold leading-none'>
                                            {obj.desOne}
                                            <span className='block'>
                                                {obj.desTwo}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={`px-3 p-[5px] flex flex-col justify-center items-center max-w-[88px] duration-300 ${isChecked ? "bg-green" : "bg-info-gray"}`}>
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
                        )
                    })}
                </div>
                <TimeMangment />
               
            </div>
        </div>
    );
};

export default ParmentMakeUp;
