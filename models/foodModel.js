import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        requird: true
    },
    description:{
        type:String,
        requird: true
    },
    price:{
        type:Number,
        requird: true
    },
    image:{
        type:String,
        requird: true
    },
    category:{
        type:String,
        requird: true
    }
})

const foodModel =mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel
