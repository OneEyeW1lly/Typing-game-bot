const pupeteer = require('puppeteer');

pupeteer.launch({
    headless: false 
}).then(async browser => {
    
    const page = await browser.newPage()
    await page.goto('https://typing-speed-test.aoeu.eu')
    await page.evaluate(_ => {
        window.scrollBy(0, 200)
    })
    await page.waitForSelector('#input')
    await page.waitFor(1000)
    await page.click('#input')
    let w = await page.evaluate(() => {
        let word1 = $('.currentword').text()
        let words = [word1]
        $('.nextword').each(function() {
            words.push($(this).text())
        })
        return words
    })

    for (let i = 0; i < w.length; i++) {
        await page.type('#input', w[i] + ' ')
    }
    await page.evaluate(_ => {
        window.scrollBy(0, 350)
    })
    await page.waitFor(10000)
})