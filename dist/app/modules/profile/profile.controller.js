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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const profile_service_1 = require("./profile.service");
const getSingleProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers.authorization;
    if (accessToken) {
        const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(accessToken, config_1.default.jwt.secret);
        const result = yield profile_service_1.ProfileService.getSingleProfile(decodedToken);
        // console.log(result);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `${result
                ? 'Get A Single Profile Successfully!'
                : `No Profile Find For This ID: ${req.params.id}`}`,
            data: result,
        });
    }
}));
const updateSingleProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield profile_service_1.ProfileService.updateSingleProfile(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Updated Successfully!',
        data: result,
    });
}));
// const updateSingleProfile = catchAsync(async (req: Request, res: Response) => {
//   const accessToken: string | undefined = req.headers.authorization;
//   if (accessToken) {
//     const decodedToken = jwtHelpers.verifyToken(
//       accessToken,
//       config.jwt.secret as Secret,
//     );
//     console.log(decodedToken);
//     const result = await ProfileService.updateSingleProfile(decodedToken);
//     sendResponse<User>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `${
//         result
//           ? 'Get A Single Profile Successfully!'
//           : `No Profile Find For This ID: ${req.params.id}`
//       }`,
//       data: result,
//     });
//   }
// });
exports.ProfileController = {
    getSingleProfile,
    updateSingleProfile,
};
