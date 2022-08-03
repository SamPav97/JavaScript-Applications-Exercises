const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; //Declare resuable vars

describe('Messenger tests', async function () {
    this.timeout(5000);

        //{headless: false, slowMo: 500} inside the launch makes browse open.
    before(async () => {browser = await chromium.launch({headless: false, slowMo: 500}); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads messeges', async () => {
        await page.goto('http://localhost:5500/01.Messenger/index.html');
        await page.click('text=Refresh');
        //await page.screenshot({ path: 'site.png' });
        const content = await page.inputValue('#messages');
        expect(content).to.contain('Spami: Hello, are you there?');
    });

    it('sends messeges', async () => {
        await page.goto('http://localhost:5500/01.Messenger/index.html');
        await page.click('text=Refresh');
        await page.fill('#author', 'Peter');
        await page.fill('#content', 'Sam is gay');
        await page.click('text=Send');
        await page.click('text=Refresh');
        //await page.screenshot({ path: 'site.png' });
        const content = await page.inputValue('#messages');
        expect(content).to.contain('Peter: Sam is gay');
    });

});