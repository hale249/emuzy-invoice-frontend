export const randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}


export function clone(source: any): any {
    if (Array.isArray(source)) {
        const target: any = source.slice().map(clone);
        const targetKeys = Object.keys(target);

        Object.keys(source)
            .filter((key) => !targetKeys.includes(key))
            .forEach((key) => {
                target[key] = source[key as any];
            });

        return target;
    } else if (typeof source === 'object') {
        return Object.keys(source).reduce((acc: any, key) => {
            acc[key] = clone(source[key]);

            return acc;
        }, {});
    }

    return source;
}

export function objToParams<T>(obj: T): string {
    let url = ''
    for (const [key, val] of Object.entries(obj)) {
        url += `&${key}=${encodeURIComponent(val as any)}`
    }
    return url.replace(/&/, '?')
}