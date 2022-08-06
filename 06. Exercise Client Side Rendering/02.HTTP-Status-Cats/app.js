import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

let container = document.getElementById('allCats');

let template = (cat, start) => html`<li>
<img src="${cat.imageLocation}" width="250" height="250" alt="Card image cap">
<div class="info">
    <button @click=${start} class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`

start();

function start() {
    let cittens = cats.map(a => template(a, showMore));
    const templateUl = () => html`<ul>${cittens}</ul>`
    let temp = templateUl()
    render(temp, container)

}

function showMore(e) {
    let button = e.currentTarget
    let x = button.parentElement;
    let cat = x.querySelector('div')

    if(button.textContent == 'Show status code') {
        cat.style.display = 'block';
        button.textContent = 'Hide status code';
    } else {
        cat.style.display = 'none';
        button.textContent = 'Show status code';
    }
}