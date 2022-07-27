function attachEvents() {
    let location = document.getElementById('location');
    let button = document.getElementById('submit');


    let divForecast = document.getElementById('forecast');
    let divCurrent = document.getElementById('current');
    let divUpcoming = document.getElementById('upcoming');

    button.addEventListener('click', onClick);

    function onClick() {

        try {
            function getLocationCode() {
                let x = fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
                    .then(handleResponse)

                function handleResponse(response) {
                    if (response.ok == false) {
                        throw new Error(`${response.status} ${response.statusText}`);
                    }

                    return response.json();
                }
                return x;
                // if (response.ok == false) {
                //     throw new Error()
                // }

                // let data = await response.json()

                // let code = data.find(a => a.name == location.value);

                // cityCode = code.cod      // return cityCode
            }

            async function currentLoc() {
                let curr = await getLocationCode();

                let code = curr.find(a => a.name == location.value)

                let currentResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code.code}`);
                let upcomingResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code.code}`);

                if (currentResponse.ok == false || upcomingResponse.ok == false) {
                    throw new Error()
                }

                let currentData = await currentResponse.json();
                let upcomingData = await upcomingResponse.json();

                let weatherConditions = { Sunny: '\u2600', 'Partly sunny': '\u26C5', Overcast: '\u2601', Rain: '\u2614' };

                divForecast.style.display = 'block'; //inline?

                divCurrent.innerHTML = '<div class="label">Current conditions</div>'

                let divToAdd = document.createElement('div');
                divToAdd.className = 'forecasts';

                let span1 = document.createElement('span');
                span1.className = 'condition symbol';
                span1.textContent = Array(`${weatherConditions[currentData.forecast.condition]}`);
                let span2 = document.createElement('span');
                span2.className = 'condition';
                let span21 = document.createElement('span');
                span21.className = 'forecast-data';
                span21.textContent = currentData.name;
                let span22 = document.createElement('span');
                span22.className = 'forecast-data';
                span22.textContent = `${currentData.forecast.low}°/${currentData.forecast.high}°`;
                let span23 = document.createElement('span');
                span23.className = 'forecast-data';
                span23.textContent = `${currentData.forecast.condition}`;

                span2.appendChild(span21);
                span2.appendChild(span22);
                span2.appendChild(span23);

                divToAdd.appendChild(span1);
                divToAdd.appendChild(span2);

                divCurrent.appendChild(divToAdd);


                //Three day forecast
                divUpcoming.innerHTML = '<div class="label">Three-day forecast</div>'
                let divThreeDays = document.createElement('div');
                divThreeDays.className = 'forecast-info';
                createUpcoming(divThreeDays, 0);
                createUpcoming(divThreeDays, 1);
                createUpcoming(divThreeDays, 2);

                divUpcoming.appendChild(divThreeDays);


                function createUpcoming(divToFill, day) {

                    let span6 = document.createElement('span');
                    span6.className = 'upcoming';
                    let span3 = document.createElement('span');
                    span3.className = 'symbol';
                    span3.textContent = Array(`${weatherConditions[upcomingData.forecast[day].condition]}`);
                    let span4 = document.createElement('span');
                    span4.className = 'forecast-data';
                    span4.textContent = `${upcomingData.forecast[day].low}°/${upcomingData.forecast[day].high}°`;
                    let span5 = document.createElement('span');
                    span5.className = 'forecast-data';
                    span5.textContent = upcomingData.forecast[day].condition;

                    span6.appendChild(span3);
                    span6.appendChild(span4);
                    span6.appendChild(span5);

                    divToFill.appendChild(span6);
                }


            }
            currentLoc()
        } catch (error) {
            button.textContent = 'Error';
            divForecast.style.display = 'none';
        }
    }

}

attachEvents();

//I cant catch the error.