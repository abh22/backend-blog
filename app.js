import express from "express";
import mongoose from "mongoose"
const app= express();

mongoose.connect('mongodb+srv://farah:soumohche@cluster0.dpv6zqf.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=> app.listen(3000))
.then(()=> console.log("Connected to database and listening on port 3000"))
.catch((err)=>console.log(err));

