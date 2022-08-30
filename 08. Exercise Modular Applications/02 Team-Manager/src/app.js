
import page from '../../node_modules/page/page.mjs';
import { render as litRender } from '../../node_modules/lit-html/lit-html.js';
import { navDisp } from './views/nav.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showBrowseTeams } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showMyteams } from './views/myTeams.js';
import { logout } from './api/userActions.js';
import { showDetails } from './views/details.js';




const main = document.querySelector('main');

page(decorateContext);

page('/index.html', '/');
page('/', showHome);
page('/browseTeams', showBrowseTeams);
page('/createTeam', showCreate);
page('/myTeams', showMyteams);
page('/logout', onLogout);
page('/details/:detailsId', showDetails);//this is a param after ":" u can find it in the href when creating the caralog
page('/register', showRegister);
page('/login', showLogin);
page('*', notFound);


page.start();


function render(templateResult) {
    litRender(templateResult, main);
}

function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.updateNav = updateNav;
    next();
}

function notFound(ctx) {
    ctx.render('404 Not Found');
}

function updateNav() {
navDisp()
}

function onLogout() {
    logout()
    window.location = '/'
}