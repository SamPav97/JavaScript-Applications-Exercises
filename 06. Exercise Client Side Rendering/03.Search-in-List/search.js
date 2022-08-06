import {html, render} from '../node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';
let content = document.getElementById('searchText');
let button = document.querySelector('button');
button.addEventListener('click', onSearch)

search()

function search() {
   let div = document.getElementById('towns');

   const data = (town) => html`<li class=${checkIncludes(town)}>${town}</li>`;

   let cities = towns.map(data)

   const templateU1 = () => html`<ul>${cities}</ul>`

   const temp = templateU1();

   render(temp, div)
}

function onSearch(){
 search()
}

function checkIncludes(grad){
   if(content.value.toLowerCase() != '' && grad.toLowerCase().includes(content.value.toLowerCase())) {
      return 'active'
   } else {
      return ''
   }
}


// for matches found do get elements by classname- active. and length the array

