/**
 * Cache string function
 * @param fn
 */
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
    const cache: Record<string, string> = Object.create(null);
    return ((str: string) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    }) as any;
};

/**
 * @private
 */
const camelizeRE = /-(\w)/g;

export const camelize = cacheStringFunction((str: string): string => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

/**
 * Capitalize first letter of provided text
 * @param {String} text
 */
export const capitalize = cacheStringFunction(
    (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
);

/**
 * Pluralize word
 * @param word
 * @param count
 * @param suffix
 */
export const pluralize = (word: string, count = 1, suffix = "s"): string => {
    return count <= 1 ? word : `${word}${suffix}`;
};

/**
 * Truncate text if text length longer than a value
 * @param str
 * @param limit
 * @param text
 */
export const truncate = (str: string, limit: number, text = "..."): string => {
    if (str.length > limit) {
        return `${str.substring(0, limit)} ${text}`;
    }

    return str;
};

/**
 * Trim space and remove all double space or more inside
 * @param text
 */
export const trimSpace = (text: string): string => {
    return text.replace(/\s{2,}/g, " ").trim();
};
