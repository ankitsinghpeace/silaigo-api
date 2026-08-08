"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cls = require("cls-hooked");
const uuid_1 = require("uuid");
let RequestContextMiddleware = class RequestContextMiddleware {
    constructor() {
        this.RequestContext = cls.createNamespace('request');
    }
    use(req, res, next) {
        var _a, _b, _c, _d, _e;
        const requestId = req.headers['x-request-id'] || (0, uuid_1.v4)();
        const userId = ((_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id) || 'unknown-user';
        const leadId = ((_b = req.body.user) === null || _b === void 0 ? void 0 : _b.leadId) || 'unknown-lead';
        const sub = ((_c = req.body.user) === null || _c === void 0 ? void 0 : _c.sub) || 'unknown-sub';
        const type = ((_d = req.body.user) === null || _d === void 0 ? void 0 : _d.type) || 'unknown-type';
        const email = ((_e = req.body.user) === null || _e === void 0 ? void 0 : _e.email) || 'unknown-email';
        this.RequestContext.run(() => {
            this.RequestContext.set('requestId', requestId);
            this.RequestContext.set('userId', userId);
            this.RequestContext.set('sub', sub);
            this.RequestContext.set('type', type);
            this.RequestContext.set('email', email);
            console.log(`RequestContextMiddleware: Request ID: ${requestId}, User ID: ${userId}, Sub: ${sub}`);
            next();
        });
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware;
exports.RequestContextMiddleware = RequestContextMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestContextMiddleware);
//# sourceMappingURL=requestContext.middleware.js.map