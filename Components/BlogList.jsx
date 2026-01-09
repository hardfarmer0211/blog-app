import { blog_data } from "../assets/assets";
import React, { useEffect, useState }  from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] =useState([]);

    const fetchBlogs = async () =>{
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }
    

    useEffect(()=>{
        fetchBlogs();
    },[])

    


    return (
        <div>
            <div className="flex justify-center gap-[10px] my-[20px]">
                <button onClick={()=>setMenu('All')} className={menu==="All"?"bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow-md":""}>ALL</button>
                <button onClick={()=>setMenu('Technology')} className={menu==="Technology"?"bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow-md":""}>Technology</button>
                <button onClick={()=>setMenu('Startup')} className={menu==="Startup"?"bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow-md":""}>Startup</button>
                <button onClick={()=>setMenu('Lifestyle')} className={menu==="Lifestyle"?"bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow-md":""}>Lifestyle</button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-16 xl:mx-24">
                {blogs.filter((item)=> menu==="All"?true:item.category===menu ).map((item, index)=>{
                    return <BlogItem key={index}  id={item._id} image={item.image} title={item.title} description={item.description} category={item.category}/>
                })}
            </div>
        </div>
    )

}

export default BlogList