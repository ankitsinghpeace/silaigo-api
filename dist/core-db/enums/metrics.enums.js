"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetType = exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType["PAGE_VIEW"] = "page_view";
    ActionType["CATEGORY_VIEW"] = "category_view";
    ActionType["SUBCATEGORY_VIEW"] = "subcategory_view";
    ActionType["STYLE_SELECTED"] = "style_selected";
    ActionType["CUSTOMIZATION_STARTED"] = "customization_started";
    ActionType["ORDER_INITIATED"] = "order_initiated";
    ActionType["ORDER_COMPLETED"] = "order_completed";
    ActionType["LOGIN"] = "login";
    ActionType["LOGOUT"] = "logout";
    ActionType["SIGNUP"] = "signup";
    ActionType["ADD_TO_CART"] = "add_to_cart";
    ActionType["REMOVE_FROM_CART"] = "remove_from_cart";
    ActionType["CHECKOUT_STARTED"] = "checkout_started";
    ActionType["OPTION_SELECTED"] = "option_selected";
})(ActionType || (exports.ActionType = ActionType = {}));
var TargetType;
(function (TargetType) {
    TargetType["CATEGORY"] = "category";
    TargetType["SUBCATEGORY"] = "subcategory";
    TargetType["STYLE"] = "style";
    TargetType["OPTION"] = "option";
    TargetType["BUTTON"] = "button";
    TargetType["FORM"] = "form";
    TargetType["PRODUCT"] = "product";
    TargetType["SECTION"] = "section";
    TargetType["BANNER"] = "banner";
})(TargetType || (exports.TargetType = TargetType = {}));
//# sourceMappingURL=metrics.enums.js.map