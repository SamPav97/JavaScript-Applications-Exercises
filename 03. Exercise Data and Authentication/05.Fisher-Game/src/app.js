let userData = null;
let allDels = [];
let allEdits = [];

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.getElementById('welcome').textContent = `Welcome, ${userData.email}`
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('welcome').style.display = 'none';
    }
})

document.getElementsByClassName('load')[0].addEventListener('click', onLoad);

let catchesList = document.getElementById('catches');
catchesList.innerHTML = '';


async function onLoad() {

    try {
        let response = await fetch('http://localhost:3030/data/catches')

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        let data = await response.json();

        catchesList.innerHTML = '';
        for (const singleCatch of data) {
            //Check that the logged in user created the given catch
            let userOn = (userData && singleCatch._ownerId == userData.id)
            catchesList.innerHTML += ` <div class="catch">
            <label>Angler</label>
            <input type="text" class="angler" value="${singleCatch.angler}" ${!userOn ? 'disabled' : ''}>
            <label>Weight</label>
            <input type="text" class="weight" value="${singleCatch.weight}" ${!userOn ? 'disabled' : ''}>
            <label>Species</label>
            <input type="text" class="species" value="${singleCatch.species}" ${!userOn ? 'disabled' : ''}>
            <label>Location</label>
            <input type="text" class="location" value="${singleCatch.location}" ${!userOn ? 'disabled' : ''}>
            <label>Bait</label>
            <input type="text" class="bait" value="${singleCatch.bait}" ${!userOn ? 'disabled' : ''}>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${singleCatch.captureTime}" ${!userOn ? 'disabled' : ''}>
            <button class="update" data-id=${singleCatch._id} ${!userOn ? 'disabled' : ''}>Update</button>
            <button class="delete" data-id=${singleCatch._id} ${!userOn ? 'disabled' : ''}>Delete</button>
        </div>`
        }
        allDels = Array.from(document.getElementsByClassName('delete'));
        allDels.forEach(element => {
            element.addEventListener('click', onDel)
        });

        allEdits = Array.from(document.getElementsByClassName('update'));
        allEdits.forEach(element => {
            element.addEventListener('click', onEdit)
        });

    } catch (err) {
        alert(err.message)
    }
}

document.querySelector('#addForm .add').addEventListener('click', onAdd);

async function onAdd(e) {
    e.preventDefault();
    let form = document.getElementById('addForm');

    let formData = new FormData(form);
    let angler = formData.get('angler');
    let weight = formData.get('weight');
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');

    if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
        alert('Fields cannot be empty!')
        return
    }
    try {
        let response = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        form.reset();

        onLoad();

    } catch (err) {
        alert(err.message)
    }
}


async function onDel(e) {
    let idToDel = e.target.getAttribute('data-id');

    let response = await fetch(`http://localhost:3030/data/catches/${idToDel}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }
    });

    if (response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }
    onLoad();
}

async function onEdit(e) {
    let currentDiv = e.currentTarget.parentElement;
    let idToEd = e.target.getAttribute('data-id');

    let angler = currentDiv.getElementsByClassName('angler')[0].value;
    let weight = currentDiv.getElementsByClassName('weight')[0].value;
    let species = currentDiv.getElementsByClassName('species')[0].value;
    let location = currentDiv.getElementsByClassName('location')[0].value;
    let bait = currentDiv.getElementsByClassName('bait')[0].value;
    let captureTime = currentDiv.getElementsByClassName('captureTime')[0].value;

    if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
        alert('Fields cannot be empty!')
        return
    }
    try {
        let response = await fetch(`http://localhost:3030/data/catches/${idToEd}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }



    } catch (err) {
        alert(err.message)
    }
}

document.getElementById('logout').addEventListener('click', onLogout);

async function onLogout() {
    try{
    let response = await fetch(`http://localhost:3030/users/logout`);

    sessionStorage.clear();

    window.location = 'index.html';
}catch(err) {
    alert(err.message);
}
}