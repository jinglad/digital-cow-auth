/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cows/cow.model';
import { Iuser } from '../users/user.interface';
import { User } from '../users/user.model';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrder = async (order: IOrder) => {
  const { cow, buyer } = order;
  const cowDetails = await Cow.findById(cow);
  if (!cowDetails) throw new ApiError(404, 'Cow not found');

  const user = await User.findById(buyer);
  if (!user) throw new ApiError(404, 'User not found');

  if (user.budget < cowDetails.price) {
    throw new ApiError(
      400,
      'Not enough money. You need more money to buy this cow.',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedCow = { ...cowDetails, label: 'sold out' };
    const newCow = await Cow.findByIdAndUpdate(cow, updatedCow, { session });
    if (!newCow) throw new ApiError(404, 'Failed to update cow');
    const updatedBuyer = { ...user, budget: user.budget - cowDetails.price };
    const buyerUser = await User.findByIdAndUpdate(buyer, updatedBuyer, {
      session,
    });
    if (!buyerUser) throw new ApiError(404, 'Failed to update buyer budget');

    const seller = await User.findById(cowDetails.seller);
    if (!seller) throw new ApiError(404, 'Seller not found');

    const updatedSeller = {
      ...seller,
      income: seller.income + cowDetails.price,
    };
    const newSeller = await User.findByIdAndUpdate(
      cowDetails.seller,
      updatedSeller,
      { session },
    );
    if (!newSeller) throw new ApiError(404, 'Failed to update seller income');

    const newOrder = await Order.create(order);
    if (!newOrder) throw new ApiError(404, 'Failed to create order');

    await session.commitTransaction();
    session.endSession();
    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

const getOrders = async () => {
  const orders = await Order.find().populate('cow').populate('buyer');
  return orders;
};

const getOrder = async (id: string) => {
  const order = await Order.findById(id).populate('cow').populate('buyer');
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};

export const orderService = {
  createOrder,
  getOrders,
  getOrder,
};
