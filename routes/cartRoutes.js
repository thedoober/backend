import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartControllers.js';
import authMidleware from '../middlewares/auth.js';
const cartRouter = express.Router();

cartRouter.post('/add',authMidleware,addToCart)
cartRouter.post('/remove',authMidleware,removeFromCart)
cartRouter.post('/get',authMidleware,getCart)

export default cartRouter;