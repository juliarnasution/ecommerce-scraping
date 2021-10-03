const puppeteer = require('puppeteer');
exports.runBrowser =  async (url)=>{
    // run browser
    const browser = await puppeteer.launch();
    // open new page
    const page = await browser.newPage();
    // go to url page
    await page.goto(url);
    /**get content as html */
    const content = await page.content();
    await page.waitForSelector("._193wCc");
    
    return [browser,content];
}