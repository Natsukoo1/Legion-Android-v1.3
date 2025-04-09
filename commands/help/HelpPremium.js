module.exports = {
    name: "helppremium",
    aliases: [],
    description: "Aide premium Discord.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Supprimer le message initial
        message.delete();

        // Message d'aide premium
        const helpMessage = 
            "```diff\n" +
            ">> Aide Premium << \n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "💎 Créé par Natsuko_ 💎\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
            "Commandes premium:\n\n" +
            "• 𝙙𝙙𝙤𝙨𝙫𝙤𝙘𝙖𝙡 🥳\n" +
            "   (Fait lag le vocal)\n" +
            "• 𝙙𝙚𝙡𝙚𝙩𝙚 <𝙣𝙤𝙢𝙗𝙧𝙚> ❌\n" +
            "   (Supprime tes messages)\n" +
            "• 𝙣𝙞𝙩𝙧𝙤 🚀\n" +
            "   (Active le nitro sniper)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙪𝙨𝙚𝙧𝙞𝙣𝙛𝙤 + @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 👤\n" +
            "   (Donnes les informations sur un utilisateur)\n" +
            "• 𝙨𝙥𝙖𝙢𝙫𝙤𝙘𝙖𝙡 📡\n" +
            "   (Ping 50 messages sur le vocal où tu te situes)\n" +
            "• 𝙗𝙙 📊\n" +
            "   (Fait une base de données du serveur)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙖𝙛𝙠 💤\n" +
            "   (Active/désactive le mode afk)\n" +
            "• 𝙡𝙤𝙜𝙚𝙙𝙞𝙩 📝\n" +
            "   (Active/desactive les logedit)\n" +
            "• 𝙡𝙤𝙜𝙙𝙚𝙡𝙚𝙩𝙚 🗑️\n" +
            "   (Active/désactive les logdelete)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "```";

        // Envoie le message d'aide dans le canal
        message.channel.send(helpMessage);
    }
};
