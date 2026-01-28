"use client";

import { assets } from '@/assets/assets';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';

const page = ({ params }) => {
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            });
            
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])

    return (data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image 
                        src={assets.logo} 
                        width={180} 
                        height={70} 
                        alt="Logo" 
                        className="w-[130px] sm:w-auto cursor-pointer transition-all duration-300 hover:scale-110" 
                    />
                </Link>
                
                {/* スタート BUTTON */}
                <Link href="/admin/addProduct">
                    <button className='
                        group
                        flex items-center gap-2 
                        font-bold text-sm sm:text-base
                        py-2 px-4 sm:py-3 sm:px-6 
                        border-2 border-black 
                        bg-white
                        shadow-[-7px_7px_0px_#000000]
                        transition-all duration-300
                        hover:shadow-[-4px_4px_0px_#000000]
                        hover:translate-x-[3px] hover:translate-y-[-3px]
                        active:shadow-none
                    '>
                        スタート
                        <Image 
                            src={assets.arrow} 
                            alt="Arrow" 
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        />
                    </button>
                </Link>
            </div>
            
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image 
                    className='mx-auto mt-6 border border-white rounded-full' 
                    src={data.authorImg} 
                    width={100} 
                    height={100} 
                    alt='Author' 
                />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>
        
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image 
                className='w-full h-auto border-4 border-white rounded-lg shadow-xl' 
                src={data.image} 
                width={1280} 
                height={750} 
                alt='Blog image' 
            />

            <div className="flex justify-center">
                <div
                    className="blog-content max-w-[800px] w-full mt-10"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            </div>

            {/* SHARE SECTION - JAPANESE */}
            <div className='my-24'>
                <p className='text-gray-800 font-semibold text-lg my-4'>この記事をシェア</p>
                <div className='flex gap-3'>
                    {[
                        { icon: assets.facebook_icon, name: 'Facebook' },
                        { icon: assets.twitter_icon, name: 'Twitter' },
                        { icon: assets.googleplus_icon, name: 'Google Plus' }
                    ].map((social, index) => (
                        <div
                            key={index}
                            className="
                                group
                                relative
                                w-12 h-12
                                flex items-center justify-center
                                bg-white
                                border-2 border-black
                                rounded-full
                                cursor-pointer
                                transition-all duration-300
                                hover:bg-black
                                hover:scale-110
                                hover:rotate-6
                                active:scale-95
                                shadow-[-3px_3px_0px_#000000]
                                hover:shadow-[-5px_5px_0px_#ff0000]
                            "
                        >
                            <Image 
                                src={social.icon} 
                                alt={social.name}
                                width={24} 
                                height={24}
                                className="transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <Footer />
    </> : 
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">ローディング中...</p>
        </div>
    </div>
    )
}

export default page