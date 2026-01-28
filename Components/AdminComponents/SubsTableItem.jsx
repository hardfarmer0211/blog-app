import React from 'react'

const SubsTableItem = ({email, mongoId, deleteEmail, date}) => {
    const emailDate = new Date(date);

    return (
        <tr className='
            bg-white border-b border-gray-200
            transition-all duration-200
            hover:bg-gray-50
        '>
            {/* EMAIL */}
            <th scope='row' className='
                px-6 py-4 
                font-medium text-gray-800
                text-left
            '>
                <p className='truncate max-w-[300px]'>{email ? email : "メールなし"}</p>
            </th>
            
            {/* DATE */}
            <td className='hidden sm:table-cell px-6 py-4 text-gray-600'>
                {emailDate.toLocaleDateString('ja-JP')}
            </td>
            
            {/* DELETE BUTTON */}
            <td className='px-6 py-4'>
                <button
                    onClick={() => deleteEmail(mongoId)}
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

export default SubsTableItem