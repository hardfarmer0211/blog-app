'use client'

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    
    try {
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Failed to subscribe");
    }
  }

  return (
    <>
      {/* STICKY HEADER */}
      <div className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl py-3' 
          : 'bg-transparent py-5'
        }
      `}>
        <div className="px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            {/* LOGO */}
            <Link href="/">
              <Image 
                src={assets.logo} 
                width={180} 
                alt='Logo' 
                className='w-[130px] sm:w-[180px] cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-2' 
              />
            </Link>
            
            {/* スタート BUTTON */}
            <Link href="/admin/addProduct">
              <button className="
                group relative
                flex items-center gap-3 
                text-base sm:text-lg font-bold 
                py-3 px-6 sm:py-4 sm:px-10 
                border-2 border-black 
                bg-white 
                overflow-hidden
                shadow-[-8px_8px_0px_#000000] 
                transition-all duration-300
                hover:shadow-[-4px_4px_0px_#000000] 
                hover:translate-x-[4px] hover:translate-y-[-4px]
                active:shadow-none
                active:translate-x-[8px] active:translate-y-[0px]
              ">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                
                <span className="relative z-10">スタート</span>
                
                <Image 
                  src={assets.arrow} 
                  alt="Arrow icon" 
                  className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-20"></div>

      {/* HERO SECTION */}
      <div className="py-8 px-5 md:px-12 lg:px-28">
        <div className="text-center my-8">
          {/* 最新のブログ HEADING */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
            最新のブログ
          </h1>
          
          {/* SUBTITLE */}
          <p className="mt-6 max-w-[740px] m-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            毎日面最新で、白いブログを読むために、
          </p>

          {/* SUBSCRIBE FORM */}
          <form 
            onSubmit={onSubmitHandler} 
            className="
              relative group
              max-w-[550px] mx-auto mt-10 
              flex items-stretch
              border-2 border-black 
              rounded-lg
              shadow-[-7px_7px_0px_#000000]
              transition-all duration-300
              hover:shadow-[-10px_10px_0px_#000000]
              overflow-hidden
              bg-white
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Email Input - メールアドレスを入力 */}
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email"
              placeholder="メールアドレスを入力"
              required
              className="
                relative z-10
                flex-1 
                px-6 py-4 
                bg-transparent
                outline-none 
                text-gray-800 placeholder-gray-400
                text-sm sm:text-base
              "
            />
            
            {/* 購読する Button */}
            <button 
              type="submit" 
              className="
                relative z-10
                px-6 sm:px-10 py-4
                bg-black text-white 
                font-bold text-sm sm:text-base
                transition-all duration-300
                hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
                active:scale-95
              "
            >
              購読する
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Header