'use client'

import Header from "../Components/Header"; // đường dẫn đúng đến Header.jsx
import BlogList from "../Components/BlogList";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <>
    <Header/>

    <BlogList/>

    <Footer/>

    </>
  );
}
