/*
this helper function will inject same key and same value into the every object in the passed array.

*/

import { isObject } from './isObject';

interface IParams {
  arrayOfObjects: any[];
  newEntries: any;
}

export const injectSameEntriesIntoObjects = ({
  arrayOfObjects,
  newEntries,
}: IParams) => {
  const arrLength = arrayOfObjects.length;
  // check if array is empty or null or falsy value
  if (!arrLength) {
    throw new Error(
      'Error from injectKeyValueIntoObject(). array of object is null.'
    );
  }

  const result: any[] = [];

  for (let i = 0; i < arrLength; i++) {
    const prevEntries = arrayOfObjects[i];
    if (!isObject(prevEntries)) {
      throw new Error(
        `Error from injectKeyValueIntoObject(). Element of ${i} index from passed array is not an  literal object.`
      );
    }

    const obj = {
      ...prevEntries,
      ...newEntries,
    };
    result.push(obj);
  }

  return result;
};
