var fs = require('fs')
var request = require('request');
const puppeteer = require('puppeteer');
var { width, height } = require('C:/Users/Garuda Prasad G K/Desktop/Assignments/GGRKS/config.json');

module.exports = {
    name: 'y',
    description: 'yahoo search a query and send a screenshot!',
    execute(message, args) {
        let search = '';
        for (let i = 0; i < args.length; i++) {
            var patt1 = new RegExp(/\bip\b/gmi);
            var patt2 = new RegExp(/\binternet\b/gmi);
            var patt3 = new RegExp(/\bprotocol\b/gmi);
            var patt4 = new RegExp(/\bipaddress\b/gmi);
            var patt5 = new RegExp(/\bipadress\b/gmi);
            if (patt1.test(args[i]) || patt4.test(args[i]) || patt5.test(args[i]) || (patt2.test(args[i])) &&patt3.test(args[i+1])){
                message.reply('You aint getting that info silly');
                return;
            }
            else 
                search += args[i] + '+';
          }

          var url = ('https://in.search.yahoo.com/search?q=' + search);
          var check = 0;
          (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            await page.screenshot ({
                 path: 'C:/Users/Garuda Prasad G K/Desktop/Assignments/GGRKS/screenshot.png',
                 clip: {
                     x: 0,
                     y: 0,
                     width: width,
                     height: height
                 }
                 
                 });
            await browser.close();
            await message.reply({
                files: [{
                  attachment: `C:/Users/Garuda Prasad G K/Desktop/Assignments/GGRKS/screenshot.png`,
                  name: 'file.png'
                }]
              })
          })();
    },  
}      


//https://shot.screenshotapi.net/screenshot?token=5612YP7-156MY7A-PFYDNR8-KWJ287T&url=https%3A%2F%2Fgoogle.com&output=image&file_type=png&dark_mode=true&wait_for_event=load
