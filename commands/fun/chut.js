module.exports = {
    name: "chut",
    description: "Demande à l'utilisateur mentionné de se taire.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à faire taire.");
            return;
        }

        const chutGifs = [
            "https://media.tenor.com/pPxnm115AAcAAAAC/shhh-shush.gif",

        ];

        const randomChutGif = chutGifs[Math.floor(Math.random() * chutGifs.length)];

        message.channel.send(`**${message.author.username}** dit à **${mentionedUser.username}** de se taire 🤫 !`);
        message.channel.send(randomChutGif);
    }
};
