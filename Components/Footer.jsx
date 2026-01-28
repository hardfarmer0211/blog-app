import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className="
            relative
            bg-gradient-to-r from-gray-900 via-black to-gray-900
            py-8 sm:py-10
            border-t-4 border-red-600
            overflow-hidden
        ">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="
                relative z-10
                flex flex-col sm:flex-row 
                justify-around items-center 
                gap-6 sm:gap-4
                px-5
                max-w-7xl mx-auto
            ">
                {/* LOGO */}
                <div className="transition-transform duration-300 hover:scale-110">
                    <Image 
                        src={assets.logo_light} 
                        alt="Logo" 
                        width={140} 
                        height={40}
                        className="brightness-110"
                    />
                </div>

                {/* COPYRIGHT TEXT - GIỮ NGUYÊN */}
                <p className="
                    text-xs sm:text-sm 
                    text-gray-300 
                    text-center
                    max-w-md
                    transition-colors duration-300
                    hover:text-white
                ">
                    All rights reserved. Copyright @bloggerdannnguyen
                </p>

                {/* SOCIAL ICONS */}
                <div className="flex gap-2">
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
                                w-10 h-10 sm:w-12 sm:h-12
                                flex items-center justify-center
                                bg-white/5
                                border-2 border-white/10
                                rounded-full
                                cursor-pointer
                                transition-all duration-300
                                hover:bg-white/20
                                hover:border-white/30
                                hover:scale-110
                                hover:rotate-6
                                active:scale-95
                            "
                        >
                            <Image 
                                src={social.icon} 
                                alt={social.name}
                                width={24} 
                                height={24}
                                className="
                                    transition-transform duration-300
                                    group-hover:scale-110
                                "
                            />
                            
                            {/* Tooltip on hover */}
                            <span className="
                                absolute -top-10
                                px-2 py-1
                                bg-white text-black
                                text-xs font-semibold
                                rounded
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300
                                pointer-events-none
                                whitespace-nowrap
                            ">
                                {social.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient line */}
            <div className="
                absolute bottom-0 left-0 right-0 
                h-1 
                bg-gradient-to-r from-transparent via-red-600 to-transparent
            "></div>
        </footer>
    )
}

export default Footer