const puppeteer = require('puppeteer')

async function tutorial() {
   try {
       const URL = 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku'
       const browser = await puppeteer.launch({headless: false})
       const page = await browser.newPage()

       await page.goto(URL)
       let pagesToScrape = 3;
       let currentPage = 1;
       let data = []
       while (currentPage <= pagesToScrape) {
           let newResults = await page.evaluate(() => {
               let results = []
               let items = document.querySelectorAll('.card-container')
               items.forEach((item) => {
                   results.push({
                          // job
                        title: item.querySelector('a').innerText, // takes the inner text of the a-link attribute
                    
                    // company name and location
                        companyname: item.querySelector('.pb-company-name').innerText,

                        Date: item.querySelector('.ng-star-inserted').innerText
                   })
               })
               return results
           })
           data = data.concat(newResults)
           if (currentPage < pagesToScrape) {
               await page.click('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button')
               await page.waitForSelector('.card-container')
           }
           currentPage++;
       }
       console.log(data)
       await browser.close()
   } catch (error) {
       console.error(error)
   }
}

tutorial()