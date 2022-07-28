async function lockedProfile() {
// I should have a try catch here
    let response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);

    if (response.ok == false) {
        throw new Error();
    }

    let data = await response.json();

    let profContainer = document.getElementById('main');
    profContainer.innerHTML = ''
    let count = 0;

    for (const obj of Object.values(data)) {
        count += 1
        createCard(obj, count);
    }

    function createCard(object, count) {
        profContainer.innerHTML += `<div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user${count}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user${count}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${object.username}" disabled readonly />
        <div class="user1Username" style="display: none">
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value="${object.email}" disabled readonly />
            <label>Age:</label>
            <input type="text" name="user1Age" value="${object.age}" disabled readonly />
        </div>
        
        <button>Show more</button>
    </div>`
    }

    let buttons = Array.from(document.querySelectorAll('button'));

    buttons.forEach(a => a.addEventListener('click', onClick));

    function onClick(e) {
        let wholeProf = e.currentTarget.parentElement;
        let children = Array.from(wholeProf.children);
        if (children[2].checked) {
            return
        }
        children[9].style.display = 'block';

        wholeProf.removeChild(wholeProf.lastElementChild);
        let button = document.createElement('button');
        button.textContent = 'Hide it';

        wholeProf.appendChild(button)
        button.addEventListener('click', onHide);

        function onHide(ev) {
            let wholeProf = ev.currentTarget.parentElement;
            let children = Array.from(wholeProf.children);
            if (children[2].checked) {
                return
            }
            children[9].style.display = 'none';

            wholeProf.removeChild(wholeProf.lastElementChild);
            let buttonHide = document.createElement('button');
            buttonHide.textContent = 'Show more';

            wholeProf.appendChild(buttonHide)

            buttons = Array.from(document.querySelectorAll('button'));

            buttons.forEach(a => a.textContent == 'Show more'? a.addEventListener('click', onClick):a.addEventListener('click',onHide));
        }



    }

}