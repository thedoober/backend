import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async(req, res)=>{
    const frontend_urlf =process.env.FRONTEND_URLF
  try{
    const newOrder = new orderModel({
        userId:req.body.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address,
    // status:{type:String, required:true},
    // date:{type:Date, default:Date.now()},
    // payment:{type:Boolean, default:false},
    })
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
      const line_items= req.body.items.map((item)=>({
        price_data:{
            currency:'inr',
            product_data:{
                name:item.name
            },
            unit_amount: item.price*80*100

        },
        quantity: item.quantity
      }))
      line_items.push({
        price_data:{
            currency:'inr',
            product_data:{
                name:"Delivery charges"
            },
            unit_amount: 2*80*100

        },
        quantity: 1
      })
      
      const session = await stripe.checkout.sessions.create({
        line_items : line_items,
        mode:'payment',
        success_url:`${frontend_urlf}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_urlf}/verify?success=false&orderId=${newOrder._id}`,
      })
      // console.log('Hello');
      
      res.json({success:true,session_url:session.url})
    // catch(error){
    //   console.log(error+ "Hello");
    //   return res.json({Success:false, message:"Error"})
      
    

  }catch(error){
console.log(error);
 
  res.json({success:false, message:"Error"})

  }
}
const verifyOrder = async(req, res)=>{
  const {orderId,success} =req.body;
  try{
      if(success == "true"){
        await orderModel.findByIdAndUpdate(orderId, {payment: true});
        res.json({success:true, message: "paid"});
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
        // console.log("Hello2");
        
        res.json({success:false, message:"Not paid"});
      }
  }catch(error){
   console.log(error+ "Hello2");
   res.json({success:false, message: "Error"})
  }
}

const userOrder = async(req, res)=>{
  try {
   const orders = await orderModel.find({userId: req.body.userId})
   res.json({success:true, data:orders})
  }catch(error){
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}
const listOrders = async(req,res)=>{
   try{
    const orders = await orderModel.find({})
    res.json({success:true, data:orders})
   }catch(error){
    console.log(error);
    res.json({success:false, mesage:"Error"})
   }
}
const updateStatus = async(req,res) => {
try{
   await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
   res.json({success:true, message:"Status Updated"})
}catch(error){
  console.log(error);
  res.json({success:false, message:"Error"})
  
}
}
const cancelOrder = async(req, res)=>{
  try{
    console.log(req.body.orderId);
    
   await orderModel.findByIdAndDelete(req.body.orderId)
   return res.json({success:true, message:"order removed successfully"})
  }catch(error){
   console.log(error);
   res.json({success:false, error})
  }
}

export {placeOrder, verifyOrder, userOrder, listOrders,updateStatus, cancelOrder}