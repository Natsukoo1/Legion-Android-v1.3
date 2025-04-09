module.exports = {
    name: "helpbackup",
    aliases: ['hm'],
    description: "Aide pour gérer les sauvegardes du serveur.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        message.delete();

        const helpMessage = 
            "```diff\n" +
            ">> Commandes de Gestion de Sauvegardes << \n\n>> Crée par Natsuko_ <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "🔒 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 🔒\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙗𝙖𝙘𝙠𝙪𝙥 𝙘𝙧𝙚𝙖𝙩𝙚 🗂️\n" +
            "   (Backup un serveur)\n" +
            "• 𝙗𝙖𝙘𝙠𝙪𝙥 𝙡𝙤𝙖𝙙 + 𝙞𝙙 ⬇️\n" +
            "   (Importer une backup)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "```";

        // Envoyer le message d'aide complet
        message.channel.send(helpMessage);
    }
};
