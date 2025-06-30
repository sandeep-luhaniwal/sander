"use client"
import React from 'react'
import Icons from './Icons'

const PopUp = ({ setIsOpenPopUp, isOpenPopUp }) => {
    useEffect(() => {
        if (isOpenPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenPopUp]);
    return (
        <div className='fixed top-0 left-0 flex justify-center items-center w-full min-h-screen px-4 h-full bg-dark-black/20'>
            <div className="max-w-[600px] w-[98%] bg-green px-6 md:px-14 lg:px-20 py-20 border mx-4 border-green rounded-2xl relative">
                <div onClick={() => setIsOpenPopUp(false)} className='cursor-pointer absolute top-1 right-1'>
                    <Icons icon={"cross"} />
                </div>
                <h2 className='text-4xl md:text-5xl font-bold text-center font-dm text-white'>
                    Form has been Submitted
                </h2>

            </div>

        </div>
    )
}

export default PopUp