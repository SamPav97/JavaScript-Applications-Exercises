import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userActions.js';

const loginTemp = (onSubmit) => html`
            <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" class="main-form pad-large">
                        <div id="err" class="error" style="display: none">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input @click= ${onSubmit} class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
`

export async function showLogin(ctx) {
    ctx.render(loginTemp(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target.parentElement;
        const formData = new FormData(form);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email.length < 1 || password.length < 1) {
            document.querySelector('#err').style.display = 'inline';
            return
        }
        try{
        await login(email, password);
        form.reset()
        ctx.page.redirect('/browseTeams'); //change to catalog
        } catch(err){
            document.querySelector('#err').style.display = 'inline';
            return
        }
    }
}