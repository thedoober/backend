import mongoose from "mongoose"

export const connectDB = async()=>{
     await mongoose.connect('mongodb+srv://FullStack:Stack766@cluster0.e12yo.mongodb.net/Food-ode').then(()=>{
        console.log('Mongodb connected');
     })
}