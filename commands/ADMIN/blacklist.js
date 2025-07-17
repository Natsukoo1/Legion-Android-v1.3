const fs = require('fs');
const path = 'blacklist.json';

module.exports = {
    name: "blacklist",
    description: "Ajoute un utilisateur à la blacklist via une mention ou une ID.",
    run: async (message, args) => {
        if (!args[0]) {
            return message.channel.send("Veuillez mentionner un utilisateur ou entrer une ID.");
        }

        let userId;
        let userTag;

        // Vérification si c'est une mention
        const userMention = message.mentions.users.first();
        if (userMention) {
            userId = userMention.id;
            userTag = userMention.tag;
        } else {
            // Si ce n'est pas une mention, vérifier si l'argument est une ID valide
            userId = args[0];
            if (!/^\d+$/.test(userId)) {
                return message.channel.send("Veuillez entrer une ID valide.");
            }

            // Tenter de récupérer l'utilisateur via l'ID
            try {
                const user = await message.client.users.fetch(userId);
                userTag = user.tag;
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                return message.channel.send("Impossible de récupérer l'utilisateur. L'ID peut être invalide.");
            }
        }

        let blacklist = [];

        // Charger la blacklist existante si elle existe
        if (fs.existsSync(path)) {
            blacklist = JSON.parse(fs.readFileSync(path));
        }

        // Ajouter l'utilisateur à la blacklist si ce n'est pas déjà fait
        if (!blacklist.includes(userId)) {
            blacklist.push(userId);
            fs.writeFileSync(path, JSON.stringify(blacklist, null, 4));
            message.channel.send(`${userTag} a été ajouté à la blacklist.`);
        } else {
            message.channel.send(`${userTag} est déjà dans la blacklist.`);
        }
    }
};
