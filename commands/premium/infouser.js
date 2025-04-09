const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "infouser",
    aliases: [],
    description: "Affiche des informations sur le compte d'un utilisateur Discord",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Supprime la commande initiale
        message.delete();

        // Vérifie si un utilisateur est mentionné dans la commande
        const targetUser = message.mentions.users.first() || message.author;

        // Fetch user data to include banners
        await targetUser.fetch();

        // Crée un embed pour afficher les informations
        const userInfoEmbed = new WebEmbed()
            .setTitle("Informations sur l'utilisateur")
            .setColor("#3498db") // Couleur bleue
            .setDescription(
                `>> Nom d'utilisateur: ${targetUser.username}\n` +
                `>> Tag: #${targetUser.discriminator}\n` +
                `>> ID: ${targetUser.id}\n` +
                `>> Compte créé le: ${targetUser.createdAt.toUTCString()}\n` +
                `>> Bannière: ${targetUser.bannerURL({ dynamic: true }) ? targetUser.bannerURL({ dynamic: true }) : "Aucune bannière"}\n` +
                `>> Badges: ${targetUser.flags.toArray().join(", ") || "Aucun badge"}`
            )
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))

        // Envoyer l'embed dans le canal où la commande a été utilisée
        message.channel.send({ embeds: [userInfoEmbed] });
    }
};
