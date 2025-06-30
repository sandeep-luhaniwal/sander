"use client";
import React, { useState } from "react";
import { APPOINTMENT_TAB_DATA } from "../common/Helper";
import { APPOINTMENT_CHECK_DATA } from "../common/Helper";
import Icons from "../common/Icons";
import TimeMangment from "./TimeMangment";
import ParmentMakeUp from "./ParmentMakeUp";
import { useRouter } from "next/navigation";

const AppointmentBooking = () => {
    const [isTab, setIsTab] = useState("Permanent makeup");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState("");
    const [checkedState, setCheckedState] = useState(new Array(APPOINTMENT_CHECK_DATA.length).fill(false));

    const router = useRouter();

    const handleNext = () => {
        const anyChecked = checkedState.some(Boolean);
        if (!anyChecked || !selectedStaff || !selectedDate || !selectedTime) {
            setError("Please select at least one service, staff, date, and time.");
        } else {
            setError("");
            const selectedServices = APPOINTMENT_CHECK_DATA.filter((_, i) => checkedState[i]);
            const encodedDate = new Date(selectedDate).toISOString();
            const encodedServices = encodeURIComponent(JSON.stringify(selectedServices));
            router.push(`/payment?services=${encodedServices}&staff=${selectedStaff.name}&date=${encodedDate}&time=${selectedTime}`);
        }
    };

    const activeTab = APPOINTMENT_TAB_DATA.find((tab) => tab.title === isTab);
    const tabContentComponent = () => {
        switch (isTab) {
            case "Permanent makeup":
                return (
                    <ParmentMakeUp
                        checkedState={checkedState}
                        setCheckedState={setCheckedState}
                    />
                );
            default:
                return <p className="text-sm text-gray-600 leading-110">No details available for this service yet.</p>;
        }
    };

    return (
        <div className="max-w-[1292px] mx-auto px-4 pb-12">
            <div className="grid grid-cols-1 w-full md:grid-cols-[60%_38%] gap-8 md:gap-4 lg:grid-cols-[70%_27%] lg:gap-8 xl:gap-9 justify-between">
                <div className="flex flex-col">
                    <p className="text-dark-black pb-5 font-lora font-semibold leading-110">
                        Quick Appointment Booking
                    </p>
                    <div className="flex flex-wrap gap-5 md:gap-7">
                        {APPOINTMENT_TAB_DATA.map((obj, i) => (
                            <div
                                key={i}
                                onClick={() => setIsTab(obj.title)}
                                className={`border max-w-[80px] w-full min-w-[80px] border-green p-2 rounded-[5px] flex flex-col justify-center items-center cursor-pointer transition-all 
                                ${isTab === obj.title ? "bg-green text-white" : "text-green"}`}
                            >
                                <Icons isTab={isTab} icon={obj.icon} />
                                <p className="text-center capitalize pt-2 text-xs leading-110">{obj.title}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-11">
                        {tabContentComponent()}
                    </div>
                </div>

                <TimeMangment
                    selectedStaff={selectedStaff}
                    setSelectedStaff={setSelectedStaff}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    handleNext={handleNext}
                    error={error}
                />
            </div>
        </div>
    );
};

export default AppointmentBooking;
