module.exports = {
    name: 'say',
    description: 'says shit!',
    execute(message, args) {
        let text = '';
        for (let i = 0; i < args.length; i++) {
            text += args[i] + ' ';
          }
          //console.log(text);
        message.reply(text);

    },
};