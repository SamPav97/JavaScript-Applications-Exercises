async function attachEvents() {
    let loadButton = document.getElementById('btnLoadPosts');
    let viewButton = document.getElementById('btnViewPost');
    let postDropDown = document.getElementById('posts');
    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let data = {};
    let commentsList = document.getElementById('post-comments');

    loadButton.addEventListener('click', onLoad);

    async function onLoad() {
        let response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);

        if (response.ok == false) {
            throw new Error();
        }

        data = await response.json();

        for (const [key, body] of Object.entries(data)) {
            postDropDown.innerHTML += (`<option value='${body.id}'>${body.title}</option>`);
        }

    }

    viewButton.addEventListener('click', onView);

    async function onView() {

        let response1 = await fetch(`http://localhost:3030/jsonstore/blog/comments`);

        if (response1.ok == false) {
            throw new Error();
        }

        let data1 = Object.values(await response1.json());

        let dataToSearch = Object.values(data);
        let currPost = dataToSearch.find(a => a.id == postDropDown.value);

        let comments = data1.filter(a => a.postId == postDropDown.value);

        postTitle.textContent = currPost.title;
        postBody.textContent = currPost.body;
        commentsList.innerHTML = '';

        for (const com of comments) {
            let li = document.createElement('li');
            li.textContent = com.text;
            commentsList.appendChild(li);
        }


    }
}

attachEvents();