import { html } from '../../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js'
import { deleteById, getAllMembersOfTeam, getById } from '../api/data.js';

const membersTemp = (obj) => html`
<li id="${obj._id}">${obj.user.username}
<a @click="${onDel}" href="#" class="tm-control action" style="display: ${localStorage.user && obj.user.username != JSON.parse(localStorage.user).username ? 'inline': 'none'}">Remove from team</a>
</li>`
// fix that temp above and mapp all members into temp below to finish guest view of details




const detailsTemp = (obj, members) => html`
<section id="team-home">
                <article class="layout">
                    <img src="../${obj.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${obj.name}</h2>
                        <p>${obj.description}</p>
                        <span class="details">${members.length} Members</span>
                        <div style="display: ${localStorage.user ? 'inline': 'none'}">
                            <a href="#" class="action" style="display: ${obj._ownerId == JSON.parse(localStorage.user)._id ? 'inline': 'none'}">Edit team</a>
                            <a href="#" class="action" style="display: ${obj._ownerId == JSON.parse(localStorage.user)._id ? 'none': 'inline'}">Join team</a>
                            <a href="#" class="action invert" style="display: ${obj._ownerId == JSON.parse(localStorage.user)._id ? 'none': 'inline'}">Leave team</a>
                           <p style="display: ${obj._ownerId == JSON.parse(localStorage.user)._id ? 'none': 'inline'}">Membership pending. <a href="#">Cancel request</a></p>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                        ${members}
                        </ul>
                    </div>
                    <div class="pad-large" style="display: ${localStorage.user ? 'inline': 'none'}">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                            <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                        </ul>
                    </div>
                </article>
            </section>`

export async function showDetails(ctx){// this is how u ge the id from params.
    const getTeam = await getById(ctx.params.detailsId)

    let allMembs = await getAllMembersOfTeam(`?where=teamId%3D%22${ctx.params.detailsId}%22&load=user%3D_ownerId%3Ausers`)
    let allMembsUsers = allMembs.map(a => a.user);
    console.log(allMembsUsers);

    
    //let mappedMembers = allMembsUsers.map(membersTemp);
    
    ctx.render(detailsTemp(getTeam, repeat(allMembs, membersTemp)))

}

function onDel(e) {
    let id = e.target.parentElement.id;
    deleteById(id);
    location.reload();
}