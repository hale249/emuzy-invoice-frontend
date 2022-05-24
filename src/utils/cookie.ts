import Cookies from 'js-cookie';
export default class Cookie {
    static setCookie(key: string, data: string, isString = false) {
        return Cookies.set(key, isString ? JSON.stringify(data) : data)
    }

    static getCookie(key: string, isParse = false) {
        return isParse ? JSON.parse(Cookies.get(key) as string) : Cookies.get(key)
    }

    static removeCookie(key: string) {
        return Cookies.remove(key)
    }
}