"use client";

import { assets } from '@/assets/assets';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const [copied, setCopied] = useState(false);

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

    // Reading progress tracker
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setReadingProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchBlogData()
    }, [])

    // Copy link function
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    // Category translation
    const categoryTranslations = {
        'Technology': 'テクノロジー',
        'Startup': 'スタートアップ',
        'Lifestyle': 'ライフスタイル'
    };

    return (data ? <>
        {/* READING PROGRESS BAR */}
        <div className='fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200'>
            <div 
                className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transition-all duration-150'
                style={{ width: `${readingProgress}%` }}
            />
        </div>

        {/* HEADER SECTION */}
        <div className='bg-gradient-to-b from-gray-100 to-white py-8 px-5 md:px-12 lg:px-28 border-b-2 border-gray-200'>
            <div className='max-w-4xl mx-auto'>
                {/* TOP NAV */}
                <div className='flex justify-between items-center mb-12'>
                    <Link href={'/'}>
                        <Image 
                            src={assets.logo} 
                            width={180} 
                            height={70} 
                            alt="Logo" 
                            className="w-[130px] sm:w-auto cursor-pointer transition-all duration-300 hover:scale-110" 
                        />
                    </Link>
                    
                    <Link href="/admin/addProduct">
                        <button className='
                            group
                            flex items-center gap-2 
                            font-bold text-sm sm:text-base
                            py-2 px-4 sm:py-3 sm:px-6 
                            border-2 border-black 
                            bg-white
                            rounded-lg
                            shadow-[-4px_4px_0px_#000000]
                            transition-all duration-300
                            hover:shadow-[-6px_6px_0px_#000000]
                            hover:translate-x-[-2px] hover:translate-y-[-2px]
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

                {/* CATEGORY BADGE */}
                <div className='mb-6'>
                    <span className='
                        inline-block px-4 py-2 
                        bg-black text-white 
                        text-sm font-bold
                        rounded-lg
                        shadow-md
                    '>
                        {categoryTranslations[data.category] || data.category}
                    </span>
                </div>

                {/* TITLE */}
                <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8'>
                    {data.title}
                </h1>

                {/* AUTHOR INFO */}
                <div className='flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 shadow-md'>
                    <div className='relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300'>
                        <Image 
                            src={data.authorImg} 
                            fill
                            alt='Author' 
                            className='object-cover'
                        />
                    </div>
                    <div>
                        <p className='text-sm text-gray-500 mb-1'>著者</p>
                        <p className='text-lg font-bold text-gray-900'>{data.author}</p>
                    </div>
                    <div className='ml-auto text-right'>
                        <p className='text-sm text-gray-500 mb-1'>公開日</p>
                        <p className='text-sm font-semibold text-gray-700'>
                            {new Date(data.date).toLocaleDateString('ja-JP')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* CONTENT SECTION */}
        <div className='bg-white'>
            <div className='max-w-4xl mx-auto px-5 py-12'>
                {/* FEATURED IMAGE */}
                <div className='mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100'>
                    <Image 
                        className='w-full h-auto' 
                        src={data.image} 
                        width={1280} 
                        height={750} 
                        alt='Blog image'
                        priority
                    />
                </div>

                {/* BLOG CONTENT */}
                <article className='prose prose-lg max-w-none'>
                    <div
                        className="blog-content text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                </article>

                {/* DIVIDER */}
                <div className='my-16 border-t-2 border-gray-200'></div>

                {/* SHARE SECTION */}
                <div className='bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-6'>この記事をシェア</h3>
                    
                    <div className='flex flex-wrap items-center gap-4'>
                        {/* SOCIAL ICONS */}
                        {[
                            { icon: assets.facebook_icon, name: 'Facebook', color: 'hover:bg-blue-600' },
                            { icon: assets.twitter_icon, name: 'Twitter', color: 'hover:bg-sky-500' },
                            { icon: assets.googleplus_icon, name: 'Google Plus', color: 'hover:bg-red-600' }
                        ].map((social, index) => (
                            <button
                                key={index}
                                className={`
                                    group
                                    relative
                                    w-14 h-14 sm:w-16 sm:h-16
                                    flex items-center justify-center
                                    bg-white
                                    border-2 border-black
                                    rounded-full
                                    cursor-pointer
                                    transition-all duration-300
                                    hover:scale-110
                                    hover:rotate-6
                                    active:scale-95
                                    shadow-[-3px_3px_0px_#000000]
                                    hover:shadow-[-5px_5px_0px_#ff0000]
                                    ${social.color}
                                `}
                                title={social.name}
                            >
                                <Image 
                                    src={social.icon} 
                                    alt={social.name}
                                    width={48} 
                                    height={48}
                                    className="transition-all duration-300 group-hover:brightness-0 group-hover:scale-50"
                                />
                            </button>
                        ))}

                        {/* COPY LINK BUTTON */}
                        <button
                            onClick={copyLink}
                            className='
                                flex items-center gap-2
                                px-6 py-3
                                bg-black text-white
                                border-2 border-black
                                rounded-full
                                font-bold text-sm
                                transition-all duration-300
                                hover:bg-gray-800
                                shadow-[-3px_3px_0px_#000000]
                                hover:shadow-[-5px_5px_0px_#ff0000]
                                active:scale-95
                            '
                        >
                            {copied ? '✓ コピーしました!' : '🔗 リンクをコピー'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer />
    </> : 
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mb-6"></div>
            <p className="text-xl font-bold text-gray-700">ローディング中...</p>
        </div>
    </div>
    )
}

export default Page