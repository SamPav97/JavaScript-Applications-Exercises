async function getInfo() {
    let input = document.getElementById('stopId');
    let busStopName = document.getElementById('stopName');
    let listBuses = document.getElementById('buses');
    listBuses.innerHTML = '';

    try {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`);

    if(response.ok == false) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    input.value = '';

    busStopName.textContent = data.name;

    for (const [id, time] of Object.entries(data.buses)){
        let li = document.createElement('li');
        li.textContent = `Bus ${id} arrives in ${time} minutes`
        listBuses.appendChild(li);
    }

    
}catch(error) {
    busStopName.textContent = 'Error';
    input.value = '';
}
}