"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const service_route_1 = require("../modules/service/service.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_route_1.UserRoute,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoute,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
