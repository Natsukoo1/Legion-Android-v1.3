module.exports = {
    name: "video",
    aliases: ["setstatutv"],
    description: "Définit le statut du bot en train de regarder une vidéo et supprime le dernier message de l'utilisateur.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (args.length < 1) {
            message.channel.send("Utilisation incorrecte. Veuillez spécifier le nom de la vidéo que vous souhaitez que le bot regarde.");
            return;
        }

        const video = args.join(" ");

        // Supprime le dernier message de l'utilisateur
        const lastUserMessage = message.channel.messages.cache.find(msg => msg.author.id === message.author.id);
        if (lastUserMessage) {
            lastUserMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le dernier message de l'utilisateur : ${error}`);
            });
        }

        // Définissez le statut du bot en train de regarder une vidéo
        client.user.setActivity(video, { type: 'WATCHING' });

        // Envoie un message de confirmation
        const confirmationMessage = await message.channel.send(`Le bot regarde "${video}".`);

        // Supprime le message de confirmation après 5 secondes
        setTimeout(() => {
            confirmationMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le message de confirmation : ${error}`);
            });
        }, 5000);
    }
};
