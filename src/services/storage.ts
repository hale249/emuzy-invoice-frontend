// Define default cache time
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * Create storage
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
    /**
     * Constant storage
     * @class Storage
     */
    const Storage = class {
        private storage = storage;
        private prefixKey?: string = prefixKey;

        private getKey(key: string) {
            return `${this.prefixKey}${key}`.toUpperCase();
        }

        /**
         * @description
         * @param {string} key
         * @param {*} value
         * @param expire
         */
        set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
            const stringData = JSON.stringify({
                value,
                expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
            });
            this.storage.setItem(this.getKey(key), stringData);
        }

        /**
         * @param {string} key
         * @param {*=} def
         */
        get<T = any>(key: string, def: any = null): T {
            const item = this.storage.getItem(this.getKey(key));
            if (item) {
                try {
                    const data = JSON.parse(item);
                    const { value, expire } = data;
                    // Check expire
                    if (expire === null || expire >= Date.now()) {
                        return value;
                    }
                    this.remove(this.getKey(key));
                } catch (e) {
                    return def;
                }
            }
            return def;
        }

        /**
         *
         * @param {string} key
         */
        remove(key: string) {
            // console.log(key, '搜索');
            this.storage.removeItem(this.getKey(key));
        }

        /**
         * 清空所有缓存
         * @memberOf Cache
         */
        clear(): void {
            this.storage.clear();
        }

        /**
         * Set cookie
         * @param {string} name cookie
         * @param {*} value cookie
         * @param {number=} expire
         * @example
         */
        setCookie(name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
            document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
        }

        /**
         * Get Cookie
         * @param name
         */
        getCookie(name: string): string {
            const cookieArr = document.cookie.split('; ');
            for (let i = 0, length = cookieArr.length; i < length; i++) {
                const kv = cookieArr[i].split('=');
                if (kv[0] === this.getKey(name)) {
                    return kv[1];
                }
            }
            return '';
        }

        /**
         * Remove cookie
         * @param {string} key
         */
        removeCookie(key: string) {
            this.setCookie(key, 1, -1);
        }

        // Clear cookie
        clearCookie(): void {
            const keys = document.cookie.match(/[^ =;]+(?==)/g);
            if (keys) {
                for (let i = keys.length; i--; ) {
                    document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`;
                }
            }
        }
    };
    return new Storage();
};

export const Storage = createStorage();

export default Storage;