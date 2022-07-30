import { showDays } from './daysView.js';
import { showYears } from './yearsView.js';
import { showMonths } from './monthsView.js';
showYears();


document.getElementsByTagName('body')[0].addEventListener('click', onNavigate);

const sections = {
    'year-': showMonths,
    'year-return': showYears,
    'days': showDays
    // 'loginBtn': showLogin,
    // 'registerBtn': showRegister,
    // 'createBtn': showCreate,
};

function onNavigate(event) {
    if (event.target.tagName == 'TD' && event.target.children != 'day' || event.target.tagName == 'CAPTION') {
        let x = event.target.children[0]
        if (x == undefined) {
            let section = `year-return`;
            sections[section]();
        } else {
            let years = [2020, 2021, 2022, 2023];
            if (!years.includes(x.textContent)) {
                let section = `days`;
                let year = //get parent elements to get year and then just give them as two params forday
                sections[section](x.textContent);
            }
            let section = `year-`;
            sections[section](x.textContent);
        };
    } else if (event.target.tagName == 'DIV' && event.target.className == 'date') {
        console.log('its a date');
    }
}


//years.addEventListener('click', on)