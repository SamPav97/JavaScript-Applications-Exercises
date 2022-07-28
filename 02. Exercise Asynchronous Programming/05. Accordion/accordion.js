async function solution() {
    // see where to add a try catch
    try{
    let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);

    if(response.ok == false){
        throw new Error()
    }

    let data = await response.json();

    let names = data.map(a => a._id);
    let fullInfo = [];

    for (const name of names) {
        let response1 = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${name}`);

        if(response1.ok == false){
            throw new Error()
        };
        let data1 = await response1.json()

        fullInfo.push(data1);
    }

    console.log(fullInfo);


    let section = document.getElementById('main');

    function createPost(obj) {
        let res = e('div', { className: 'accordion' }, e('div', { className: 'head' }, e('span', {}, obj.title), e('button', {className: 'button', id: obj._id}, 'More')), e('div', {className: 'extra', style: 'display: none'}, e('p', {}, obj.content)));

        return res
    }

    for (const post of fullInfo) {
        section.appendChild(createPost(post));
    }

    let allButtons = Array.from(document.querySelectorAll('button'));

    allButtons.forEach(a => a.addEventListener('click', onMore));

    function onMore (e) {
        let mother = e.currentTarget.parentElement.parentElement;

        let kids = mother.children;

        kids[1].style.display = 'block'

        let buttonParent = kids[0];
        
        let less = document.createElement('button');
        less.className = 'button';
        less.textContent = 'Less';

        buttonParent.removeChild(buttonParent.lastChild);
        buttonParent.appendChild(less);

        allButtons = document.querySelectorAll('button');

        allButtons.forEach(a => a.textContent == 'Less'? a.addEventListener('click', onLess):a.addEventListener('click', onMore));

        function onLess(e){
            let postToBeHidden = e.currentTarget.parentElement.parentElement.children;

            postToBeHidden[1].style.display = 'none';

            let more = document.createElement('button');
            more.className = 'button';
            more.textContent = 'More';
    
            postToBeHidden[0].removeChild(postToBeHidden[0].lastChild);
            postToBeHidden[0].appendChild(more);
            
            allButtons = document.querySelectorAll('button');

            allButtons.forEach(a => a.textContent == 'Less'? a.addEventListener('click', onLess):a.addEventListener('click', onMore));
        }
    }
}catch (errror) {
    console.log('Error');
}

    
}

solution()

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}