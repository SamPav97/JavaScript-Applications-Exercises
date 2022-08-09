import {booksIn} from './data.js';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { put } from './api.js';

export function importBooks() {
    let tbody = document.querySelector('tbody');
 const bookTemplate = (book) => html`<tr>
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>
     <button @click="${onEdit}">Edit</button>
     <button>Delete</button>
 </td>
</tr>`

let structure = Object.values(booksIn).map(bookTemplate)
render(structure, tbody);
}

//is this really the best way to edit???
function onEdit(e) {
    let book = e.target.parentElement.parentElement;
    let bookTitle = Array.from(book.children)[0].textContent;
    let bookAuthor = Array.from(book.children)[1].textContent;
    let addForm = document.getElementById('add-form');
    let editForm = document.getElementById('edit-form');
    let formTitle = document.getElementById('formTitle');
    let formAuthor = document.getElementById('formAuthor');
    editForm.addEventListener('submit', onSubmit);
    
    addForm.style.display = 'none';
    editForm.style.display = 'block';

    formTitle.value = bookTitle;
    formAuthor.value = bookAuthor;
    


    function onSubmit(){
        let formData = new FormData(editForm);
        let editedTitle = formData.get('title');
        let editedAuthor = formData.get('author')

        put(`/jsonstore/collections/books/`)

    }
// ive gotta get the id and that means refactoring some stuff. I will do it some other time. I have esentially practiced the library. to solve the rest of the ex there is no more use reallly of the lib
   

}
//add event listeners to buttons and set function
