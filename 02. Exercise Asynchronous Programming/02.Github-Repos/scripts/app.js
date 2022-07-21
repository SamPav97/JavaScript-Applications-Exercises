// function loadRepos() {
// 	let username = document.getElementById('username').value;
// 	let list = document.getElementById('repos');

// 	fetch(`https://api.github.com/users/${username}/repos`)
// 		.then(handleResponse)
// 		.then(displayRepos)
// 		.catch(handleError);


// 	function handleResponse(response) {
// 		if (response.ok == false) {
// 			throw new Error(`${response.status} ${response.statusText}`);
// 		}

// 		return response.json();
// 	}


// 	function displayRepos(data) {
// 		list.innerHTML = ''

// 		for (const repo of data) {
// 			list.innerHTML += `<li>
// 			<a href="${repo.html_url}" target="_blank">
// 				${repo.full_name}
// 			</a>
// 		</li>`
// 		}
// 	}


// 	function handleError(error) {
// 		list.innerHTML = `${error.message}`;
// 	}
// }







// async function loadRepos() {
// 	let username = document.getElementById('username').value;
// 	let list = document.getElementById('repos');

// 	try {
// 		const response = await fetch(`https://api.github.com/users/${username}/repos`)

// 		if (response.ok == false) {
// 			throw new Error(`${response.status} ${response.statusText}`);
// 		}

// 		const data = await response.json();

// 		list.innerHTML = ''

// 		for (const repo of data) {
// 			list.innerHTML += `<li>
// 			<a href="${repo.html_url}" target="_blank">
// 				${repo.full_name}
// 			</a>
// 		</li>`
// 		}
// 	} catch (error) {
// 		list.innerHTML = `${error.message}`;
// 	}
// }



async function loadRepos() {
	let username = document.getElementById('username').value;
	let list = document.getElementById('repos');


	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`)

		if (response.ok == false) {
			throw new Error(`${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		list.innerHTML = '';

		for (const repo of data) {
			let r = document.createElement('li');
			let a = document.createElement('a');
			a.textContent = repo.full_name;
			a.href = repo.html_url;
			a.target = "_blank"

			r.appendChild(a);

			list.appendChild(r);

		}


	}catch (error) {
		list.innerHTML = '';
		let li = document.createElement('li');
		li.textContent = error.message;

		list.appendChild(li);
	}
}