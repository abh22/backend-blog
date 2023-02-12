import user from "../models/user";
import * as bcrypt from 'bcrypt';

export const getAllUsers=async(req,res,next)=>{
    let users;
    try{
       users=await user.find();
    }catch(err){
 return console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"No users found"});

    }
    return res.status(200).json({users})
};
export const signup= async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try{
        existingUser=await user.findOne({email});
    }catch(err){
 console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User already signed up! Login instead"})

    }
    const hashedPassword= bcrypt.hashSync(password);
    const newUser= new user({
        name,
        email,
        password,
        blogs:[],
    })
    try{
       await newUser.save();
    }catch(err){
       return  console.log(err);
    }
    return res.status(201).json({newUser})
}
export const login= async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await user.findOne({email});
    }catch(err){
 return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"No user found with this email, sign up instead"})

    }
    const passwordCorrect =  bcrypt.compareSync(password,existingUser.password)
if (!passwordCorrect){
    return res.status(400).json({message:"Incorect password"})
}
return res.status(200).json({message:"Successful login"})
}