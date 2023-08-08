import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './orders.interface';

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const User = model<IOrder, OrderModel>('Order', OrderSchema);
