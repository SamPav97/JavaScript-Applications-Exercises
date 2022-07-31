//init
// - find rev section

import { showView } from './dom.js';

// - detach section 
const section = document.getElementById('add-movie');
section.remove()

// display logic

export function showCreate() {
    showView(section);
}