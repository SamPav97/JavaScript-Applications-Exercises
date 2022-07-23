// async function loadCommits() {
//     //read input fields
//     const username = document.getElementById('username').value;
//     const repo = document.getElementById('repo').value;
//     const list = document.getElementById('commits');

// try {
//     //send request

//     const res = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
//     //check for errors
//     if (res.ok == false) {
//         throw new Error(`${res.status} ${res.statusText}`);
//     }

//     const data = await res.json();
//     list.innerHTML = '';
//     //display results
//     for (const { commit } of data) {

//         list.innerHTML += `<li> ${commit.author.name} ${commit.message}</li>`
//     }

//     //handle errors
// } catch (err) {
//     list.innerHTML = `Error: ${err.message}`;
// }
// }



async function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let list = document.getElementById('commits');

    try {
        let res = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);

        if (res.ok == false) {
            throw new Error(`${res.status} ${res.statusText}`)
        }

        let data = await res.json();

        list.innerHTML = ''

        console.log(data);

        for (let { commit } of data) {
            let li  = document.createElement('li');
            li.textContent = `${commit.author.name}: ${commit.message}`
            list.appendChild(li);
        }


    }catch (error){
        list.innerHTML = `<li>Error: ${error.message} </li>`
    }





}