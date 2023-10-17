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
exports.beforeUserSave = exports.UserModel = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const prisma = new client_1.PrismaClient();
exports.UserModel = {
    isUserExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findFirst({
                where: {
                    email,
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    password: true,
                },
            });
            return user || null;
        });
    },
    isPasswordMatched(givenPassword, savedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(givenPassword, savedPassword);
            }
            catch (error) {
                return false;
            }
            // return givenPassword === savedPassword;
        });
    },
};
const beforeUserSave = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password) {
        const saltRounds = Number(config_1.default.bcrypt_salt_rounds);
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        user.password = hashedPassword;
    }
});
exports.beforeUserSave = beforeUserSave;
// export const beforeUserSave = async (user: User): Promise<User | undefined> => {
//   if (user.password) {
//     const saltRounds = Number(config.bcrypt_salt_rounds);
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     user.password = hashedPassword;
//     return user;
//   }
// };
