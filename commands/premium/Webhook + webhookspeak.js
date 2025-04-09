const { WebhookClient, Util } = require('discord.js');

module.exports = {
    name: "webhook",
    description: "Créer et utiliser des webhooks",
    run: async (message, args, command, client) => {
        if (args.length < 1) {
            return message.channel.send("Utilisation correcte : >webhook <create/speak> <arguments>");
        }

        const subCommand = args[0];

        if (subCommand === 'create') {
            if (args.length < 3) {
                return message.channel.send("Utilisation correcte : >webhook create <nom_du_webhook> <url_image>");
            }

            const webhookName = args[1];
            const avatarURL = args[2];

            try {
                const webhook = await message.channel.createWebhook(webhookName, {
                    avatar: avatarURL
                });

                message.channel.send(`Webhook créé : ${webhook.url}`);
            } catch (error) {
                console.error('Erreur lors de la création du webhook :', error);
                message.channel.send("Une erreur s'est produite lors de la création du webhook.");
            }
        } else if (subCommand === 'speak') {
            if (args.length < 3) {
                return message.channel.send("Utilisation correcte : >webhook speak <nom_du_webhook> <message>");
            }

            const webhookName = args[1];
            const webhookMessage = args.slice(2).join(" ");

            try {
                const webhook = await findWebhookByName(message.guild, webhookName);

                if (!webhook) {
                    return message.channel.send("Webhook non trouvé.");
                }

                const webhookClient = new WebhookClient({
                    id: webhook.id,
                    token: webhook.token
                });

                await webhookClient.send(webhookMessage);

                message.delete(); // Supprime le message de commande

            } catch (error) {
                console.error('Erreur lors de l\'envoi du message via le webhook :', error);
                message.channel.send("Une erreur s'est produite lors de l'envoi du message via le webhook.");
            }
        } else {
            message.channel.send("Sous-commande inconnue. Utilisation correcte : >webhook <create/speak> <arguments>");
        }
    }
}

// Fonction pour trouver un webhook par son nom dans un serveur
async function findWebhookByName(guild, name) {
    const webhooks = await guild.fetchWebhooks();

    const webhook = webhooks.find(webhook => webhook.name === name);

    return webhook;
}