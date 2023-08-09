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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowsService = void 0;
const paginationHelper_1 = require("../../helpers/paginationHelper");
const cow_model_1 = require("./cow.model");
const cows_constant_1 = require("./cows.constant");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newCow = yield cow_model_1.Cow.create(payload);
    return newCow;
});
const getAllCows = (filters, paginationOptions, minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cows_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        andConditions.push({
            price: { $gte: minPrice, $lte: maxPrice },
        });
    }
    else if (minPrice !== undefined) {
        andConditions.push({
            price: { $gte: minPrice },
        });
    }
    else if (maxPrice !== undefined) {
        andConditions.push({
            price: { $lte: maxPrice },
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(id);
    return cow;
});
const updateCowById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_model_1.Cow.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedCow;
});
const deleteCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCow = yield cow_model_1.Cow.findByIdAndDelete(id);
    return deletedCow;
});
exports.CowsService = {
    createCow,
    getAllCows,
    getCowById,
    updateCowById,
    deleteCowById,
};
