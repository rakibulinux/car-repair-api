"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.updateReviewZodSchema), review_controller_1.ReviewController.updateSingleReview);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.createReview);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewController.getSingleReview);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewController.deleteSingleReview);
router.get('/', review_controller_1.ReviewController.getAllReviews);
exports.ReviewRoute = router;
