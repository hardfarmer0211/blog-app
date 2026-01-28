'use client'

import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            href: '/admin/addProduct',
            icon: assets.add_icon,
            label: 'ブログを追加',
            labelEn: 'Add Blog'
        },
        {
            href: '/admin/blogList',
            icon: assets.blog_icon,
            label: 'ブログ一覧',
            labelEn: 'Blog List'
        },
        {
            href: '/admin/subscriptions',
            icon: assets.email_icon,
            label: '購読者リスト',
            labelEn: 'Subscriptions'
        }
    ];

    return (
        <div className='flex flex-col bg-white border-r-2 border-gray-200 min-h-screen w-20 sm:w-72'>
            {/* LOGO SECTION */}
            <div className='px-4 sm:px-8 py-6 border-b-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white'>
                <Link href='/'>
                    <Image 
                        src={assets.logo} 
                        width={180} 
                        alt='Logo' 
                        className='hidden sm:block cursor-pointer transition-all duration-300 hover:scale-105'
                    />
                    <div className='sm:hidden w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl'>
                        B
                    </div>
                </Link>
            </div>
            
            {/* MENU ITEMS */}
            <nav className='flex-1 py-8 px-3 sm:px-6 space-y-6'>
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    
                    return (
                        <Link 
                            key={index}
                            href={item.href}
                        >
                            <div className={`
                                group relative
                                flex items-center gap-4
                                px-3 sm:px-5 py-4
                                rounded-xl
                                font-semibold text-sm sm:text-base
                                transition-all duration-300
                                cursor-pointer
                                ${isActive 
                                    ? 'bg-black text-white shadow-lg scale-105' 
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:scale-102'
                                }
                            `}>
                                {/* Icon */}
                                <div className={`
                                    relative
                                    flex-shrink-0
                                    transition-transform duration-300
                                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                                `}>
                                    <Image 
                                        src={item.icon} 
                                        alt={item.labelEn}
                                        width={28} 
                                        height={28}
                                        className={isActive ? 'brightness-0 invert' : ''}
                                    />
                                </div>
                                
                                {/* Text */}
                                <span className='hidden sm:block truncate'>
                                    {item.label}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className='absolute right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* FOOTER INFO */}
            <div className='hidden sm:block px-6 py-6 border-t-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white'>
                <p className='text-xs text-gray-500 text-center'>
                    Admin Panel v1.0
                </p>
            </div>
        </div>
    )
}

export default Sidebar