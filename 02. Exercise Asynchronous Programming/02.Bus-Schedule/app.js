function solve() {
    let nextStopId = 'depot';
    let currentStop;
    let infoTerminal = document.getElementsByClassName("info")[0];
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');

    async function depart() {

        try{
        let response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);

        if(response.ok == false) {
            throw new Error()
        }

        let data = await response.json();

        infoTerminal.textContent = `Next stop ${data.name}`;
        currentStop = data.name
        nextStopId = data.next;
        departButton.disabled = true;
        arriveButton.disabled = false;

    }catch(error) {
        infoTerminal.textContent = 'Error';
        departButton.disabled = true;
        arriveButton.disabled = true;
    }
    }

    function arrive() {
        
        infoTerminal.textContent = `Arriving at ${currentStop}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();