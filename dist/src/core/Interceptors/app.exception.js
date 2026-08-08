"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        var _a, _b, _c, _d;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const { method, originalUrl, body, params, requestId } = request;
        const logMessage = `${method} ${originalUrl} params:${JSON.stringify(params)} request-body:${JSON.stringify(body)}
    error-stack:${exception === null || exception === void 0 ? void 0 : exception.stack}`;
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, message = 'Internal Server Error', error = exception;
        statusCode =
            ((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.statusCode) ||
                (exception === null || exception === void 0 ? void 0 : exception.status) ||
                common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        message =
            ((_b = exception === null || exception === void 0 ? void 0 : exception.response) === null || _b === void 0 ? void 0 : _b.message) ||
                (exception === null || exception === void 0 ? void 0 : exception.message) ||
                'Internal Server Error';
        error = ((_c = exception === null || exception === void 0 ? void 0 : exception.response) === null || _c === void 0 ? void 0 : _c.error) || ((_d = exception === null || exception === void 0 ? void 0 : exception.response) === null || _d === void 0 ? void 0 : _d.message);
        response.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            error: error,
            data: {},
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=app.exception.js.map