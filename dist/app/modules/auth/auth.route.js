"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.UserValidation.createUserZodSchema), auth_controller_1.AuthUserController.createAuthUser);
// router.post(
//   '/admin-signup',
//   validateRequest(UserValidation.createAdminUserZodSchema),
//   auth(ENUM_USER_ROLE.SUPERADMIN),
//   AuthUserController.createAdminAuthUser,
// );
router.post('/signin', (0, validateRequest_1.default)(auth_validation_1.UserValidation.loginUserZodSchema), auth_controller_1.AuthUserController.loginUser);
// router.post(
//   '/admin-signin',
//   validateRequest(UserValidation.loginUserZodSchema),
//   AuthUserController.loginAdminUser,
// );
// router.post(
//   '/super-admin-signin',
//   validateRequest(UserValidation.loginUserZodSchema),
//   AuthUserController.loginSuperAdminUser,
// );
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.UserValidation.refreshTokenZodSchema), auth_controller_1.AuthUserController.refreshToken);
exports.AuthRoute = router;
