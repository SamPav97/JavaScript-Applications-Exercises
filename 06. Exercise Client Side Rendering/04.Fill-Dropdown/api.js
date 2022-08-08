export async function requ() {
    try {
        const req = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`);

        if (req.ok == false) {
            let err = await req.json();
            throw new Error(err)
        }

        let data = await req.json();
        return data
    } catch (err) {
        alert(err.message);
    }
}

export async function send(cont) {
    try {
        const req = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cont)
        });

        if (req.ok == false) {
            let err = await req.json();
            throw new Error(err)
        }
    } catch (err) {
        alert(err.message);
    }
}
