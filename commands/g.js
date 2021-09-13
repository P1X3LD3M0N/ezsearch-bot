var fs = require('fs')
var request = require('request');
var { width, height } = require('C:/Users/Garuda Prasad G K/Desktop/Assignments/GGRKS/config.json');

module.exports = {
    name: 'g',
    description: 'google a query and send a screenshot!',
    execute(message, args) {
        let search = '';
        for (let i = 0; i < args.length; i++) {
            search += args[i] + '+';
          }

          var token = '5612YP7-156MY7A-PFYDNR8-KWJ287T';
          var url = encodeURIComponent('https://google.com/search?q=' + search);
          var output = 'image';
          
          var query = "http://screeenly.com/api/v1/fullsize?key=API_KEY&url=google.com";
          query += `?token=${token}&url=${url}&width=${width}&height=${height}&output=${output}&file_type=png&dark_mode=true&wait_for_event=load`;
          
          request.get({url: query, encoding: 'binary'}, (err, response, body) => {
            fs.writeFile("screenshot.png", body, 'binary', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                    message.reply({
                        files: [{
                          attachment: `C:/Users/Garuda Prasad G K/Desktop/Assignments/GGRKS/screenshot.png`,
                          name: 'file.png'
                        }]
                      })
                }
            });
        });
    },  
}      


//https://shot.screenshotapi.net/screenshot?token=5612YP7-156MY7A-PFYDNR8-KWJ287T&url=https%3A%2F%2Fgoogle.com&output=image&file_type=png&dark_mode=true&wait_for_event=load
