import { render, html } from '../node_modules/lit-html/lit-html.js';
import { importBooks } from './eventListeners.js';

let main = document.querySelector('body');

export function display() {

    const template = () => html`
<button @click="${importBooks}" id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>

    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input id="formTitle" type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input id="formAuthor" type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>`

    let temp = template()
    render(temp, main)

}
//add event listeners to buttons and set function

