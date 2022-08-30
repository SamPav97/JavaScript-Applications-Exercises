import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemp = () => html`
                <a href="/browseTeams" class="action">Browse Teams</a>
                <a href="/login" class="action" style="display: ${localStorage.user ? 'none': 'inline'}">Login</a>
                <a href="/register" class="action" style="display: ${localStorage.user ? 'none': 'inline'}">Register</a>
                <a href="/myTeams" class="action" style="display: ${localStorage.user ? 'inline': 'none'}">My Teams</a>
                <a href="/logout" class="action" style="display: ${localStorage.user ? 'inline': 'none'}">Logout</a>
` 

export function navDisp() {
    render(navTemp(), document.querySelector('nav'))
}



// <!-- <a href="/browseTeams" class="action">Browse Teams</a>
// <a href="/login" class="action">Login</a>
// <a href="/register" class="action">Register</a>
// <a href="/myTeams" class="action">My Teams</a>
// <a href="/logout" class="action">Logout</a> -->