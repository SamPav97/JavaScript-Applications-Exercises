const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


describe('Library tests', async function () {
    this.timeout(10000);
    let browser, page; //Declare resuable vars

        //{headless: false, slowMo: 500} inside the launch makes browse open.
    before(async () => {browser = await chromium.launch({headless: false, slowMo: 1000}); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('Loads books', async () => {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        await page.click('text=LOAD ALL BOOKS');
        //await page.screenshot({ path: 'site.png' }); 
        const content = await page.textContent('tbody');
        expect(content).to.contain(`Harry Potter and the Philosopher's Stone`);
        expect(content).to.contain(`C# Fundamentals`);

    });

    it('Adds books', async () => {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        //await page.screenshot({ path: 'site.png' });
        await page.fill('input[name=title]', 'Title');
        await page.fill('input[name=author]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ])

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

    
    it.only('edits books', async () => {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        //await page.screenshot({ path: 'site.png' });
        await page.click('text=LOAD ALL BOOKS');
        const row = await page.waitForSelector('tbody');
        const button = await row.$('text=Edit >> nth=2');
        await button.click();
        await page.fill('#editForm input[name=title]', 'Griffin')

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'PUT'),
            page.click('text=Save')
        ])

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Griffin');
        expect(data.author).to.equal('Peter');

        // const form = await page.$('#editForm')//('form >> nth=1');
        // const field1 = form.$('text=Peter')
        // await field1.type(' Pan');
        // await page.click('text=Save');
        // await page.fill('#aut', ' Griffin');
        // await page.click('text=Save');
        // await page.click('text=LOAD ALL BOOKS');
        // const content = await page.textContent('tbody');
        // expect(content).to.contain(`Pan`);
    });
});