module.exports = {
    name: "helpmodération",
    aliases: ['hm'],
    description: "Aide pour gérer les membres du serveur.",
    run: async (message, args, command, client) => {
        // Supprimer le message initial
        message.delete();

        const helpMessage = 
            "```diff\n" +
            ">> Commandes de Gestion de Membres <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            ">>✨ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 ✨ <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "\n- 🔨 𝙗𝙖𝙣 <𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧> : Bannit un utilisateur du serveur.\n" +
            "- 🚪 𝙠𝙞𝙘𝙠 <𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧> : Expulse un utilisateur du serveur.\n" +
            "- 🗑️ 𝙗𝙖𝙣𝙖𝙡𝙡 : Bannit tous les utilisateurs du serveur.\n" +
            "- 🏃‍♂️ 𝙠𝙞𝙘𝙠𝙖𝙡𝙡 : Expulse tous les utilisateurs du serveur.\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "𝐋𝐞𝐠𝐢𝐨𝐧 | 𝐌𝐚𝐝𝐞 𝐁𝐲 𝐍𝐚𝐭𝐬𝐮𝐤𝐨_```";

        // Envoyer le message d'aide
        message.channel.send(helpMessage);
    }
};
