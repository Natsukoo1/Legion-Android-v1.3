module.exports = {
    name: "kick",
    aliases: [],
    description: "Expulse un membre du serveur en le mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifier si l'auteur de la commande a les autorisations nécessaires pour expulser des membres.
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            const permissionMessage = await message.channel.send("Vous n'avez pas la permission d'expulser des membres.");
            // Supprimer le message d'autorisation après 5 secondes
            setTimeout(() => {
                permissionMessage.delete();
            }, 5000);
            
            // Supprimer la commande après 5 secondes
            setTimeout(() => {
                message.delete();
            }, 5000);
            return;
        }

        // Vérifier que l'utilisateur a mentionné un membre à expulser.
        const memberToKick = message.mentions.members.first();

        if (!memberToKick) {
            const mentionMessage = await message.channel.send("Veuillez mentionner le membre que vous souhaitez expulser.");
            // Supprimer le message de mention après 5 secondes
            setTimeout(() => {
                mentionMessage.delete();
            }, 5000);

            // Supprimer la commande après 5 secondes
            setTimeout(() => {
                message.delete();
            }, 5000);
            return;
        }

        // Expulser le membre mentionné.
        try {
            await memberToKick.kick();
            const successMessage = await message.channel.send(`Membre ${memberToKick.user.tag} expulsé avec succès.`);
            // Supprimer le message de succès après 5 secondes
            setTimeout(() => {
                successMessage.delete();
            }, 5000);
        } catch (error) {
            console.error(`Impossible d'expulser le membre : ${error}`);
            message.channel.send("Une erreur s'est produite lors de l'expulsion du membre.");
        } finally {
            // Supprimer la commande après 5 secondes
            setTimeout(() => {
                message.delete();
            }, 5000);
        }
    }
};
