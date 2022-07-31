//init
// - find rev section

import { showView } from './dom.js';

// - detach section 
const section = document.getElementById('form-sign-up');
section.remove()

// display logic

export function showRegister() {
    showView(section);
}