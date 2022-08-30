import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllById, getAllTeams } from '../api/data.js';

//u add the object id to the href for details so u can get the speciffic object later
const furnituresHtml = (object) => html` 
<article class="layout">
    <img src="${object.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${object.name}</h2>
        <p>${object.description}</p>
        <span class="details">${allMembers.filter(a => a.teamId == object._id).length}</span>
        <div><a href="/details/${object._id}" class="action">See details</a></div>
    </div>
</article>`

let allTeams = await getAllTeams();
//let allIdTeams = allTeams.map(a => a._id)
let allMembers = await getAllById(`?where=status%3D%22member%22`)//getting all members and above in the filter function i get only the members whose team id matches the id of the given object (team)
let mappedTeams = allTeams.map(furnituresHtml)


const catalogTemplate = () => html`
 <section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow" style="display: ${localStorage.user ? 'block': 'none'}">
    <div class="pad-small"><a href="/createTeam" class="action cta" >Create Team</a></div>
</article>

${mappedTeams}


</section>`;


export async function showBrowseTeams(ctx) {
    ctx.render(catalogTemplate());
    ctx.updateNav()
    //updatenav
}


// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "name": "Storm Troopers",
//     "logoUrl": "/assets/atat.png",
//     "description": "These ARE the droids we're looking for",
//     "_createdOn": 1615737591748,
//     "_id": "34a1cab1-81f1-47e5-aec3-ab6c9810efe1"
// },