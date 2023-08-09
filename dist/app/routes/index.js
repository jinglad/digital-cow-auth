"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cows_route_1 = require("../modules/cows/cows.route");
const user_route_1 = require("../modules/users/user.route");
const orders_route_1 = require("../modules/orders/orders.route");
const auth_route_1 = require("../modules/users/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/cows',
        route: cows_route_1.CowRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/orders',
        route: orders_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
