"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSubType = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var CouponSubType;
(function (CouponSubType) {
    CouponSubType["PRICE_REDUCTION"] = "price-reduction";
    CouponSubType["PERCENTAGE_REDUCTION"] = "percentage-reduction";
})(CouponSubType || (exports.CouponSubType = CouponSubType = {}));
//# sourceMappingURL=payment.enums.js.map