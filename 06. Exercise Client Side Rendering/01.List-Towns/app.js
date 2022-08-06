import { html, render } from '../node_modules/lit-html/lit-html.js';
let location = document.getElementById('root');
let towns = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', onClick);


function onClick(e) {
    e.preventDefault()
    let lstTowns = towns.value.split(', ')
    let townsTemplate = (town) => html`<li>${town}</li>`;

    let townsHtml = lstTowns.map(townsTemplate);

    const template = () => html`<ul>${townsHtml}</ul>` //have anpther render within see victor video.
    let temp = template()
    render(temp, location)
}
