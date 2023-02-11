import user from "../models/user";


export const getAllUsers=async(req,res,next)=>{
    let users;
    try{
       users=await user.find();
    }catch(err){
 console.log(err);
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
    const user= new user({
        name,
        email,
        password,
    })
    try{
       await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({user})
}