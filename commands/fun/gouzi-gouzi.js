module.exports = {
    name: "gouzigouzi",
    description: "Envoyer un gouzi-gouzi à quelqu'un en le mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à qui envoyer un gouzi-gouzi.");
            return;
        }

        // Liste d'URLs d'images de gouzi-gouzi
        const gouziGouziImages = [
            "https://media.giphy.com/media/MC7fYhbA4ociQ/giphy.gif",
            // Ajoutez autant d'URLs que vous le souhaitez
        ];

        // Choisissez une image aléatoire de la liste
        const randomImageUrl = gouziGouziImages[Math.floor(Math.random() * gouziGouziImages.length)];

        // Envoyez l'image de gouzi-gouzi dans le canal
        message.channel.send(`**${message.author.username}** fait des gouzi-gouzi à **${mentionedUser.username}** !`);
        message.channel.send(randomImageUrl);
    }
};
