import React from "react";
import Image from "next/image";
import { assets } from "../assets/assets";
import Link from "next/link";

const BlogItem = ({title, description, category, image, id}) => {
    // Category translation for display
    const categoryTranslations = {
        'Technology': 'テクノロジー',
        'Startup': 'スタートアップ',
        'Lifestyle': 'ライフスタイル'
    };

    const displayCategory = categoryTranslations[category] || category;

    return (
        <div className="
            group
            max-w-[500px] sm:max-w-[390px] 
            bg-white 
            border-2 border-black 
            rounded-xl 
            overflow-hidden 
            shadow-[-4px_4px_0px_#000000]
            transition-all duration-300 ease-out
            hover:shadow-[-8px_8px_0px_#000000] 
            hover:translate-x-[-4px] hover:translate-y-[-4px]
        ">
            {/* IMAGE WITH OVERLAY */}
            <Link href={`/blogs/${id}`}>
                <div className="relative w-full h-[240px] border-b-2 border-black overflow-hidden">
                    <Image
                        src={image}
                        alt="Blog thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 390px"
                        className="
                            object-cover 
                            transition-transform duration-500 ease-out
                            group-hover:scale-110
                        "
                    />
                    
                    {/* Dark overlay on hover */}
                    <div className="
                        absolute inset-0 
                        bg-black/0 
                        group-hover:bg-black/20 
                        transition-all duration-300
                    "></div>
                    
                    {/* Category badge on image - JAPANESE */}
                    <div className="
                        absolute top-4 left-4
                        px-3 py-1.5 
                        bg-black text-white 
                        text-xs sm:text-sm font-bold
                        rounded-md
                        shadow-lg
                        transform transition-all duration-300
                        group-hover:scale-110
                    ">
                        {displayCategory}
                    </div>
                </div>
            </Link>

            {/* CONTENT */}
            <div className="p-5 sm:p-6">
                <Link href={`/blogs/${id}`}>
                    <h5 className="
                        mb-3 
                        text-lg sm:text-xl 
                        font-bold 
                        tracking-tight 
                        text-gray-900
                        line-clamp-2
                        transition-colors duration-200
                        group-hover:text-blue-600
                    ">
                        {title}
                    </h5>
                </Link>
                
                <p 
                    className="
                        mb-4 
                        text-sm 
                        text-gray-600 
                        line-clamp-3
                        leading-relaxed
                    "
                    dangerouslySetInnerHTML={{__html: description.slice(0, 120)}}
                />
                
                {/* もっと見る BUTTON */}
                <Link href={`/blogs/${id}`}>
                    <div className="
                        inline-flex items-center gap-2
                        py-2 px-4
                        font-bold text-sm
                        text-black
                        border-2 border-black
                        rounded-lg
                        transition-all duration-300
                        hover:bg-black hover:text-white
                        hover:shadow-[-3px_3px_0px_#ff0000]
                        active:shadow-none
                        active:translate-x-[2px] active:translate-y-[2px]
                    ">
                        もっと見る
                        <Image 
                            src={assets.arrow} 
                            alt="Arrow" 
                            height={14} 
                            width={14}
                            className="
                                transition-transform duration-300
                                group-hover:translate-x-1
                            " 
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;