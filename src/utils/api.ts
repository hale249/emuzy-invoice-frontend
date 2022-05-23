import process from 'process';
const apis = {
    baseUrl: process.env.API_ENDPOINT || 'https://api.emuzy.xyz/api',

    auth: {
        login: '/login',
        register: '/register',

    }
}
export default apis;