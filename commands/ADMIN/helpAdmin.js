const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "helpadmin",
    aliases: [],
    description: "Aide pour les commandes d'administration.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        message.delete();

        const imageURL = "https://media.discordapp.net/attachments/858849789977952286/1170012153311416411/MOSHED-2023-11-3-15-31-40.gif?width=632&height=632";

        const embed1 = new WebEmbed()
            .setTitle(">> Aide administration << \n\n>> ✨ Crée par Natsuko_ ✨ << ")
            .setColor("#3498db")
            .setDescription(
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                ">> ⛔️ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.2 ⛔️ <<\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "• Commandes d'administration :\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "• 𝙞𝙥𝙞𝙣𝙛𝙤\n" +
                "  (affiche des informations sur l'adresse IP)\n" +
                "• 𝙬𝙝𝙞𝙩𝙚𝙡𝙞𝙨𝙩\n" +
                "  (ajoute un utilisateur à la liste blanche)\n"
            );

        // Envoie le premier embed dans le canal
        message.channel.send({ embeds: [embed1] });
    }
};
