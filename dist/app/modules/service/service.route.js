"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.updateServiceZodSchema), service_controller_1.ServiceController.updateSingleService);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceZodSchema), service_controller_1.ServiceController.createService);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPERADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.getSingleService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.deleteSingleService);
router.get('/', service_controller_1.ServiceController.getAllServices);
exports.ServiceRoute = router;
