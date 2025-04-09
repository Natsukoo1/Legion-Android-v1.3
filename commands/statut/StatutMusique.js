module.exports = {
    name: "musique",
    aliases: ["setstatutm"],
    description: "Définit le statut du bot en train d'écouter de la musique et supprime le dernier message de l'utilisateur.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (args.length < 1) {
            message.channel.send("Utilisation incorrecte. Veuillez spécifier le nom de la musique que vous souhaitez que le bot écoute.");
            return;
        }

        const music = args.join(" ");

        // Supprime le dernier message de l'utilisateur
        const lastUserMessage = message.channel.messages.cache.find(msg => msg.author.id === message.author.id);
        if (lastUserMessage) {
            lastUserMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le dernier message de l'utilisateur : ${error}`);
            });
        }

        // Définissez le statut du bot en train d'écouter de la musique
        client.user.setActivity(music, { type: 'LISTENING' });

        // Envoie un message de confirmation
        const confirmationMessage = await message.channel.send(`Le bot écoute "${music}".`);

        // Supprime le message de confirmation après 5 secondes
        setTimeout(() => {
            confirmationMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le message de confirmation : ${error}`);
            });
        }, 5000);
    }
};
