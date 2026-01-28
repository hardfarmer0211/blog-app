'use client'

import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs);
        } catch (error) {
            toast.error('ブログの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    } 

    const deleteBlog = async (mongoId) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: mongoId }
            })
            toast.success(response.data.msg);
            fetchBlogs();
        } catch (error) {
            toast.error('削除に失敗しました');
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 px-5 sm:px-12 py-8'>
            {/* HEADING */}
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                    全てのブログ
                </h1>
                <div className='px-4 py-2 bg-black text-white rounded-lg font-semibold'>
                    {blogs.length} 件
                </div>
            </div>

            {/* TABLE */}
            <div className='
                relative 
                max-w-full
                overflow-x-auto 
                border-2 border-black 
                rounded-xl
                shadow-[-6px_6px_0px_#000000]
                bg-white
            '>
                {loading ? (
                    <div className='flex items-center justify-center h-96'>
                        <div className='text-center'>
                            <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent'></div>
                            <p className='mt-4 text-gray-600 font-semibold'>ローディング中...</p>
                        </div>
                    </div>
                ) : (
                    <table className='w-full text-sm'>
                        <thead className='text-sm font-bold text-gray-800 uppercase bg-gray-100 border-b-2 border-black'>
                            <tr>
                                <th scope='col' className='hidden sm:table-cell px-6 py-4 text-left'>
                                    著者名
                                </th>
                                <th scope='col' className='px-6 py-4 text-left'>
                                    ブログタイトル
                                </th>
                                <th scope='col' className='px-6 py-4 text-left'>
                                    日付
                                </th>
                                <th scope='col' className='px-6 py-4 text-center'>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className='px-6 py-20 text-center text-gray-500'>
                                        ブログがありません
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((item, index) => {
                                    return <BlogTableItem 
                                        key={index} 
                                        mongoId={item._id} 
                                        title={item.title} 
                                        author={item.author} 
                                        authorImg={item.authorImg} 
                                        date={item.date} 
                                        deleteBlog={deleteBlog} 
                                    />
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Page