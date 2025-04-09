const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "nombrerandom",
    aliases: ["random"],
    description: "Génère un nombre aléatoire dans une plage donnée.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifier que deux arguments (min et max) ont été fournis
        if (args.length !== 2) {
            return message.channel.send("Veuillez spécifier deux nombres (min et max). Exemple : !randomnumber 1 100");
        }

        const min = parseInt(args[0]);
        const max = parseInt(args[1]);

        // Vérifier que min et max sont des nombres valides
        if (isNaN(min) || isNaN(max)) {
            return message.channel.send("Veuillez spécifier deux nombres valides (min et max).");
        }

        if (min >= max) {
            return message.channel.send("Le nombre minimum doit être inférieur au nombre maximum.");
        }

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        const embed = new WebEmbed()
            .setTitle("Résultat Nombre Aléatoire")
            .setColor("#3498db")
            .setDescription(`Le nombre aléatoire est : **${randomNum}** (entre ${min} et ${max})`);

        // Envoie le résultat dans le même canal
        message.channel.send({ embeds: [embed] })
            .catch(error => {
                console.error(`Erreur lors de l'envoi du message : ${error}`);
            });
    }
};
