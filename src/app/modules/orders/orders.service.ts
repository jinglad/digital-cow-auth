// import ApiError from '../../../errors/ApiError';
// import { Cow } from '../cows/cow.model';
// import { Iuser } from '../users/user.interface';
// import { IOrder } from './orders.interface';
// import { User } from './orders.model';

// const createOrder = async (order: IOrder) => {
//   // Check that the user has enough money in their account to buy the cow.
//   // If the user needs more money, show them an error message.
//   // If the user has enough money, create the order.

//   const { cow, buyer } = order;
//   const cowDetails = await Cow.findById(cow);
//   if (!cowDetails) throw new ApiError(404, 'Cow not found');
//   const user = await User.findById(buyer);
//   if (!user) throw new ApiError(404, 'User not found');
//   if (user) {
//     const { budget } = user;
//     const { price } = cowDetails;

//     if (budget < price) throw new ApiError(400, 'Not enough money');
//   }
// };
