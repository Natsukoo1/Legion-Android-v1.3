module.exports = {
    name: "slap",
    description: "Donne une gifle à l'utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à gifler.");
            return;
        }

        // Liste de liens de GIFs de gifles
        const slapGifs = [
            "https://media.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif",
            "https://media.tenor.com/sgVBbLazB7gAAAAd/penguin-slap-slap.gif",
            "https://media.tenor.com/E3OW-MYYum0AAAAd/no-angry.gif",
			"https://media.tenor.com/Sv8LQZAoQmgAAAAC/chainsaw-man-csm.gif",
            // Ajoutez autant de liens de GIFs que vous le souhaitez
        ];

        // Choisissez un lien de GIF de gifle aléatoire
        const randomSlapGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

        // Envoyez le GIF de gifle dans le canal
        message.channel.send(`**${message.author.username}** donne une gifle à **${mentionedUser.username}** !`);
        message.channel.send(randomSlapGif);
    }
};
