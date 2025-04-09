module.exports = {
    name: "competition",
    aliases: ["setstatutp"],
    description: "Définit le statut du bot en train de jouer à un jeu.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifiez si l'utilisateur a fourni un jeu
        if (args.length < 1) {
            message.channel.send("Veuillez fournir le nom du jeu que vous souhaitez définir.");
            return;
        }

        // Rejoignez les arguments pour obtenir le nom du jeu complet
        const game = args.join(" ");

        message.delete().catch(error => {
            console.error(`Impossible de supprimer le message de l'utilisateur: ${error}`);
        });

        // Définissez le statut du bot en train de jouer au jeu spécifié
client.user.setActivity(game, { type: 'COMPETING' });

        message.channel.send(`Le statut du membre a été défini en train de jouer à "${game}".`).then(botMessage => {
            setTimeout(() => {
                botMessage.delete().catch(error => {
                    console.error(`Impossible de supprimer le message du bot: ${error}`);
                });
            }, 5000); // Supprime le message du bot après 5 secondes
        });
    }
};
