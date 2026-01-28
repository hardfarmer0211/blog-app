import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'

const BlogTableItem = ({authorImg, title, author, date, deleteBlog, mongoId}) => {
    const BlogDate = new Date(date);
    
    return (
        <tr className='
            bg-white border-b border-gray-200
            transition-all duration-200
            hover:bg-gray-50
        '>
            {/* AUTHOR */}
            <th scope='row' className='
                hidden sm:flex 
                items-center gap-3 
                px-6 py-4 
                font-medium text-gray-700
            '>
                <div className='
                    relative w-12 h-12
                    rounded-full overflow-hidden
                    border-2 border-gray-300
                    transition-all duration-300
                    hover:border-black hover:scale-110
                '>
                    <Image 
                        fill
                        src={authorImg ? authorImg : assets.profile_icon} 
                        alt='Author'
                        className='object-cover'
                    />
                </div>
                <p className='truncate max-w-[150px]'>{author ? author : "著者なし"}</p>
            </th>
            
            {/* TITLE */}
            <td className='px-6 py-4 font-medium text-gray-800'>
                <p className='line-clamp-2'>{title ? title : "タイトルなし"}</p>
            </td>
            
            {/* DATE */}
            <td className='px-6 py-4 text-gray-600'>
                {BlogDate.toLocaleDateString('ja-JP')}
            </td>
            
            {/* DELETE BUTTON */}
            <td className='px-6 py-4'>
                <button
                    onClick={() => deleteBlog(mongoId)}
                    className='
                        group
                        relative
                        w-10 h-10
                        flex items-center justify-center
                        bg-red-50
                        border-2 border-red-600
                        rounded-lg
                        font-bold text-red-600 text-lg
                        transition-all duration-300
                        hover:bg-red-600 hover:text-white
                        hover:shadow-[-3px_3px_0px_#000000]
                        active:shadow-none
                        active:translate-x-[2px] active:translate-y-[2px]
                        mx-auto
                    '
                    title='削除'
                >
                    ×
                </button>
            </td>
        </tr>
    )
}

export default BlogTableItem