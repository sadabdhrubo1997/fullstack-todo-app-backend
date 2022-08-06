"use strict";
/*
this helper function will inject same key and same value into the every object in the passed array.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectSameEntriesIntoObjects = void 0;
const isObject_1 = require("./isObject");
const injectSameEntriesIntoObjects = ({ arrayOfObjects, newEntries, }) => {
    const arrLength = arrayOfObjects.length;
    // check if array is empty or null or falsy value
    if (!arrLength) {
        throw new Error('Error from injectKeyValueIntoObject(). array of object is null.');
    }
    const result = [];
    for (let i = 0; i < arrLength; i++) {
        const prevEntries = arrayOfObjects[i];
        if (!(0, isObject_1.isObject)(prevEntries)) {
            throw new Error(`Error from injectKeyValueIntoObject(). Element of ${i} index from passed array is not an  literal object.`);
        }
        const obj = Object.assign(Object.assign({}, prevEntries), newEntries);
        result.push(obj);
    }
    return result;
};
exports.injectSameEntriesIntoObjects = injectSameEntriesIntoObjects;
