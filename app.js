
import express from "express";
import mongoose from "mongoose"
import router from "./routes/user-route";
const app= express();


app.use(express.json())
app.use('/api/user',router);

mongoose.connect(process.env.MONGO_URI)
.then(()=> app.listen(3000))
.then(()=> console.log("Connected to database and listening on port 3000"))
.catch((err)=>console.log(err));


