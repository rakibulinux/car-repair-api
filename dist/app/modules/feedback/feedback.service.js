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
exports.FeedbackService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const feedback_constant_1 = require("./feedback.constant");
const createFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.create({
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const getAllFeedbacks = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(pagination);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            OR: feedback_constant_1.feedbackSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.feedback.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortConditions,
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.feedback.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
    return result;
});
const updateSingleFeedback = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.update({
        where: {
            id,
        },
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const deleteSingleFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.FeedbackService = {
    createFeedback,
    getAllFeedbacks,
    getSingleFeedback,
    updateSingleFeedback,
    deleteSingleFeedback,
};
