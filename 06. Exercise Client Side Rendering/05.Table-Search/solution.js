import {html, render} from '../node_modules/lit-html/lit-html.js';
import {data} from './data.js'
const inp = document.getElementById('searchField');

onStart()

function onStart() {
let container = document.querySelector('tbody');
document.getElementById('searchBtn').addEventListener('click', onSearch)

const emails = (person) => html`<tr class=${searchInclude(person)}>
<td>${person.firstName} ${person.lastName}</td>
<td>${person.email}</td>
<td>${person.course}</td>
</tr>`

let toDisplay = Object.values(data);
let temp = toDisplay.map(emails);

render(temp, container);
}
function onSearch() {
   onStart()
   inp.value = ''
}
function searchInclude(obj){
   let values = Object.values(obj).find(a => a.includes(inp.value));
   if(inp.value != '' && values){
      return 'select'
   } else {
      return ''
   }
}

// function solve() {
//    document.querySelector('#searchBtn').addEventListener('click', onClick);
//    function onClick() {
//       //   TODO:

//    }
// }
