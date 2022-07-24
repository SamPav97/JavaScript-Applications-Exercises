function attachEvents() {
    let loadButton = document.getElementById('btnLoad');
    let createButton = document.getElementById('btnCreate');
    let personField = document.getElementById('person');
    let phoneField = document.getElementById('phone');
    let phonebook = document.getElementById('phonebook');

    loadButton.addEventListener('click', onLoad);

    async function onLoad() {
        try{
        let response = await fetch('http://localhost:3030/jsonstore/phonebook');

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        phonebook.innerHTML = '';

        for (const [key, personPhone] of Object.entries(data)) {
            let li = document.createElement('li');
            li.textContent = `${personPhone.person}:${personPhone.phone}`;
            let delButton = document.createElement('button');
            delButton.textContent = 'Delete';
            li.appendChild(delButton);
            phonebook.appendChild(li);

            delButton.addEventListener('click', onDel);

            async function onDel(e) {
                let response = await fetch('http://localhost:3030/jsonstore/phonebook/' + key, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if(response.ok == false) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                e.target.parentElement.remove()
                
            }
        }
    }catch(err){
        alert(err.message);
    }

    }

    createButton.addEventListener('click', onCreate);

    async function onCreate() {
        
        let person = personField.value;
        let phone = phoneField.value;


        try{
        let response = await fetch(`http://localhost:3030/jsonstore/phonebook`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({person,
            phone})
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
    }catch(err) {
        alert(err.message)
    }

        onLoad();

    }
    
}

attachEvents();