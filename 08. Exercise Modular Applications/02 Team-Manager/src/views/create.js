import { html } from '../../node_modules/lit-html/lit-html.js';
import { createTeam } from '../api/data.js';


const createTemplate = (listener) => html`
            <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form id="create-form" class="main-form pad-large">
                        <div id="err" class="error" style="display: none">Error message.</div>
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input @click="${listener}" class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>`;


export async function showCreate(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let form = event.target.parentElement
        const formData = new FormData(form);
        let description = formData.get('description').trim();
        let name = formData.get('name').trim();//the path needs to be acommodate for. remember u set path in catalog too
        let logoUrl = formData.get('logoUrl').trim();

        if (description.length < 10 || name.length < 4 || logoUrl.length < 1) {
            document.querySelector('#err').style.display = 'inline';
            return
        }
        await createTeam({name, logoUrl, description});
        form.reset()
        window.location = '/browseTeams';
        //form.reset()
        // ctx.page.redirect('/'); this does not refresh furniture at catalog
        //add event listeners to all ids and change thier classes w input event
    }
}



// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "name": "Storm Troopers",
//     "logoUrl": "/assets/atat.png",
//     "description": "These ARE the droids we're looking for",
//     "_createdOn": 1615737591748,
//     "_id": "34a1cab1-81f1-47e5-aec3-ab6c9810efe1"
// },