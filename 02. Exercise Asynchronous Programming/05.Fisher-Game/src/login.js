
document.getElementById('logout').style.display = 'none';



let buttonLogIn = document.querySelector('button');
buttonLogIn.addEventListener('click', onLogIn);

async function onLogIn() {
    let form = document.querySelector('form');

    let formData = new FormData(form);
    let email = formData.get('email').trim();
    let password = formData.get('password').trim();


    try {
        if (email == '' || password == '') {
            throw new Error('Fields cannot be empty!')
        }
        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (response.ok == false) {
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
    } catch (err) {
        alert(err.message);
    }
}