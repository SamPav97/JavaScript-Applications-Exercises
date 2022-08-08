import {html, render} from '../node_modules/lit-html/lit-html.js';
import { requ, send } from './api.js'

const dropDown = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

disp()

async function disp() {
const cities = (obj) => html`<option value=${obj._id}>${obj.text}</option>`
let data = await requ();
let capitals = Object.values(data).filter(a => a.text).map(cities)

render(capitals, dropDown);
}


function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    let text = formData.get('textCity');
    if(text.trim() == ''){
        alert('Name a city!');
        return
    }
    send({text})
    disp()
    form.reset()
}