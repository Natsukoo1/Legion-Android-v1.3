const { MessageActionRow, MessageButton } = require('discord.js-selfbot-v13');

// Objet pour stocker les pourcentages d'amour entre les utilisateurs
const lovePercentages = {};

module.exports = {
    name: "love",
    aliases: ["amour"],
    description: "Calcule le pourcentage d'amour entre deux personnes.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifie si les deux pseudos sont fournis
        if (args.length < 2) {
            message.channel.send("Veuillez fournir deux pseudos pour calculer le pourcentage d'amour.");
            return;
        }

        message.delete();

        // Récupère les deux pseudos fournis en argument
        const [pseudo1, pseudo2] = args;

        // Vérifie si le pourcentage a déjà été calculé pour cette paire
        if (lovePercentages[`${pseudo1.toLowerCase()}-${pseudo2.toLowerCase()}`]) {
            const lovePercentage = lovePercentages[`${pseudo1.toLowerCase()}-${pseudo2.toLowerCase()}`];

            // Crée un bouton pour supprimer le résultat
            const deleteButton = new MessageButton()
                .setCustomId(`delete_love_${message.id}`)
                .setLabel("Supprimer")
                .setStyle("DANGER");

            // Envoie le résultat en deux messages séparés avec le bouton "Supprimer"
            message.channel.send(`Le pourcentage d'amour entre ${pseudo1} et ${pseudo2} est de **${lovePercentage}%**.`, { components: [new MessageActionRow().addComponents(deleteButton)] });
        } else {
            // Génère un pourcentage d'amour aléatoire entre 0 et 100
            const lovePercentage = Math.floor(Math.random() * 101);

            // Enregistre le pourcentage dans l'objet lovePercentages
            lovePercentages[`${pseudo1.toLowerCase()}-${pseudo2.toLowerCase()}`] = lovePercentage;

            // Choix des messages en fonction du pourcentage
            let loveMessage = "";
            if (lovePercentage < 20) {
                loveMessage = "C'est triste, mais il semble y avoir très peu d'amour entre eux.";
            } else if (lovePercentage < 50) {
                loveMessage = "Il y a un peu d'amour, mais il pourrait y en avoir plus.";
            } else if (lovePercentage < 80) {
                loveMessage = "Ces deux personnes ont un bon niveau d'amour l'une pour l'autre !";
            } else {
                loveMessage = "C'est un amour fort et véritable entre eux, une paire parfaite ! ❤️";
            }

            // Crée un bouton pour supprimer le résultat
            const deleteButton = new MessageButton()
                .setCustomId(`delete_love_${message.id}`)
                .setLabel("Supprimer")
                .setStyle("DANGER");

            // Envoie le résultat en deux messages séparés avec le bouton "Supprimer"
            message.channel.send(`Le pourcentage d'amour entre ${pseudo1} et ${pseudo2} est de **${lovePercentage}%**. ${loveMessage}`, { components: [new MessageActionRow().addComponents(deleteButton)] });
        }
    }
};
