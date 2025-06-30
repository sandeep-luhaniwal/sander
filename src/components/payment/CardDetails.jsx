"use client";
import React, { useEffect, useState } from 'react';
import Icons from '../common/Icons';
import CheckBoxGreen from '../common/CheckBoxGreen';
import PopUp from '../common/PopUp';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const GENDER_LIST = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
];

const CardDetails = ({ formatDateTime }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [selectedGender, setSelectedGender] = useState(GENDER_LIST[0]);
    const [hasMounted, setHasMounted] = useState(false);
    const [formError, setFormError] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        comment: '',
        checkboxes: {
            firstcheckbox: false,
            viasms: false,
            viaemail: false,
            agree: false,
        },
    });

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const handleSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            checkboxes: {
                ...prev.checkboxes,
                [id]: checked,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        const { fname, lname, email, mobile, checkboxes } = formData;

        if (!fname.trim() || !lname.trim() || !email.trim() || !mobile.trim() || !checkboxes.agree) {
            setFormError("Please fill all fields and agree to T&Cs before booking.");
            return;
        }

        setIsOpenPopUp(true);
        setFormData({
            fname: '',
            lname: '',
            email: '',
            mobile: '',
            comment: '',
            checkboxes: {
                firstcheckbox: false,
                viasms: false,
                viaemail: false,
                agree: false,
            },
        });
        setSelectedGender(GENDER_LIST[0]);
        formatDateTime(null)
        setTimeout(() => {
            router.push('/');
        }, 3000);
    };

    if (!hasMounted) return null;

    return (
        <div>
            <p className='font-lora text-sm md:text-[15px] text-dark-black font-semibold leading-110 pt-4 pb-5'>
                Your Details
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row gap-[15px]'>
                    <div className='w-full md:w-1/2'>
                        <div className='rounded-[10px] hover:border-green duration-300 border border-light-white py-[9px]'>
                            <label htmlFor="gender" className='font-semibold text-sm md:text-base px-3 text-green leading-none pb-[3px]'>Gender</label>
                            <div id='gender' className="relative">
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="cursor-pointer flex justify-between items-center text-base text-[#113125] rounded-md px-3 bg-white hover:border-green transition-all"
                                >
                                    <span className="text-dark-black">
                                        {selectedGender?.name || "Select"}
                                    </span>
                                    <span className={`${isOpen ? "rotate-180" : "rotate-0"} duration-300`}>
                                        <Icons icon={"ChevronDown"} />
                                    </span>
                                </div>

                                {isOpen && (
                                    <div className="absolute z-10 mt-3 w-full bg-white border border-light-white rounded-md shadow-lg max-h-60 overflow-auto">
                                        {GENDER_LIST.map((gender) => (
                                            <div
                                                key={gender.id}
                                                onClick={() => handleSelect(gender)}
                                                className="px-4 py-2 hover:bg-green/10 cursor-pointer text-dark-black"
                                            >
                                                {gender.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='rounded-[10px] border hover:border-green duration-300 border-light-white py-[9px] px-3 mt-[15px]'>
                            <label htmlFor="fname" className='font-semibold cursor-pointer text-sm md:text-base text-green leading-none pb-[3px]'>First Name</label>
                            <input type="text" id='fname' name='fname' value={formData.fname} onChange={handleChange} placeholder='Enter First Name' className='block w-full placeholder:text-[#C1C1C1] text-sm md:text-base text-dark-black outline-none' />
                        </div>
                        <div className='rounded-[10px] border hover:border-green duration-300 border-light-white py-[9px] px-3 mt-[15px]'>
                            <label htmlFor="lastname" className='font-semibold cursor-pointer text-sm md:text-base text-green leading-none pb-[3px]'>Last Name</label>
                            <input type="text" id='lastname' name='lname' value={formData.lname} onChange={handleChange} placeholder='Enter Last Name' className='block w-full placeholder:text-[#C1C1C1] text-sm md:text-base text-dark-black outline-none' />
                        </div>
                        <div className='rounded-[10px] border hover:border-green duration-300 border-light-white py-[9px] px-3 mt-[15px]'>
                            <label htmlFor="email" className='font-semibold cursor-pointer text-sm md:text-base text-green leading-none pb-[3px]'>E-mail</label>
                            <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter Email' className='block w-full placeholder:text-[#C1C1C1] text-sm md:text-base text-dark-black outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <div className='rounded-[10px] border hover:border-green duration-300 border-light-white py-[9px] px-3 mt-[15px] md:mt-0'>
                            <label htmlFor="mobile" className='font-semibold cursor-pointer text-sm md:text-base text-green leading-none pb-[3px]'>Mobile Number</label>
                            <PhoneInput
                                defaultCountry="IN"
                                value={formData.mobile}
                                onChange={(value) =>
                                    setFormData((prev) => ({ ...prev, mobile: value }))
                                }
                                id="mobile"
                                name="mobile"
                                className="custom-phone-input outline-none border-none"
                                international
                            />
                        </div>
                        <div className='rounded-[10px] border hover:border-green duration-300 border-light-white py-[9px] px-3 mt-[15px]'>
                            <label htmlFor="comment" className='font-semibold cursor-pointer text-sm md:text-base text-green leading-none pb-[3px]'>
                                Got something to tell your salon?
                                <span className='block'>
                                    Leave a note! (Optional)
                                </span>
                            </label>
                            <textarea id='comment' rows="7" cols="50" name='comment' value={formData.comment} onChange={handleChange} placeholder='Type Here' className='block pt-[5px] w-full resize-none placeholder:text-[#C1C1C1] text-sm md:text-base text-dark-black outline-none' />
                        </div>
                    </div>
                </div>
                <div className="my-5 flex items-center gap-2">
                    <CheckBoxGreen checked={formData.checkboxes.firstcheckbox} onChange={handleCheckboxChange} checkId={"firstcheckbox"} />
                    <label htmlFor="firstcheckbox" className='text-sm md:text-base text-dark-black/65 font-normal leading-none'>
                        Save your details on this device for a quicker booking next time.
                    </label>
                </div>
                <p className='font-lora text-sm md:text-[15px] text-dark-black font-semibold leading-110'>
                    Please contact me...
                </p>
                <div className="flex gap-5 mt-1.5 mb-5">
                    <div className="flex items-center gap-2">
                        <CheckBoxGreen checked={formData.checkboxes.viasms} onChange={handleCheckboxChange} checkId={"viasms"} />
                        <label htmlFor="viasms" className='text-sm md:text-base text-dark-black/65 font-normal leading-none'>
                            via SMS
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckBoxGreen checkId={"viaemail"} checked={formData.checkboxes.viaemail} onChange={handleCheckboxChange} />
                        <label htmlFor="viaemail" className='text-sm md:text-base text-dark-black/65 font-normal leading-none'>
                            via email
                        </label>
                    </div>
                </div>
                <span className='block h-[1px] max-w-[316px] bg-dark-gray'></span>
                <p className='text-sm md:text-base py-4 md:pb-6 lg:pb-[30px] text-dark-black/65 font-normal leading-none'>
                    For offers (e.g. for birthdays). Changed your mind? No worries - you can opt-out anytime via phone or the 'unsubscribe' link. Want more info? Check out our privacy policy.
                </p>
                <div className="flex items-center gap-2">
                    <CheckBoxGreen checked={formData.checkboxes.agree} onChange={handleCheckboxChange} checkId={"agree"} />
                    <label htmlFor="agree" className='text-sm md:text-base text-dark-black/65 font-normal leading-none'>
                        I agree with the T&Cs
                    </label>
                </div>
                <p className='text-sm md:text-base pt-4 md:pt-[18px] text-dark-black/65 font-normal leading-none'>
                    Your personal data will be processed by us in accordance with our privacy policy.
                </p>
                {formError && <p className="mt-7 md:mt-9 text-red-600 text-sm md:text-base lg:mt-12">{formError}</p>}
                <button
                    type="submit"
                    className='border mt-7 md:mt-9 max-w-[337px] lg:mt-12 rounded-lg cursor-pointer text-white duration-300 hover:text-green hover:bg-white border-green bg-green w-full py-[8.5px] font-lora text-lg md:text-xl'>
                    Book Appointment
                </button>
            </form>
            {isOpenPopUp && <PopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />}
        </div>
    );
};

export default CardDetails;
