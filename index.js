const puppeteer = require('puppeteer')
async function tutorial() {
   try {
       const URL = 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku'
       const browser = await puppeteer.launch()
       const page = await browser.newPage()

       await page.goto(URL)
       
       let data = await page.evaluate(() => {
           let results = []
           let items = document.querySelectorAll('.card-container')
           items.forEach((item) => {
               results.push({
                // title(job), company name and location
                    // job
                    title: item.querySelector('a').innerText, // takes the inner text of the a-link attribute
                    
                    // company name and location
                    companyname: item.querySelector('.pb-company-name').innerText,
                    
               })
           })
           return results
       })

       console.log(data)
       await browser.close()

   } catch (error) {
       console.error(error)
   }
}

tutorial()
