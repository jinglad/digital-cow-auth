"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        default: 'seller',
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    budget: {
        type: Number,
        default: 0,
    },
    income: {
        type: Number,
        default: 0,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.User = (0, mongoose_1.model)('User', UserSchema);
