export default class Session {
    static setSessionStorage(key: string, data: string) {
        return sessionStorage.setItem(key, data)
    }

    static getSessionStorage(key: string) {
        return sessionStorage.getItem(key)
    }

    static removeSessionStorage(key: string) {
        return sessionStorage.removeItem(key)
    }
}