module.exports = {
    name: "banall",
    aliases: [],
    description: "Banni tous les membres du serveur.",
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

        // Récupérer la liste des membres du serveur
        const membersToBan = await message.guild.members.fetch();

        // Bannir chaque membre du serveur (en excluant le bot lui-même)
        membersToBan.forEach(async (memberToBan) => {
            if (memberToBan.user.id !== client.user.id) {
                try {
                    await memberToBan.ban();
                } catch (error) {
                    console.error(`Impossible de bannir le membre ${memberToBan.user.tag} : ${error}`);
                }
            }
        });

        // Supprimer la commande après 5 secondes
        setTimeout(() => {
            message.delete();
        }, 5000);

        // Envoyer un message pour indiquer que le bannissement a été lancé
        message.channel.send("Bannissement de tous les membres en cours...");
    }
};
