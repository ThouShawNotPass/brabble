// This is my memberID: A1C7A33E-F57C-41EC-87A3-3EF57CE1ECD8
// Tutorial https://blog.bitsrc.io/how-to-perform-web-scraping-using-node-js-part-2-7a365aeedb43

import Nightmare from 'nightmare';
import Cheerio from 'cheerio';

const nightmare = Nightmare({ show: true})
const url = 'https://www.flipkart.com/';

// Network request with Nightmare
nightmare
  .goto(url)
  .wait('body') // wait for body to load
  .click('button._2AkmmA._29YdH8')
  .type('input.LM6RPg', 'nodejs books')
  .wait('div.bhgxx2')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end() //close the browser
  .then(response => {
    console.log(getData(response))
  }).catch(error => {
    console.log(error)
  });

// Parse the innerHTML with Cherrio
let getData = html => {
  data = [];
  const $ = Cherio.load(html);
  $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12')
    .each((row, element) => {
      $(element).find('div div div').each((i, el) => {
        let title = $(elem).find('div div a:nth-child(2)').text();
        let link = $(elem).find('div div a:nth-child(2)').attr('href');
        if (title) {
          data.push({
            title : title,
            link : link
          });
        }
      })
    });
  return data;
}