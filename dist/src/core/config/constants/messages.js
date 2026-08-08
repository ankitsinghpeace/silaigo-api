"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptMessages = exports.messages = void 0;
exports.messages = {
    GET_FAILURE: 'Error while fetching data.',
    GET_SUCCESS: 'Data Fetched Successfully.',
    GET_FAIL: 'Error while fetching data.',
    POST_SUCCESS: 'Data Saved Successfully.',
    POST_FAILURE: 'Error while saving data.',
    PUT_SUCCESS: 'Data Updated Successfully.',
    PUT_FAILURE: 'Error while Updating Data.',
};
exports.interceptMessages = {
    GET: exports.messages.GET_SUCCESS,
    PUT: exports.messages.PUT_SUCCESS,
    POST: exports.messages.POST_SUCCESS,
};
//# sourceMappingURL=messages.js.map