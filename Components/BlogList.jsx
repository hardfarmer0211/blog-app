import { blog_data } from "../assets/assets";
import React, { useEffect, useState }  from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
    const [menu, setMenu] = useState("すべて");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    // Category mapping: Japanese → English for filtering
    const categoryMap = {
        'すべて': 'All',
        'テクノロジー': 'Technology',
        'スタートアップ': 'Startup',
        'ライフスタイル': 'Lifestyle'
    };

    const categories = [
        { jp: 'すべて', en: 'All' },
        { jp: 'テクノロジー', en: 'Technology' },
        { jp: 'スタートアップ', en: 'Startup' },
        { jp: 'ライフスタイル', en: 'Lifestyle' }
    ];

    return (
        <div>
            {/* FILTER BUTTONS - JAPANESE */}
            <div className="flex justify-center gap-3 sm:gap-6 my-10 px-5">
                {categories.map((category) => (
                    <button 
                        key={category.jp}
                        onClick={() => setMenu(category.jp)} 
                        className={`
                            relative px-6 py-3 font-bold text-sm sm:text-base
                            border-2 border-black rounded-lg
                            transition-all duration-300 ease-out
                            overflow-hidden
                            ${menu === category.jp
                                ? 'bg-black text-white shadow-[-6px_6px_0px_#ff0000] translate-x-[-2px] translate-y-[-2px]' 
                                : 'bg-white text-black shadow-[-4px_4px_0px_#000000] hover:shadow-[-6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                            }
                            active:shadow-none active:translate-x-0 active:translate-y-0
                        `}
                    >
                        <span className={`
                            absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 
                            transition-opacity duration-300
                            ${menu === category.jp ? 'opacity-20' : 'opacity-0 hover:opacity-10'}
                        `}></span>
                        
                        <span className="relative z-10">{category.jp}</span>
                    </button>
                ))}
            </div>

            {/* BLOG GRID */}
            <div className="flex flex-wrap justify-center gap-6 gap-y-10 mb-16 xl:mx-24 px-5">
                {blogs.filter((item) => {
                    const selectedEnglishCategory = categoryMap[menu];
                    return selectedEnglishCategory === 'All' ? true : item.category === selectedEnglishCategory;
                }).map((item, index) => {
                    return <BlogItem 
                        key={index}  
                        id={item._id} 
                        image={item.image} 
                        title={item.title} 
                        description={item.description} 
                        category={item.category}
                    />
                })}
            </div>
        </div>
    )
}

export default BlogList