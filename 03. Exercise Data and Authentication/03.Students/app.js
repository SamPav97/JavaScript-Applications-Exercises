let tbody = document.querySelector('tbody');


async function extract() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/students');

    if(response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }

    let data = await response.json();

    tbody.innerHTML = '';

    for (const dataSet of Object.values(data)) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = dataSet.firstName;
        let td2 = document.createElement('td');
        td2.textContent = dataSet.lastName;
        let td3 = document.createElement('td');
        td3.textContent = dataSet.facultyNumber;
        let td4 = document.createElement('td');
        td4.textContent = dataSet.grade;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}

extract()

let form = document.getElementById('form');
document.getElementById('submit').addEventListener('click', onSubmit);

async function onSubmit(e) {
    e.preventDefault()

    console.log(form);

    let formData = new FormData(form);

    let firstName = formData.get('firstName').trim();
    let lastName = formData.get('lastName').trim();
    let facultyNumber = formData.get('facultyNumber').trim();
    let grade = formData.get('grade').trim();

    if(firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        alert('Fields cannot be empty!');
        return
    }

    let response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, facultyNumber, grade})
    })

    if(response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }

    extract();
}

