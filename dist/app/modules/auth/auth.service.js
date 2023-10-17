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
exports.AuthUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const auth_utils_1 = require("./auth.utils");
// const createAdminAuthUser = async (data: Admin): Promise<Partial<Admin>> => {
//   await beforeAdminSave(data);
//   // console.log(afterHash);
//   const result = await prisma.admin.create({
//     data, // Ensure the correct type here,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       password: false,
//       role: true,
//     },
//   });
//   return result;
// };
// const createAuthUser = async (data: User): Promise<Partial<User>> => {
//   await beforeUserSave(data);
//   // console.log(afterHash);
//   const result = await prisma.user.create({
//     data, // Ensure the correct type here,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       password: false,
//       role: true,
//     },
//   });
//   console.log(result);
//   return result;
// };
const createAuthUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_utils_1.beforeUserSave)(data);
    console.log(data);
    const email = data.email;
    const atIndex = email.indexOf('@'); // Find the position of the '@' symbol
    const username = email.slice(0, atIndex); // Extract the username
    // Create a Prisma transaction
    const result = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        // Create a Profile
        const profile = yield transaction.profile.create({
            data: {
                username: username,
            },
        });
        console.log('profile', profile);
        // Create a User and associate it with the Profile
        const user = yield transaction.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                profileId: profile.id, // Associate the User with the Profile
                // Add other user data
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        console.log('user', user);
        return user;
    }));
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExsist = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!isUserExsist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exsist');
    }
    if (isUserExsist.password &&
        !(yield auth_utils_1.UserModel.isPasswordMatched(password, isUserExsist === null || isUserExsist === void 0 ? void 0 : isUserExsist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { id: userId, email: emailId, role } = isUserExsist;
    //Token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, emailId, role, password }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, emailId, password }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    jwtHelpers_1.jwtHelpers.verifyToken(accessToken, config_1.default.jwt.secret);
    return { accessToken, refreshToken };
});
// const loginAdminUser = async (
//   payload: ILoginUser,
// ): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;
//   const isUserExsist = await prisma.admin.findFirst({
//     where: {
//       email,
//     },
//   });
//   if (!isUserExsist) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `No admin account exsist with this email: ${email}`,
//     );
//   }
//   if (
//     isUserExsist.password &&
//     !(await UserModel.isPasswordMatched(password, isUserExsist?.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }
//   const { id: userId, email: emailId, role } = isUserExsist;
//   //Token
//   const accessToken = jwtHelpers.createToken(
//     { userId, emailId, role, password },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userId, emailId, password },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );
//   jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
//   return { accessToken, refreshToken };
// };
// const loginSuperAdminUser = async (
//   payload: ILoginUser,
// ): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;
//   const isUserExsist = await prisma.superAdmin.findFirst({
//     where: {
//       email,
//     },
//   });
//   if (!isUserExsist) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `No super admin account exsist with this email: ${email}`,
//     );
//   }
//   if (
//     isUserExsist.password &&
//     !(await UserModel.isPasswordMatched(password, isUserExsist?.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }
//   const { id: userId, email: emailId, role } = isUserExsist;
//   //Token
//   const accessToken = jwtHelpers.createToken(
//     { userId, emailId, role, password },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userId, emailId, password },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );
//   jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
//   return { accessToken, refreshToken };
// };
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    // invalid token
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        // verifiedToken = jwt.verify(token, config.jwt.refresh_secret as Secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { emailId } = verifiedToken;
    console.log(emailId);
    const isUserExsist = yield auth_utils_1.UserModel.isUserExist(emailId);
    //Generate new token
    if (!isUserExsist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exsist');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExsist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthUserService = {
    createAuthUser,
    // createAdminAuthUser,
    loginUser,
    refreshToken,
    // loginAdminUser,
    // loginSuperAdminUser,
};
