"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { NAVIGATION_DATA_LIST } from './Helper'
import Icons from './Icons'

const NavBar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    return (
        <div className='max-w-[1310px] px-4 mx-auto py-8 md:py-10 lg:py-12'>
            <div className="flex justify-between">
                <Link href={"/"}>
                    <Image
                        className='w-[160px] md:w-[180px] lg:w-[225px]'
                        src={'/images/svg/main-logo.svg'}
                        width={225} height={72} alt='main-logo'
                    />
                </Link>
                <div className='flex items-center gap-4 sm:gap-6 lg:gap-10'>
                    {NAVIGATION_DATA_LIST.map((obj, i) => {
                        return (
                            <Link key={i} href={obj.url}
                                className='text-base hidden md:flex font-semibold font-urbanist leading-none text-dark-black hover:text-green duration-300'
                            >
                                {obj.title}
                            </Link>
                        )
                    })}
                    <button className='text-white cursor-pointer font-urbanist text-[17px] py-2 px-5 md:py-[17px] md:px-[34px] bg-green hover:bg-dark-text-dark-black duration-300 rounded-2xl'>Hi Rana</button>
                    <div onClick={() => setIsNavOpen(true)} className='md:hidden cursor-pointer'>
                        <Icons icon={"menuToggel"} />
                    </div>
                </div>
                <div className={`fixed top-0 left-0 md:hidden overflow-clip z-[1000] bg-green w-full 
                    ${isNavOpen ? "h-full scale-100" : "h-0 scale-30"} duration-300
                    `}>
                    <div onClick={() => setIsNavOpen(false)} className='md:hidden cursor-pointer absolute top-3 right-3'>
                        <Icons icon={"cross"} />
                    </div>
                    <div className='p-8 pt-16 flex flex-col gap-4 '>
                        {NAVIGATION_DATA_LIST.map((obj, i) => {
                            return (
                                <Link key={i} href={obj.url}
                                    className='text-xl font-semibold font-urbanist leading-none text-white hover:text-dark-black duration-300'
                                >
                                    {obj.title}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar