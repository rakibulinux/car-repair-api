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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
const getAllUsers = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(pagination);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    if (Object.keys(filtersData).length) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortConditions,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            profile: true,
            bookings: true,
            reviews: true,
            feedbacks: true,
            posts: true,
            createdAt: true,
            notifications: true,
            updatedAt: true,
        },
    });
    const customerList = result.filter(customer => customer.role === 'customer');
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: customerList,
    };
});
const getAllAdmins = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(pagination);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    if (Object.keys(filtersData).length) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortConditions,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            profile: true,
            bookings: true,
            reviews: true,
            feedbacks: true,
            posts: true,
            createdAt: true,
            notifications: true,
            updatedAt: true,
        },
    });
    const adminList = result.filter(admin => admin.role === 'admin');
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: adminList,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            profile: true,
            bookings: true,
            reviews: true,
            feedbacks: true,
            posts: true,
            createdAt: true,
            notifications: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateSingleUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction((prismaClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userName = data.name;
        const userResult = yield prismaClient.user.update({
            where: {
                id,
            },
            data: {
                name: userName,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                role: true,
                profile: true,
                bookings: true,
                reviews: true,
                feedbacks: true,
                posts: true,
                createdAt: true,
                notifications: true,
                updatedAt: true,
            },
        });
        yield prismaClient.profile.update({
            where: {
                id: (_a = userResult.profile) === null || _a === void 0 ? void 0 : _a.id,
            },
            data: {
                bio: data.bio,
                bloodGroup: data.bloodGroup,
                address: data.address,
                phoneNo: data.phoneNo,
                profileImg: data.profileImg,
                gender: data.gender,
            },
        });
        return userResult;
    }));
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
    });
    return result;
});
exports.UserService = {
    // createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    getAllAdmins,
};
