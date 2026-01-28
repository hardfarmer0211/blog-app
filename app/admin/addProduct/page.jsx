'use client'

import { assets } from '@/assets/assets'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'

const Page = () => {
    const [image, setImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Ricardo Millos",
        authorImg: "/author_img.png"
    })

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        }
    }, [imagePreview]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authorImg', data.authorImg);
            formData.append('image', image);
            
            const response = await axios.post('/api/blog', formData);
            
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(false);
                setImagePreview(null);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Ricardo Millos",
                    authorImg: "/author_img.png"
                })
            } else {
                toast.error(response.data.msg || 'Error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('アップロードに失敗しました');
        }
    }

    return (
        <div className='px-5 sm:px-12 py-8'>
            <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto space-y-8'>
                {/* HEADING */}
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-8'>
                    新しいブログを追加
                </h1>

                {/* UPLOAD THUMBNAIL */}
                <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-gray-700'>
                        サムネイル画像
                    </label>
                    <label 
                        htmlFor="image"
                        className='
                            group
                            relative
                            block w-full sm:w-64 h-48
                            border-2 border-dashed border-gray-300
                            rounded-xl
                            cursor-pointer
                            overflow-hidden
                            transition-all duration-300
                            hover:border-black
                            hover:shadow-[-6px_6px_0px_#000000]
                        '
                    >
                        <Image 
                            src={imagePreview || assets.upload_area} 
                            fill
                            alt='Upload preview'
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        {!imagePreview && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors'>
                                <p className='text-gray-500 font-medium'>画像をアップロード</p>
                            </div>
                        )}
                    </label>
                    <input 
                        onChange={handleImageChange} 
                        type="file" 
                        id='image' 
                        hidden 
                        required 
                        accept="image/*"
                    />
                </div>

                {/* BLOG TITLE */}
                <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-gray-700'>
                        ブログタイトル
                    </label>
                    <input 
                        name='title' 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        className='
                            w-full px-5 py-4 
                            border-2 border-gray-300 
                            rounded-xl
                            outline-none
                            transition-all duration-200
                            focus:border-black focus:shadow-[-4px_4px_0px_#000000]
                        ' 
                        type="text" 
                        placeholder='タイトルを入力' 
                        required 
                    />
                </div>

                {/* BLOG DESCRIPTION */}
                <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-gray-700'>
                        ブログ内容
                    </label>
                    <textarea 
                        name='description' 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        className='
                            w-full px-5 py-4 
                            border-2 border-gray-300 
                            rounded-xl
                            outline-none
                            transition-all duration-200
                            focus:border-black focus:shadow-[-4px_4px_0px_#000000]
                            resize-none
                        ' 
                        placeholder='内容を入力してください' 
                        rows={10} 
                        required 
                    />
                </div>

                {/* CATEGORY */}
                <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-gray-700'>
                        カテゴリー
                    </label>
                    <select 
                        name="category" 
                        onChange={onChangeHandler} 
                        value={data.category} 
                        className='
                            w-full sm:w-64 px-5 py-4 
                            border-2 border-gray-300
                            rounded-xl
                            outline-none
                            transition-all duration-200
                            focus:border-black focus:shadow-[-4px_4px_0px_#000000]
                            cursor-pointer
                        '
                    >
                        <option value="Startup">スタートアップ</option>
                        <option value="Technology">テクノロジー</option>
                        <option value="Lifestyle">ライフスタイル</option>
                    </select>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                    type='submit' 
                    className='
                        group
                        relative
                        px-10 py-4
                        bg-black text-white
                        border-2 border-black
                        rounded-xl
                        font-bold text-lg
                        overflow-hidden
                        transition-all duration-300
                        shadow-[-6px_6px_0px_#ff0000]
                        hover:shadow-[-8px_8px_0px_#ff0000]
                        hover:translate-x-[-2px] hover:translate-y-[-2px]
                        active:shadow-none
                        active:translate-x-0 active:translate-y-0
                    '
                >
                    <span className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                    <span className='relative z-10'>追加</span>
                </button>
            </form>
        </div>
    )
}

export default Page