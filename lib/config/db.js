import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://nguyendan:Hardfarmer0211@cluster0.naekq3e.mongodb.net/blog-app')
    console.log("DB Connected");
}