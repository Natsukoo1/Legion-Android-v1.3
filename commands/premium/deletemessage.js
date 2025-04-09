module.exports = {
    name: "delete",
    aliases: [],
    description: "Supprimer vos propres messages dans le salon.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (args[0] && !isNaN(args[0])) {
            const numToDelete = parseInt(args[0]);


            if (numToDelete <= 0) {
                message.channel.send("Veuillez spécifier un nombre valide de messages à supprimer.");
                return;
            }

            if (numToDelete > 100) {
                message.channel.send("Vous ne pouvez pas supprimer plus de 100 messages à la fois.");
                return;
            }

            // Supprime le nombre spécifié de messages (jusqu'à 100) qui ont été envoyés par l'utilisateur
            message.channel.messages.fetch({ limit: 100 }).then(messages => {
                const userMessagesToDelete = Array.from(messages.values()).filter(m => m.author.id === message.author.id).slice(0, numToDelete);
                userMessagesToDelete.forEach(msg => msg.delete().catch(error => {
                    console.error(`Impossible de supprimer un message : ${error}`);
                }));
                message.channel.send(`Suppression de ${userMessagesToDelete.length} message(s).`);
            });
        } else {
            message.channel.send("Utilisation : !delete <nombre de messages à supprimer>");
        }
    }
};
