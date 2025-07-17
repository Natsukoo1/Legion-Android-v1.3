module.exports = {
    name: "leaulitdort",
    description: "Envoyer un coup à leaulitdort en la mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à qui envoyer un coup de poing.");
            return;
        }

        // Liste d'URLs d'images de gouzi-gouzi
        const LeauLitDortImages = [
            "https://i.imgur.com/YTHAtTE.gif",
            // Ajoutez autant d'URLs que vous le souhaitez
        ];

        // Choisissez une image aléatoire de la liste
        const randomImageUrl = LeauLitDortImages[Math.floor(Math.random() * LeauLitDortImages.length)];

        // Envoyez l'image de gouzi-gouzi dans le canal
        message.channel.send(`**${message.author.username}** met un coup de poing spécial **Leaulitdort** !`);
        message.channel.send(randomImageUrl);
    }
};
