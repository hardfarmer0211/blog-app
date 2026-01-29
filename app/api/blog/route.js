import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { put, del } from '@vercel/blob';

// API endpoint to get all blogs
export async function GET(request) {
  await ConnectDB();

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// API endpoint for uploading blog with Vercel Blob
export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, msg: "No image provided" },
        { status: 400 }
      );
    }

    // Upload image to Vercel Blob
    const blob = await put(image.name, image, {
      access: 'public',
      addRandomSuffix: true, // Tự động thêm random string để tránh trùng tên
    });

    // Create blog data with Blob URL
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: blob.url, // ← URL từ Vercel Blob
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ 
      success: true, 
      msg: "Blog Added",
      imageUrl: blob.url 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, msg: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}

// API endpoint to delete blog
export async function DELETE(request) {
  try {
    await ConnectDB();
    
    const id = request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete image from Vercel Blob
    if (blog.image && blog.image.includes('vercel-storage.com')) {
      try {
        await del(blog.image);
      } catch (error) {
        console.error('Error deleting blob:', error);
        // Continue anyway - xóa blog ngay cả khi xóa ảnh thất bại
      }
    }

    // Delete blog from database
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      msg: "Blog Deleted" 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, msg: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}