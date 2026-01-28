'use client'

import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/email');
            setEmails(response.data.emails);
        } catch (error) {
            toast.error('購読者の取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }

    const deleteEmail = async (mongoId) => {
        try {
            const response = await axios.delete('/api/email', {
                params: { id: mongoId }
            })
            if (response.data.success) {
                toast.success(response.data.msg);
                fetchEmails();
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error('削除に失敗しました');
        }
    }

    useEffect(() => {
        fetchEmails();
    }, [])

    return (
        <div className='flex-1 px-5 sm:px-12 py-8'>
            {/* HEADING */}
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                    全ての購読者
                </h1>
                <div className='px-4 py-2 bg-black text-white rounded-lg font-semibold'>
                    {emails.length} 件
                </div>
            </div>

            {/* TABLE */}
            <div className='
                relative 
                max-w-3xl
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
                                <th scope='col' className='px-6 py-4 text-left'>
                                    メールアドレス
                                </th>
                                <th scope='col' className='hidden sm:table-cell px-6 py-4 text-left'>
                                    登録日
                                </th>
                                <th scope='col' className='px-6 py-4 text-center'>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className='px-6 py-20 text-center text-gray-500'>
                                        購読者がいません
                                    </td>
                                </tr>
                            ) : (
                                emails.map((item, index) => {
                                    return <SubsTableItem 
                                        key={index} 
                                        mongoId={item._id} 
                                        deleteEmail={deleteEmail} 
                                        email={item.email} 
                                        date={item.date}
                                    />;
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