const { MessageActionRow, MessageButton } = require('discord.js-selfbot-v13');
const Discord = require('discord.js-selfbot-v13');


// Objet pour stocker les résultats de crush par utilisateur
const crushResults = {};

module.exports = {
    name: "crush",
    description: "Révèle le crush secret sur un membre du serveur.",
    run: async (message, args, command, client) => {
        // Vérifie si une personne est mentionnée
        const mentionedMember = message.mentions.members.first();
        if (!mentionedMember) {
            message.channel.send("Veuillez mentionner une personne pour révéler son crush secret.");
            return;
        }

        // Vérifie si le résultat de crush a déjà été généré pour cet utilisateur
        if (crushResults[mentionedMember.id]) {
            const { pseudo, percentage } = crushResults[mentionedMember.id];
            const pseudoMention = pseudo instanceof Discord.User ? pseudo.toString() : pseudo;
            message.channel.send(`${mentionedMember} a déjà un crush sur ${pseudoMention} avec un pourcentage de ${percentage}% ! 🙊`);
        } else {
            // Génère un pseudo aléatoire du serveur
            const randomPseudoMember = message.guild.members.cache.random();
            const randomPseudo = randomPseudoMember.displayName;

            // Génère un pourcentage aléatoire
            const crushPercentage = Math.floor(Math.random() * 101);

            // Stocke le résultat de crush pour cet utilisateur
            crushResults[mentionedMember.id] = { pseudo: randomPseudoMember, percentage: crushPercentage };

            // Envoie le message du crush secret avec le pourcentage
            message.channel.send(`${mentionedMember} a un crush secrètement sur ${randomPseudoMember} avec un pourcentage de ${crushPercentage}% ! 🙊`);
        }
    },
};
