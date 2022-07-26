let ulBooks = document.querySelector('tbody');
ulBooks.innerHTML = '';

let loadButton = document.getElementById('loadBooks');
loadButton.addEventListener('click', onLoad);

let form = document.querySelector('form');

let titleField = document.querySelectorAll('input')[0];
let authorField = document.querySelectorAll('input')[1];

async function onLoad() {

    if (document.getElementById('saveBut')) {
        document.querySelector('h3').textContent = 'FORM';
        document.getElementById('saveBut').remove();
        let submitBut = document.createElement('button');
        submitBut.id = 'submit';
        submitBut.textContent = 'Submit';
        form.appendChild(submitBut);
        document.getElementById('submit').addEventListener('click', onSubmit);
    }
    ulBooks.innerHTML = '';
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books`);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        for (const [key, book] of Object.entries(data)) {
            ulBooks.innerHTML += `<tr id='${key}'>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button class='edits'>Edit</button>
            <button class='dels'>Delete</button>
        </td>
    </tr>`
        }

    } catch (err) {
        alert(err.message)
    }
    titleField.value = '';
    authorField.value = '';
    let delButtons = Array.from(document.getElementsByClassName('dels'));
    delButtons.forEach(element => element.addEventListener('click', onDel));
    let editButtons = Array.from(document.getElementsByClassName('edits'));
    editButtons.forEach(element => element.addEventListener('click', onEdit));
}



async function onEdit(e) {

    let tr = e.currentTarget.parentElement.parentElement;
    let info = Array.from(tr.children);
    let title = info[0].textContent;
    let author = info[1].textContent;

    titleField.value = title;
    authorField.value = author;

    document.querySelector('h3').textContent = 'Edit FORM';
    document.getElementById('submit').remove();
    let saveButton = document.createElement('button');
    saveButton.id = 'saveBut';
    saveButton.textContent = 'Save';
    form.appendChild(saveButton);

    document.getElementById('saveBut').addEventListener('click', onSave);


    async function onSave(e) {
        e.preventDefault()

        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${tr.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: authorField.value,
                title: titleField.value
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        onLoad()

    }

}




document.getElementById('submit').addEventListener('click', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let author = authorField.value;
    let title = titleField.value;

    if (author == '' || title == '') {
        alert('Fields cannot be empty!')
        onLoad()
        return
    }

    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, title })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch (err) {
        alert(err.message);
    }
    onLoad();
    return
}



async function onDel(e) {
    let tr = e.currentTarget.parentElement.parentElement;

    let promise = await fetch(`http://localhost:3030/jsonstore/collections/books/${tr.id}`, {
        method: 'DELETE'
    })

    if (promise.ok == false) {
        throw new Error();
    }
    onLoad()
}



