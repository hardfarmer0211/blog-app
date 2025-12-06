"use client";


import { assets, blog_data } from '@/assets/assets';
import React, { useEffect, useState } from 'react'
import Image from "next/image";



const page = ({params}) => {



    const [data,setData] = useState(null);

    const fetchBlogData = () =>{
        for(let i=0;i<blog_data.length;i++){

            if (Number(params.id)===blog_data[i].id){
                setData(blog_data[i]);
                console.log(blog_data[i]);
                break;
            }
        }
    }

    useEffect(()=>{
        fetchBlogData()
    },[])

  return (
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center '>
            <Image src={assets.logo} width={180} height={70} alt="" className="w-[130px] sm:w-auto" />
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border-10 border-black shadow-[-7px_7px_5px_5px_#000000]'>
                Get started <Image src={assets.arrow} alt="" width={24} height={24} />
            </button>
        </div>
        
    </div>
  )
}

export default page