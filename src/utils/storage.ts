export default class Storage {
    static setItem(key: string, value: string): void {
        return localStorage.setItem(key, value);
    }

    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    static removeLocalStorage(key: string) {
        return localStorage.removeItem(key)
    }
}