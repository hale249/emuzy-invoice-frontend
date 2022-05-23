/**
 * Valid key in object
 * @param obj
 * @param key
 */
export const hasOwn = (obj: any, key: string) =>
    typeof obj[key] !== "undefined";

/**
 * Is diff two object
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const isObjectDiff = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
};

/**
 * Is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
};

/**
 * Clone deep
 * @param obj
 * @return {*}
 */
export const cloneDeep = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(cloneDeep);
    } else if (obj && typeof obj === "object") {
        const cloned: any = {};
        const keys = Object.keys(obj);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            cloned[key] = cloneDeep(obj[key]);
        }
        return cloned;
    } else {
        return obj;
    }
};

/**
 * Remove property from object
 * @param key
 * @returns {*}
 */
export const omit = (key: string, { [key]: any, ...obj }): any => {
    return obj;
};
