"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cows/cow.model");
const user_model_1 = require("../users/user.model");
const orders_model_1 = require("./orders.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = order;
    const cowDetails = yield cow_model_1.Cow.findById(cow);
    if (!cowDetails)
        throw new ApiError_1.default(404, 'Cow not found');
    const user = yield user_model_1.User.findById(buyer);
    if (!user)
        throw new ApiError_1.default(404, 'User not found');
    if (user.budget < cowDetails.price) {
        throw new ApiError_1.default(400, 'Not enough money. You need more money to buy this cow.');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedCow = Object.assign(Object.assign({}, cowDetails), { label: 'sold out' });
        const newCow = yield cow_model_1.Cow.findByIdAndUpdate(cow, updatedCow, { session });
        if (!newCow)
            throw new ApiError_1.default(404, 'Failed to update cow');
        const updatedBuyer = Object.assign(Object.assign({}, user), { budget: user.budget - cowDetails.price });
        const buyerUser = yield user_model_1.User.findByIdAndUpdate(buyer, updatedBuyer, {
            session,
        });
        if (!buyerUser)
            throw new ApiError_1.default(404, 'Failed to update buyer budget');
        const seller = yield user_model_1.User.findById(cowDetails.seller);
        if (!seller)
            throw new ApiError_1.default(404, 'Seller not found');
        const updatedSeller = Object.assign(Object.assign({}, seller), { income: seller.income + cowDetails.price });
        const newSeller = yield user_model_1.User.findByIdAndUpdate(cowDetails.seller, updatedSeller, { session });
        if (!newSeller)
            throw new ApiError_1.default(404, 'Failed to update seller income');
        const newOrder = yield orders_model_1.Order.create(order);
        if (!newOrder)
            throw new ApiError_1.default(404, 'Failed to create order');
        yield session.commitTransaction();
        session.endSession();
        return newOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_model_1.Order.find().populate('cow').populate('buyer');
    return orders;
});
const getOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_model_1.Order.findById(id).populate('cow').populate('buyer');
    if (!order)
        throw new ApiError_1.default(404, 'Order not found');
    return order;
});
exports.orderService = {
    createOrder,
    getOrders,
    getOrder,
};
