module.exports = {
    name: "bescherelle",
    description: "Envoie un bescherelle.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à qui envoyer le bescherelle.");
            return;
        }

        // Liste d'URLs d'images de patpats
        const patpatImages = [
            "https://media.tenor.com/zAr15P6KMyAAAAAC/bescherelle-militaire.gif",
            // Ajoutez autant d'URLs que vous le souhaitez pour les patpats
        ];

        // Choisissez une image aléatoire de la liste
        const randomImageUrl = patpatImages[Math.floor(Math.random() * patpatImages.length)];

        // Envoyez l'image de patpat dans le canal
        message.channel.send(`**${message.author.username}** Envoie un bescherelle à **${mentionedUser.username}** !`);
        message.channel.send(randomImageUrl);
    }
};
