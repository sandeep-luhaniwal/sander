'use client';
import { useEffect, useState } from 'react';
import Icons from '../common/Icons';

const CalenderAndTime = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const times = ['16:00', '18:00', '20:00'];
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const today = new Date();

    const getMonthMatrix = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const startDay = new Date(year, month, 1).getDay();
        const adjustedStartDay = (startDay + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const matrix = [];
        let dayCounter = 1 - adjustedStartDay;

        while (true) {
            const week = [];
            let hasAtLeastOneDay = false;

            for (let i = 0; i < 7; i++) {
                if (dayCounter > 0 && dayCounter <= daysInMonth) {
                    week.push(new Date(year, month, dayCounter));
                    hasAtLeastOneDay = true;
                } else {
                    week.push(null);
                }
                dayCounter++;
            }

            if (!hasAtLeastOneDay) break;
            matrix.push(week);
        }

        return matrix;
    };

    const isSameDay = (d1, d2) => d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

    const isPastDate = (date) => {
        if (!date) return false;
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);

        const dateMidnight = new Date(date);
        dateMidnight.setHours(0, 0, 0, 0);

        return dateMidnight < todayMidnight;
    };
    useEffect(() => {
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);

        if (!selectedDate || isPastDate(selectedDate)) {
            setSelectedDate(todayMidnight);
        }
    }, []);
    const handleMonthChange = (offset) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + offset);
        setCurrentDate(newDate);
    };

    const monthMatrix = getMonthMatrix(currentDate);

    return (
        <div className="font-lora">
            <p className="font-lora text-base py-5 font-semibold text-dark-black leading-110">Choose Date</p>
            <div className="flex justify-between items-center">
                <p className="text-green text-lg md:text-xl font-semibold">
                    {currentDate.toLocaleString('default', { month: 'long' })}, {currentDate.getFullYear()}
                </p>
                <div className="flex gap-[5px]">
                    <button onClick={() => handleMonthChange(-1)} className="w-9 border-white hover:border-black border duration-300 h-9 rounded-full shadow cursor-pointer bg-white flex items-center justify-center">
                        <Icons icon="next" />
                    </button>
                    <button onClick={() => handleMonthChange(1)} className="w-9 border-white hover:border-black border duration-300 h-9 rounded-full shadow cursor-pointer bg-white flex items-center justify-center">
                        <Icons icon="prev" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 text-green font-bold text-center pt-4 text-sm">
                {days.map((day, i) => <div key={i} className='py-2.5'>{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-dark-black/70 text-base font-dm">
                {monthMatrix.map((week, i) =>
                    week.map((day, j) => {
                        const isPast = isPastDate(day);
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                            <button
                                key={`${i}-${j}`}
                                onClick={() => !isPast && day && setSelectedDate(day)}
                                className={`w-8 h-8 cursor-pointer rounded-full mx-auto flex items-center justify-center transition-all 
                ${isSelected ? 'bg-green text-white' : ''} 
                ${!day ? 'text-transparent cursor-default' : ''} 
                ${isPast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green/10'}`}
                                disabled={!day || isPast}
                            >
                                {day ? day.getDate() : '-'}
                            </button>
                        );
                    })
                )}
            </div>

            <p className="font-lora text-base pt-3 pb-5 font-semibold text-dark-black leading-110">Pick time</p>
            <div className="flex flex-wrap gap-y-3 gap-[6px] mt-3">
                {times.map((time, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`px-7 py-3 cursor-pointer font-dm font-bold rounded-full border text-sm transition-all
              ${selectedTime === time ? 'bg-green text-white border-green' : 'bg-white border-[#E6E8EC] text-dark-black hover:bg-green/10'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CalenderAndTime;
