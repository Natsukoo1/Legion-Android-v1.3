module.exports = {
    name: "helpraid",
    aliases: [],
    description: "Aide pour les commandes amusantes.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        message.delete();

        const helpMessage = 
            "```diff\n" +
            ">> Aide raid <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            ">> ⛔️ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 ⛔️ <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙧𝙖𝙞𝙙 + 𝙘𝙝𝙞𝙛𝙛𝙧𝙚 💥\n" +
            "  (Crée des channels + le nombre)\n" +
            "• 𝙃𝙞𝙙𝙙𝙚𝙣𝙥𝙞𝙣𝙜 + 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 👤\n" +
            "  (Met un everyone invisible)\n" +
            "• 𝙧𝙚𝙢𝙤𝙫𝙚𝙘𝙝𝙖𝙣𝙚𝙡 ❌\n" +
            "  (Supprime tous les channels d'un serveur)\n" +
            "• 𝙣𝙪𝙠𝙚 + 𝙘𝙝𝙞𝙛𝙛𝙧𝙚 + 𝙘𝙝𝙞𝙛𝙛𝙧𝙚 💣\n" +
            "  (Détruit le serveur + channels + messages)\n" +
            "• 𝙢𝙖𝙨𝙨𝙥𝙞𝙣𝙜 + 𝙘𝙝𝙞𝙛𝙛𝙧𝙚 📢\n" +
            "  (Spam un nombre de messages)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "```";

        // Envoyer le message d'aide complet
        message.channel.send(helpMessage);
    }
};
