"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a, _b;
    let errors = [];
    let message = '';
    if ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.includes('invocation:\n\n\nUnique constraint')) {
        message = 'Unique constraint can not be duplicated';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    if (error.code === 'P2025') {
        message = ((_b = error.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Record not found';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    const statusCode = 400;
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
// "\nInvalid `prisma.semesterRegistration.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
