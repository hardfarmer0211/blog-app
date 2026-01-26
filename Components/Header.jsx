'use client'

import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';  // ← THÊM DÒNG NÀY
import { assets } from '../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {

  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    }
    else {
      toast.error("Error");
    }
  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt='Logo' className='w-[200px] sm:w-auto' />
        
        {/* NÚT GET STARTED - ĐÃ THÊM LINK */}
        <Link href="/admin/addProduct">
          <button className="
            flex items-center gap-3 
            text-lg sm:text-xl font-bold 
            py-4 px-10 
            border border-black 
            bg-white 
            shadow-[-8px_8px_0px_#000000] 
            transition-all duration-200
            hover:shadow-[-4px_4px_0px_#000000] 
            hover:translate-x-[3px] hover:translate-y-[-3px]
          ">
            Get started
            <Image src={assets.arrow} alt="Arrow icon" className="w-6 h-6" />
          </button>
        </Link>
      </div>
      
      {/* PHẦN SUBSCRIBE EMAIL - GIỮ NGUYÊN */}
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum laborum est, magni libero Autem numquam quasi cupiditate inventore!
        </p>
        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-[500px] scale sm:scale-100 mx-auto mt-10 border border-black p-2 rounded-md shadow-[-7px_7px_0px_#000000]">
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-200"
          />
          <button type="submit" className="border-l border-blue py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header