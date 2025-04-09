const { WebhookClient } = require('discord.js');

module.exports = {
    name: "spamvocal",
    aliases: [],
    description: "SPAM 50 MESSAGES VOCAL.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (message.member.voice.channel) {
            // Supprimer le message de la commande
            message.delete().catch(error => {
                console.error(`Impossible de supprimer le message de la commande : ${error}`);
            });

            // Obtenez le salon vocal
            const voiceChannel = message.member.voice.channel;

            // Obtenez le webhook "Legion" s'il existe, sinon, créez-le
            const webhooks = await voiceChannel.fetchWebhooks();
            let webhook = webhooks.find(w => w.name === "Legion");

            if (!webhook) {
                webhook = await voiceChannel.createWebhook("Legion");
            }

            // Fonction pour envoyer 50 messages "coucou" via le webhook
            const send50Coucous = async () => {
                try {
                    const webhookClient = new WebhookClient({ id: webhook.id, token: webhook.token });

                    for (let i = 0; i < 50; i++) {
                        await webhookClient.send("LEGION V1.1 VOUS PASSE LE BONJOUR @everyone");
                    }

                    console.log("50 messages 'coucou' envoyés dans le salon vocal via le webhook.");
                } catch (error) {
                    console.error(`Impossible d'envoyer les messages 'coucou' via le webhook : ${error}`);
                }
            };

            // Appeler la fonction send50Coucous lorsque l'utilisateur rejoint un salon vocal
            send50Coucous();
        } else {
            message.channel.send("Vous devez être connecté à un salon vocal pour utiliser cette commande.");
        }
    }
};
