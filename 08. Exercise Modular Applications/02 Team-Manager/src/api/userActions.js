import { get, post} from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password) {
    const user = await post(endpoints.login, { email, password });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.accessToken);
}

export async function register(email, username, password) {
    const user = await post(endpoints.register, { email, username, password });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
}

export function logout() { //NOT ASYNC U R NOT AWAITING ANYTHING
    get(endpoints.logout);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

