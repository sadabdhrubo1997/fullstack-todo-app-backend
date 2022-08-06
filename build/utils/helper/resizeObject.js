"use strict";
/*
this function will help you to delete or take only entries mentioned by you.
**note: this function will not modify the main object.**

suppose you have and object like below ->
const obj = {
  name:"your name",
  fathersName:"your fathers name",
  mothersName:"your mothers name",
  address:"your address"
}

you need an object with only "name" and "address". so to do that, you need to follow some steps.
like ->

const resizedObject = resizeObject({src:obj,takeOnly:['name','address']})
console.log(resizedObject) //output -> {name:"your name", address:"your address"}

as like before you can delete any entries with the key . let's see,
const resizedObject2 = resizeObject({src:obj,removeOnly:['name','address']})
console.log(resizedObject2)
//output -> {fathersName:"your fathersName", mothersName:"your mothers name"}

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeObject = void 0;
const isObject_1 = require("./isObject");
function resizeObject({ src, takeOnly = [], removeOnly = [], }) {
    if (!(0, isObject_1.isObject)(src)) {
        throw new Error('Error from resizeObject();. Something without object{} is not resizable by resizeObject() function.');
    }
    if (!Object.keys(src).length) {
        throw new Error('Error from resizeObject();. Your src{} has no keys');
    }
    if (!takeOnly.length && !removeOnly.length) {
        throw new Error('Error from resizeObject();. Please keep any key into takeOnly[] to take of into removeOnly[] to remove');
    }
    if (takeOnly.length && removeOnly.length) {
        throw new Error('Error from resizeObject();. The takeOnly[] and removeOnly[] array cannot contain values together. Only one of them can contain values.');
    }
    const allKeys = [...takeOnly, ...removeOnly];
    const allKeysLength = allKeys.length;
    for (let i = 0; i < allKeysLength; i++) {
        const element = allKeys[i];
        if (typeof element !== 'string') {
            throw new Error(`Error from resizeObject();. Without string anything is not assignable as key into removeOnly[] or takeOnly[]. "${element}" is not a string.`);
        }
    }
    let result = {};
    if (takeOnly.length) {
        for (let i = 0; i < takeOnly.length; i++) {
            const key = takeOnly[i];
            if (!(key in src)) {
                throw new Error(`Error from resizeObject();. key "${key}" does not exists on src{} object`);
            }
            result[key] = src[key];
        }
    }
    if (removeOnly.length) {
        const tempObj = Object.assign({}, src);
        for (let i = 0; i < removeOnly.length; i++) {
            const key = removeOnly[i];
            if (!(key in src)) {
                throw new Error(`Error from resizeObject();. key "${key}" does not exists on src{} object`);
            }
            delete tempObj[key];
        }
        result = tempObj;
    }
    return result;
}
exports.resizeObject = resizeObject;
