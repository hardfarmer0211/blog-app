import React from "react";
import Image from 'next/image';
import { assets } from '../assets/assets';





const Header = () => {
    return (
        
            <div className="py-5 px-5 md:px-12 lg:px-28">
                <div className="flex justify-between items-center">
                    <Image src={assets.logo} width={180} alt='' className='w-[200px] sm:w-auto' />
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#00000]">Get started <Image alt="" src={assets.arrow} /> </button>
                </div>
            </div>
        
    )
}

export default Header