import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userActions.js';

const registerTemp = (onSubmit) => html`
            <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" class="main-form pad-large">
                        <div id="err" class="error" style="display: none">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input @click =${onSubmit} class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>
`

export async function showRegister(ctx) {
    ctx.render(registerTemp(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target.parentElement;
        const formData = new FormData(form);
        let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let repPassword = formData.get('repass');

        if (email.length < 1 || password.length < 3 || username.length < 3 || password != repPassword) {
            document.querySelector('#err').style.display = 'inline';
            return
        }

        await register(email, username, password);
        form.reset()
        ctx.page.redirect('/browseTeams'); //not to home but to catalog fix later
    }
}