module.exports = {
    name: "patpat",
    description: "Donner une petite tape amicale à quelqu'un en le mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifiez si l'utilisateur a mentionné quelqu'un
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à qui patpat.");
            return;
        }

        // Liste d'URLs d'images de patpats
        const patpatImages = [
            "https://media0.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif",
            "https://media3.giphy.com/media/6ML0cdwiWQVhq7SM0w/giphy.webp?cid=ecf05e47rpr1oi4vmtf7lubvp2qmlgqgynkqu188fbh6fh9n&ep=v1_gifs_search&rid=giphy.webp&ct=g",
			"https://tenor.com/view/malpat-truepat-kingpat-pat-gif-23317105",
			"https://tenor.com/view/pat-pat-pat-pat-on-head-cute-affection-gif-8864024291896689148",
			"https://tenor.com/view/pat-pat-gif-27638431",
            // Ajoutez autant d'URLs que vous le souhaitez pour les patpats
        ];

        // Choisissez une image aléatoire de la liste
        const randomImageUrl = patpatImages[Math.floor(Math.random() * patpatImages.length)];

        // Envoyez l'image de patpat dans le canal
        message.channel.send(`**${message.author.username}** fait un patpat à **${mentionedUser.username}** !`);
        message.channel.send(randomImageUrl);
    }
};
