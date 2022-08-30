import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllById, getAllTeamsOfMember } from '../api/data.js';

//u add the object id to the href for details so u can get the speciffic object later
const teamTemp = (object) => html` 
<article class="layout">
    <img src="${object.team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${object.team.name}</h2>
        <p>${object.team.description}</p>
        <span class="details">${allMembers.filter(a => a.teamId == object.team._id).length}</span>
        <div><a href="/details/${object.teamId}" class="action">See details</a></div>
    </div>
</article>`


// above gets all teams belongin to member w current id
let allMembers = await getAllById(`?where=status%3D%22member%22`)//getting all members and above in the filter function i get only the members whose team id matches the id of the given object (team)

//u need an if else. if allTeams is an empty list, then u need to upload a text message saying no current teams
//uve got the template for that in the example html


const myTeamsTemp = (mapteams) => html`
 <section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow" style="display: ${localStorage.user ? 'block': 'none'}">
    <div class="pad-small"><a href="/createTeam" class="action cta" >Create Team</a></div>
</article>

${mapteams}


</section>`;


export async function showMyteams(ctx) {
    if(localStorage.user){ //If this is not here in the if statement it fails if user is loged out and whole site goes down. i gotta make sure to run this only when logge in
    let allTeams = await getAllTeamsOfMember(`?where=_ownerId%3D%22${JSON.parse(localStorage.user)._id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
    let mappedTeams = allTeams.map(teamTemp)
    ctx.render(myTeamsTemp(mappedTeams));
}else {
    ctx.render(html`<h1>No Access!</h1>`);
}
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