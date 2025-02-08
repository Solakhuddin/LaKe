import express from "express";
import userController from "../controller/user-controller.js";
import incomeController from "../controller/income-controller.js";
import spendController from "../controller/spend-controller.js";
import monthlyController from "../controller/monthly-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Income API
userRouter.post('/api/incomes', incomeController.create);
userRouter.get('/api/incomes/:incomeId', incomeController.get);
userRouter.put('/api/incomes/:incomeId', incomeController.update);
userRouter.delete('/api/incomes/:incomeId', incomeController.remove);
userRouter.get('/api/incomes', incomeController.search);

// Spend API
userRouter.post('/api/spends', spendController.create);
userRouter.get('/api/spends/:spendId', spendController.get);
userRouter.put('/api/spends/:spendId', spendController.update);
userRouter.delete('/api/spends/:spendId', spendController.remove);
userRouter.get('/api/spends', spendController.search);

// Monthly Report API
userRouter.get('/api/report', monthlyController.search);

export {
    userRouter
}