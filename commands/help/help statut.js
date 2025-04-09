module.exports = {
    name: "helpstatut",
    aliases: [],
    description: "Aide pour modifier le statut Discord.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Supprimer le message d'origine avec une légère attente
        if (message.deletable) {
            await message.delete().catch(console.error);
            await sleep(1000); // Attendre 1 seconde
        }

        // Message d'aide statut
        const helpMessage = 
            "```diff\n" +
            ">> Aide Statut Discord << \n\n" +
            ">> ✨ Crée par Natsuko_ ✨ << \n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "⛔️ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 ⛔️\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙟𝙤𝙪𝙚𝙧 <𝙟𝙚𝙪> 🎮\n   (Définit le statut en train de jouer à un jeu)\n" +
            "• 𝙨𝙩𝙧𝙚𝙖𝙢𝙞𝙣𝙜 <𝙡𝙞𝙚𝙣> <𝙣𝙤𝙢 𝙙𝙪 𝙟𝙚𝙪> 📺\n   (Définit le statut en streaming avec un lien et le nom du jeu)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙢𝙪𝙨𝙞𝙦𝙪𝙚 <𝙢𝙪𝙨𝙞𝙦𝙪𝙚> 🎶\n   (Définit le statut en train d'écouter de la musique)\n" +
            "• 𝙫𝙞𝙙𝙚𝙤 <𝙫𝙞𝙙𝙚𝙤> 🎥\n   (Définit le statut en train de regarder une vidéo)\n" +
            "• 𝙘𝙤𝙢𝙥𝙚𝙩𝙞𝙩𝙞𝙤𝙣 <𝙘𝙤𝙢𝙥𝙚𝙩𝙞𝙩𝙞𝙤𝙣> 🏆\n   (Définit le statut en train de participer à une compétition)\n" +
            "• 𝙥𝙝𝙤𝙩𝙤 <𝙇𝙞𝙚𝙣> 🖼️\n   (Change ta photo de profil)\n" +
            "```";

        // Envoie le message d'aide dans le canal
        message.channel.send(helpMessage);
    }
};

// Fonction d'attente
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
