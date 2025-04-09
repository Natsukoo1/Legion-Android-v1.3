const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "8ball",
    aliases: [],
    description: "Posez une question à la Magic 8-Ball.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        message.delete();

        const responses = [
            "C'est certain.",
            "C'est décidément ainsi.",
            "Sans aucun doute.",
            "Oui, définitivement.",
            "Vous pouvez compter dessus.",
            "Comme je le vois, oui.",
            "Il en est ainsi.",
            "Il en est décidé ainsi.",
            "Très probablement.",
            "Les signes pointent vers le oui.",
            "Réponse floue, réessayez.",
            "Demandez à nouveau plus tard.",
            "Mieux vaut ne pas vous le dire maintenant.",
            "Je ne peux pas prédire maintenant.",
            "Concentrez-vous et demandez à nouveau.",
            "Ne comptez pas là-dessus.",
            "Ma réponse est non.",
            "Mes sources disent non.",
            "Les perspectives ne sont pas si bonnes.",
            "Très douteux."
        ];

        const question = args.join(" ");
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const embed = new WebEmbed()
            .setTitle("Magic 8-Ball")
            .setColor("#3498db")
            .setDescription(`Question : ${question}\nRéponse : ${randomResponse}`);

        // Envoie la réponse de la Magic 8-Ball dans le même canal
        message.channel.send({ embeds: [embed] });
    }
};
