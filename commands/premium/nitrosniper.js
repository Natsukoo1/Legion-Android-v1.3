const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "nitro",
    aliases: ['n'],
    description: "Commence la surveillance des cadeaux Nitro.",
    run: async (message, args, command, client) => {
        // Supprime le message de commande initial pour éviter le spam
        message.delete();

        // Fonction pour supprimer un message après un certain délai (ici 10 secondes)
        async function deleteMessage(me) {
            setTimeout(() => {
                me.delete();
            }, 10000);
        }

        // Envoie un message pour indiquer que la surveillance commence
        await message.channel.send("Démarrage de la surveillance Nitro...").then(async m => {
            await m.edit("La surveillance Nitro a commencé.").then(me => deleteMessage(me));
        });

        // Ecoute les messages pour détecter les cadeaux Nitro
        const messageListener = async msg => {
            // Ignore les messages de soi-même pour éviter les boucles infinies
            if (msg.author.id === client.user.id) return;

            // Extrait le code Nitro du message si présent
            const nitroCode = extractNitroCodeFromMessage(msg.content);
            if (nitroCode) {
                // Ajoutez ici le code pour réclamer le cadeau Nitro
                // Exemple : await claimNitroCode(nitroCode, msg);
                console.log(`Code Nitro détecté: ${nitroCode}`);
                msg.channel.send(`Code Nitro détecté: ${nitroCode}`);
            }
        };

        client.on('messageCreate', messageListener);

        // Commande pour arrêter la surveillance
        client.on('messageCreate', async stopMessage => {
            if (stopMessage.content.toLowerCase() === '!stop') {
                client.removeListener('messageCreate', messageListener);
                await stopMessage.channel.send('Surveillance des cadeaux Nitro arrêtée.').then(async m => {
                    await deleteMessage(m);
                });
            }
        });
    }
};

// Fonction pour extraire le code Nitro du contenu du message
function extractNitroCodeFromMessage(messageContent) {
    const nitroRegex = /(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)([a-zA-Z0-9]+)/;
    const match = nitroRegex.exec(messageContent);
    if (match && match[2]) {
        return match[2];
    }
    return null;
}

// Fonction pour réclamer le code Nitro (placeholder, à implémenter)
async function claimNitroCode(nitroCode, msg) {
    // Implémentez ici la logique pour réclamer le cadeau Nitro
    console.log(`Réclamation du code Nitro: ${nitroCode}`);
    // Vous pouvez envoyer un message de confirmation ou effectuer d'autres actions ici
    await msg.channel.send(`Réclamation du code Nitro: ${nitroCode}`);
}
