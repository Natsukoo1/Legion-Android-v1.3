module.exports = {
    name: "espace",
    description: "envoie un message avec des espaces.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Supprimer le message de la commande
        message.delete();

        // Construire le message avec des caractères invisibles
        const invisibleChars = "ㅤ\nㅤ\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ";
        const userMessage = args.join(" "); // Rejoindre les arguments pour former le message de l'utilisateur
        const finalMessage = `${invisibleChars} ${userMessage}`;

        // Envoyer le message final dans le canal
        message.channel.send(finalMessage);
    }
};
