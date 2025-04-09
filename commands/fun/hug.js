module.exports = {
    name: "hug",
    description: "Envoyer un câlin à quelqu'un en le mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à qui envoyer un câlin.");
            return;
        }

        // Liste d'URLs d'images de câlins (vous pouvez en ajouter davantage)
        const hugImages = [
            "https://funmauj.b-cdn.net/test/550625.jpg",
            "https://funmauj.b-cdn.net/test/347844.jpg",
            "https://funmauj.b-cdn.net/test/550737.jpg",
            // Ajoutez autant d'URLs que vous le souhaitez
        ];

        // Choisissez une image aléatoire de la liste
        const randomImageUrl = hugImages[Math.floor(Math.random() * hugImages.length)];

        // Envoyez l'image de câlin dans le canal
        message.channel.send(`**${message.author.username}** fais un câlin à **${mentionedUser.username}** !`);
        message.channel.send(randomImageUrl);
    }
};
