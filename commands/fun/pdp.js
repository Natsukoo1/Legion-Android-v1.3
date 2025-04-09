const { MessageActionRow, MessageButton } = require('discord.js-selfbot-v13');

module.exports = {
    name: "pp",
    aliases: ["avatar"],
    description: "Affiche le lien de la photo de profil d'un utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifie si un utilisateur est mentionné
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Veuillez mentionner un utilisateur.");
            return;
        }

        message.delete();

        // Envoie le lien de la photo de profil de l'utilisateur mentionné avec le bouton "Supprimer"
        message.channel.send(`Photo de profil de ${mentionedUser.username}:`);
        message.channel.send(`${mentionedUser.displayAvatarURL()}`);
    }
};
