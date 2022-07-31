//init
// - find rev section

import { showView } from './dom.js';

// - detach section 
const section = document.getElementById('edit-movie');
section.remove()

// display logic

export function showEdit() {
    showView(section);
}