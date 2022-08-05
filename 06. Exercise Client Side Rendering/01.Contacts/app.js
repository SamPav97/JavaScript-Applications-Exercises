import { contacts } from './contacts.js';
import { render, html } from './node_modules/lit-html/lit-html.js';

const template = (contact) => html`<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn">Details</button>
    <div class="details" id="1">
        <p>Phone number: ${contact.phoneNumber}</p>
        <p>Email: ${contact.email}</p>
    </div>
</div>
</div>`

start();

function start() {
    const mainDiv = document.querySelector('#contacts');

    render(contacts.map(template), mainDiv)
}
