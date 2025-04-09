module.exports = {
    name: "streaming",
    aliases: ["setstatuts"],
    description: "Définit le statut du bot en train de diffuser un jeu en streaming et supprime le dernier message de l'utilisateur.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (args.length < 2) {
            message.channel.send("Utilisation incorrecte. Veuillez fournir un lien de diffusion et le nom du jeu que vous souhaitez diffuser.");
            return;
        }

        const streamURL = args[0];
        const game = args.slice(1).join(" ");

        // Supprime le dernier message de l'utilisateur
        const lastUserMessage = message.channel.messages.cache.find(msg => msg.author.id === message.author.id);
        if (lastUserMessage) {
            lastUserMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le dernier message de l'utilisateur : ${error}`);
            });
        }

        // Définissez le statut du bot en train de diffuser un jeu en streaming
        client.user.setActivity(game, { type: 'STREAMING', url: streamURL });

        // Envoie un message de confirmation
        const confirmationMessage = await message.channel.send(`Le bot diffuse en streaming "${game}" à ${streamURL}.`);
        
        // Supprime le message de confirmation après 5 secondes
        setTimeout(() => {
            confirmationMessage.delete().catch(error => {
                console.error(`Impossible de supprimer le message de confirmation : ${error}`);
            });
        }, 5000);
    }
};
