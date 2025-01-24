import express from 'express'
import { cancelOrder, listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderControllers.js';
import authMiddleware from '../middlewares/auth.js'
const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleware, userOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)
orderRouter.post('/cancel',cancelOrder)


export default orderRouter