
import mongoose from "mongoose";
import Blog from "../models/blog";
import User from "../models/user";

export const getAllBlogs= async(req,res,next)=>{
    let blogs;
    try{
blogs= await Blog.find();
    }catch(err){
       return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({Message:"No blogs found"})
    }
return res.status(200).json({blogs})
}

export const addBlog= async(req,res,next)=>{
    const{title,description,image,user}=req.body;
    let existingUser;
    try{
        existingUser= await User.findById(user);
    }catch(err){
        return console.log(err);
     }

    if(!existingUser){
        return res.status(400).json({message:"Unable to find user with this id"})
    }
    const newBlog=new Blog({
        title,description,image,user
    });
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await newBlog.save({session});
       existingUser.blogs.push(newBlog);
       await existingUser.save({session});
       await session.commitTransaction();

    }catch(err){
         console.log(err);
         return res.status(500).json({message:err})
     }
     return res.status(200).json({newBlog})
}

export const updateBlog = async(req,res,next)=>{
    const{title,description,image}=req.body;
    const blogId=req.params.id;
    let updatedBlog;
    try{ updatedBlog = await Blog.findByIdAndUpdate(blogId,{
       title,
       description,
       image,
    })
}catch(err){
    return console.log(err);

}
if(!updatedBlog){
    return res.status(500).json({message:"Unable to update"})
}

return res.status(200).json({updatedBlog})
}

export const getBlogById= async(req,res,next)=>{
    const blogId=req.params.id;
    let searchedBlog;
    try{
        searchedBlog= await Blog.findById(blogId)
    }catch(err){
        return console.log(err);
    
    }
    if(! searchedBlog){
        return res.status(500).json({message:"Unable to find blog"})
    }
    return res.status(200).json({searchedBlog})

}

export const deleteBlog= async(req,res,next)=>{
    const blogId=req.params.id;
    let searchedBlog;
    try{
        searchedBlog= await Blog.findByIdAndRemove(blogId)
    }catch(err){
        return console.log(err);
    
    }
    if(! searchedBlog){
        return res.status(400).json({message:"Unable to delete blog"})
    }
    return res.status(200).json({message:"Blog successfully deleted"})

}

