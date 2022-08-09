const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));//note this can sometimes be in session storage

    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const res = await fetch(host + url, options);

        if (res.ok != true) {
            if(res.status == 403){
                localStorage.removeItem('user');
            }
            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

async function get(url) {
    return request('get', url);
}

async function post(url, data) {
    return request('post', url, data);
}

async function put(url, data) {
    return request('put', url, data);
}

async function del(url, data) {
    return request('delete', url, data);
}

export{
    get,
    post,
    put,
    del as delete
}