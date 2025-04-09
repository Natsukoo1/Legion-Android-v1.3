module.exports = {
    name: "chanel",
    aliases: [],
    description: "Crée un certain nombre de canaux identiques.",
    run: async (message, args, command, client) => {
        message.delete();

        // Vérifie si un chiffre a été spécifié
        if (args.length !== 1 || !/^\d+$/.test(args[0])) {
            return message.channel.send("Utilisation incorrecte de la commande. Exemple: `!raid 3` pour créer 3 canaux identiques.");
        }

        const channelCount = parseInt(args[0], 10); // Convertit l'argument en nombre entier

        // Crée le nombre de canaux spécifié
        for (let i = 0; i < channelCount; i++) {
            message.guild.channels.create('RAID BY LEGION', {
                type: 'text',
            })
            .then(newChannel => {
                // Aucun message supplémentaire n'est envoyé
            })
            .catch(error => {
                console.error('Erreur lors de la création du canal :', error);
            });
        }
    }
}
