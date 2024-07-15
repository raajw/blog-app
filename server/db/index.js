import mongoose from "mongoose";
 

 mongoose.set('strictQuery',false)

  mongoose.connect('mongodb+srv://rajw:rajw123@cluster0.h30ij7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("connected to db")).catch((err)=>console.log(err))

