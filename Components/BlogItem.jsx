import React from "react";
import Image from "next/image";
import { assets, blog_data } from "../assets/assets";
import Link from "next/link";

const BlogItem = ({title, description, category, image, id}) => {
  const blog = blog_data[0]; // test với blog đầu tiên

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black rounded-md overflow-hidden hover:shadow-[-7px_7px_0px_#000000] transition-shadow duration-200">
      <Link href={`/blogs/${id}`}>
        <div className="relative w-full h-[200px] border-b border-black">
          <Image
            src={image}
            alt="Blog thumbnail"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Category nằm dưới ảnh, trong phần trắng */}
      <div className="p-4">
        <p className="inline-block px-2 py-1 bg-black text-white text-sm rounded-sm">{category}</p>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">{description}</p>
        <Link href={`/blogs/${id}`} className="inline-flex item-center py-2 font-semibold text-center">
            Read more <Image src={assets.arrow} className="ml-2" alt="" height={2} width={20} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;