import express from "express"
import { connectDB } from "./config/db.js"
import cors from 'cors'
import { foodRouter } from "./routes/foodRoutes.js"
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


const app =express()
const port = process.env.PORT;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())  // connect backend from any frontend

// db connection
connectDB();

// api end points
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter);
app.use("/images", express.static('uploads'))
app.use('/api/order',orderRouter);





app.get("/", (req,res)=>{
     res.send("API working")
})
app.listen(port,()=>
 console.log(` server started on http://localhost:${port}`)
)
//mongodb+srv://FullStack:<db_password>@cluster0.8iits.mongodb.net/?