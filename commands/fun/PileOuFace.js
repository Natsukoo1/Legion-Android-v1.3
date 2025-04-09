const { MessageActionRow, MessageButton } = require('discord.js-selfbot-v13');

module.exports = {
    name: "pileouface",
    aliases: ["poof"],
    description: "Lance une pièce pour obtenir un résultat aléatoire (pile ou face).",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        message.delete();

        // Génère un résultat aléatoire (pile ou face)
        const result = Math.random() < 0.5 ? "Pile" : "Face";

        // Crée un bouton pour supprimer le résultat
        const deleteButton = new MessageButton()
            .setCustomId(`delete_pileouface_${message.id}`)
            .setLabel("Supprimer")
            .setStyle("DANGER");

        // Envoie le résultat en deux messages séparés avec le bouton "Supprimer"
        message.channel.send(`Résultat : **${result}**`, { components: [new MessageActionRow().addComponents(deleteButton)] });
    }
};
