"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.CategoryController.updateSingleCategory);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.getSingleCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteSingleCategory);
router.get('/', category_controller_1.CategoryController.getAllCategories);
exports.CategoryRoute = router;
