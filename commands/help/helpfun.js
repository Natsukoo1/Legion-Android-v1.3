module.exports = {
    name: "helpfun",
    aliases: ['hf'],
    description: "Affiche l'aide pour les commandes fun.",
    run: async (message, args, command, client) => {
        // Supprimer le message initial
        if (message.deletable) {
            await message.delete().catch(console.error);
        }

        const helpMessage = 
            "```diff\n" +
            ">> 🤹 Aide Fun <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            ">>✨ 𝕃𝕖𝕘𝕚𝕠𝕟 𝕊𝕖𝕝𝕗𝔹𝕠𝕥 𝕍1.3 ✨ <<\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "```" +
            "```diff\n" +
            "• 𝙢𝙚𝙢𝙚 🤣\n" +
            "   (Affiche un meme aléatoire)\n\n" +
            "• 𝟴𝙗𝙖𝙡𝙡 + 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣 🎱\n" +
            "   (Posez une question à la 8-ball magique)\n\n" +
            "• 𝙧𝙖𝙣𝙙𝙤𝙢𝙣𝙪𝙢𝙗𝙚𝙧 + 𝙢𝙞𝙣 + 𝙢𝙖𝙭 🎲\n" +
            "   (Génère un nombre aléatoire entre min et max)\n\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙖𝙨𝙘𝙞𝙞 + 𝙩𝙚𝙭𝙩𝙚 🎨\n" +
            "   (Convertit du texte en art ASCII)\n\n" +
            "• 𝙘𝙤𝙞𝙣𝙛𝙡𝙞𝙥 🪙\n" +
            "   (Lance une pièce pour pile ou face)\n\n" +
            "• 𝙙𝙤𝙜 🐶\n" +
            "   (Affiche une image aléatoire d'un chien)\n\n" +
            "• 𝙡𝙤𝙫𝙚 ❤️\n" +
            "   (Test d'amour entre deux personnes)\n\n" +
            "• 𝙙𝙞𝙨𝙦𝙪𝙚𝙩𝙩𝙚 + @𝙪𝙨𝙚𝙧𝙣𝙖𝙢𝙚 💔\n" +
            "   (Disquette une personne)\n\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙗𝙡𝙖𝙜𝙪𝙚 😂\n" +
            "   (Affiche une blague aléatoire)\n\n" +
            "• 𝙧𝙞𝙙𝙙𝙡𝙚 ❓\n" +
            "   (Affiche une énigme ou devinette)\n\n" +
            "• 𝙝𝙪𝙜 + @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 🤗\n" +
            "   (Envoie un câlin à l'utilisateur mentionné)\n\n" +
            "• 𝙘𝙖𝙩 🐱\n" +
            "   (Affiche une image aléatoire d'un chat)\n\n" +
            "• 𝙜𝙤𝙪𝙯𝙞𝙜𝙤𝙪𝙯𝙞 @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 😄\n" +
            "   (Joue avec les joues)\n\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "• 𝙛𝙖𝙘𝙩 📜\n" +
            "   (Affiche un fait aléatoire)\n\n" +
            "• 𝙘𝙞𝙩𝙖𝙩𝙞𝙤𝙣 🌟\n" +
            "   (Obtient une citation inspirante)\n\n" +
            "• 𝙨𝙡𝙖𝙥 + @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 👋\n" +
            "   (Donne une gifle à l'utilisateur mentionné)\n\n" +
            "• 𝙙𝙖𝙣𝙘𝙚 🕺\n" +
            "   (Dance fortnite)\n\n" +
            "• 𝙥𝙝𝙘𝙤𝙢𝙢𝙚𝙣𝙩 @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 🔞\n" +
            "   (Affiche un message dans le style de Pornhub)\n\n" +
            "• 𝙘𝙡𝙮𝙙𝙚 𝙚𝙘𝙧𝙞𝙨 𝙪𝙣 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙙𝙚 𝙘𝙡𝙮𝙙𝙚 ✍️\n" +
            "   (Écrit un message de la part de Clyde)\n\n" +
            "• 𝘽𝙚𝙨𝙘𝙝𝙧𝙚𝙡𝙡𝙚 📚\n" +
            "   (Lance un bescherelle)\n\n" +
            "• 𝙥𝙙𝙥 @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 🖼️\n" +
            "   (Affiche la photo de profil d'un utilisateur mentionné)\n\n" +
            "• 𝙥𝙞𝙡𝙚𝙤𝙪𝙛𝙖𝙘𝙚 🪙\n" +
            "   (Joue à pile ou face)\n\n" +
            "• 𝙫𝙤𝙞𝙩𝙪𝙧𝙚 @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 🚗\n" +
            "   (Associe une voiture à un utilisateur mentionné)\n\n" +
            "• 𝙘𝙧𝙪𝙨𝙝 @𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 💘\n" +
            "   (Affiche le crush secret de l'utilisateur mentionné)\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━```";

        // Envoyer le message d'aide complet
        message.channel.send(helpMessage);
    }
};
