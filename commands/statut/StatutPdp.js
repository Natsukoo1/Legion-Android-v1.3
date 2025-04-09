module.exports = {
    name: "pdp",
    aliases: ["changepfp"],
    description: "Change la photo de profil avec le lien d'une image.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes
            return;
        }

        if (!message.author.id === "ID_DE_VOTRE_UTILISATEUR_BOT") {
            // Vérifiez si l'auteur de la commande est le propriétaire d
            message.channel.send("Seul le propriétaire du compte peut utiliser cette commande.");
            return;
        }

        if (args.length < 1) {
            message.channel.send("Utilisation incorrecte. Veuillez fournir un lien vers une image pour changer la photo de profil.");
            return;
        }

        const imageLink = args[0];

        // Supprimer le message de la commande
        message.delete();

        try {
            await client.user.setAvatar(imageLink);
            const successMessage = await message.channel.send("La photo de profil a été mise à jour avec succès !");
            
            // Supprimer le message de succès après 5 secondes
            setTimeout(() => {
                successMessage.delete();
            }, 5000);
        } catch (error) {
            console.error(`Impossible de changer la photo de profil: ${error}`);
            message.channel.send("Une erreur s'est produite lors de la mise à jour de la photo de profil.");
        }
    }
};
