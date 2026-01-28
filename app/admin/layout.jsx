import { assets } from "@/assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <ToastContainer theme="dark"/>
                <Sidebar />
                
                <div className="flex flex-col flex-1 w-full">
                    {/* TOP NAVBAR */}
                    <div className="
                        flex items-center justify-between 
                        w-full py-4 px-6 sm:px-12 
                        bg-white
                        border-b-2 border-black
                        shadow-md
                    ">
                        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            管理パネル
                        </h3>
                        
                        <div className="
                            relative
                            w-12 h-12 sm:w-14 sm:h-14
                            rounded-full
                            border-2 border-black
                            overflow-hidden
                            transition-all duration-300
                            hover:scale-110 hover:rotate-6
                            cursor-pointer
                            shadow-[-3px_3px_0px_#000000]
                            hover:shadow-[-5px_5px_0px_#ff0000]
                        ">
                            <Image 
                                src={assets.profile_icon} 
                                fill
                                alt="Profile"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* CONTENT AREA */}
                    <div className="flex-1 bg-gradient-to-br from-gray-50 to-slate-100">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}