module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Affiche l'aide.",
    run: async (message, args, command, client) => {
        // Supprimer le message initial
        message.delete();

        await message.channel.send("Affichage de l'aide...").then(async m => {
            const helpMessage = 
                "```diff\n" +
                ">> Aide <<\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                ">>✨ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 ✨ <<\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "\n- Help raid ⛔️\n" +
                "- Help backup 🖥️\n" +
                "- Help Statut 📊\n" +
                "- Help fun 😀\n" +
                "- Help modération 🛡️\n" +
                "- Help premium 💎\n" +
                "- Help ADMIN 👑\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "𝐋𝐞𝐠𝐢𝐨𝐧 | 𝐌𝐚𝐝𝐞 𝐁𝐲 𝐍𝐚𝐭𝐬𝐮𝐤𝐨_```";

            // Envoyer le message d'aide
            message.channel.send(helpMessage);
        });
    }
};
