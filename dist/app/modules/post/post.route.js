"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_controller_1 = require("./post.controller");
const post_validation_1 = require("./post.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(post_validation_1.PostValidation.updatePostZodSchema), post_controller_1.PostController.updateSinglePost);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(post_validation_1.PostValidation.createPostZodSchema), post_controller_1.PostController.createPost);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), post_controller_1.PostController.getSinglePost);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), post_controller_1.PostController.deleteSinglePost);
router.get('/', post_controller_1.PostController.getAllPosts);
exports.PostRoute = router;
