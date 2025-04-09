const axios = require("axios");

module.exports = {
    name: "phcomment",
    description: "Ajoute un commentaire à la photo de profil d'un utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Supprimer le message contenant la commande
        message.delete();

        // Vérifier si un utilisateur est mentionné dans le message
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            message.channel.send("Veuillez mentionner un utilisateur.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000); // Supprimer le message d'erreur après 5 secondes
            });
            return;
        }

        // Obtenir l'URL de la photo de profil de l'utilisateur mentionné
        const userImage = mentionedUser.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });

        // Obtenir le pseudo (nickname) de l'utilisateur
        let nickname;
        if (message.guild) {
            const member = message.guild.members.cache.get(mentionedUser.id);
            nickname = member ? member.displayName : mentionedUser.username;
        } else {
            nickname = mentionedUser.username;
        }

        // Si le message est envoyé en MP, utilisez le displayName à la place du username
        if (!message.guild) {
            nickname = mentionedUser.displayName || mentionedUser.username;
        }

        // Vérifier si le texte du commentaire est fourni
        const commentText = args.slice(1).join(" ");
        if (!commentText) {
            message.channel.send("Veuillez fournir le texte du commentaire.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000); // Supprimer le message d'erreur après 5 secondes
            });
            return;
        }

        // Paramètre raw pour obtenir des octets d'image bruts
        const rawOption = args.includes("--raw") ? '&raw=1' : '';

        // L'URL de l'API NekoBot pour ajouter un commentaire à la photo de profil
        const phcommentApiUrl = `https://nekobot.xyz/api/imagegen?type=phcomment&image=${encodeURIComponent(userImage)}&text=${encodeURIComponent(commentText)}&username=${encodeURIComponent(nickname)}${rawOption}`;

        try {
            const response = await axios.get(phcommentApiUrl);

            if (response.status === 200 && response.data.success) {
                const imageUrl = response.data.message; // Obtenir l'URL de l'image avec le commentaire

                // Envoyez le lien de l'image avec le commentaire dans le canal ou en MP
                message.channel.send(imageUrl);
            } else {
                message.channel.send("Une erreur s'est produite lors de l'ajout du commentaire à l'image.").then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000); // Supprimer le message d'erreur après 5 secondes
                });
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de l'ajout du commentaire à l'image.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000); // Supprimer le message d'erreur après 5 secondes
            });
        }
    }
};
