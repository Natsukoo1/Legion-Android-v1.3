module.exports = {
    name: "ban",
    aliases: [],
    description: "Bannit un membre du serveur en le mentionnant.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Vérifier si l'auteur de la commande a les autorisations nécessaires pour bannir des membres.
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            const permissionMessage = await message.channel.send("Vous n'avez pas la permission de bannir des membres.");
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

        // Vérifier que l'utilisateur a mentionné un membre à bannir.
        const memberToBan = message.mentions.members.first();

        if (!memberToBan) {
            const mentionMessage = await message.channel.send("Veuillez mentionner le membre que vous souhaitez bannir.");
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

        // Bannir le membre mentionné.
        try {
            await memberToBan.ban();
            const successMessage = await message.channel.send(`Membre ${memberToBan.user.tag} banni avec succès.`);
            // Supprimer le message de succès après 5 secondes
            setTimeout(() => {
                successMessage.delete();
            }, 5000);
        } catch (error) {
            console.error(`Impossible de bannir le membre : ${error}`);
            message.channel.send("Une erreur s'est produite lors du bannissement du membre.");
        } finally {
            // Supprimer la commande après 5 secondes
            setTimeout(() => {
                message.delete();
            }, 5000);
        }
    }
};
