
document.getElementById('user').style.display = 'none';
document.getElementsByClassName('email')[0].style.display = 'none';


let button = document.querySelector('button');
let form = document.getElementById('registerForm');

button.addEventListener('click', onRegister);

async function onRegister(e) {
    e.preventDefault();

    let formData = new FormData(form);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeat = formData.get('rePass');

    if(email == '' || password == '' || repeat == '') {
        alert('One or more fields are empty!');
        return
    }

    if(password != repeat) {
        alert('Password and Repeat must be the same!')
        return
    }
    try{
    let response = await fetch(`http://localhost:3030/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if(response.ok == false){
        const error = await response.json();
        throw new Error(error.message);
    }

    let data = await response.json();

    const userData = {
        email: data.email,
        id: data._id,
        token: data.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));

    window.location = 'index.html';
}catch(err) {
    alert(err.message);
}
}


