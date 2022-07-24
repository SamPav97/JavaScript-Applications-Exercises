async function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
    let inputs = document.getElementById('controls').children;

    async function onSubmit(e) {

        const author = inputs[1].value;
        const content = inputs[4].value;
        try{
        let response = await fetch('http://localhost:3030/jsonstore/messenger',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
    }catch(err){
        alert(err.message);
    }
    }

    document.getElementById('refresh').addEventListener('click', onRefresh);

    async function onRefresh() {
        let response = await fetch('http://localhost:3030/jsonstore/messenger');

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        let textArea = document.getElementById('messages');
        textArea.textContent = '';

        for (const [k, v] of Object.entries(data)) {
            textArea.textContent += `${v.author}: ${v.content}\n`
        }
    }



}

attachEvents();