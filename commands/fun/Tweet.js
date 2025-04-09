const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

module.exports = {
    name: "tweet",
    description: "Ajoute un tweet sur la photo de profil d'un utilisateur mentionné.",
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
                }, 5000);
            });
            return;
        }

        // Obtenir l'URL de la photo de profil de l'utilisateur mentionné
        const userImage = mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        // Obtenir le pseudo (nickname) de l'utilisateur
        let nickname;
        if (message.guild) { // Vérification que le message provient d'un serveur
            const member = message.guild.members.cache.get(mentionedUser.id);
            nickname = member ? member.displayName : mentionedUser.username;
        } else {
            nickname = mentionedUser.username; // Si message provient d'un DM, on utilise simplement le nom d'utilisateur
        }

        // Vérifier si le texte du tweet est fourni
        const tweetText = args.slice(1).join(" ");
        if (!tweetText) {
            message.channel.send("Veuillez fournir le texte du tweet.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
            return;
        }

        // Vérifier les permissions du bot dans le canal avant d'envoyer le message
        const botPermissions = message.channel.permissionsFor(message.guild.members.me);
        if (!botPermissions || !botPermissions.has("SEND_MESSAGES")) {
            return message.channel.send("Je n'ai pas la permission d'envoyer des messages dans ce salon.");
        }

        // Générer l'image de base avec NekoBot
        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(userImage)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl);
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message; // L'URL de l'image générée avec le tweet

                // Charger l'image générée et l'avatar
                const [tweetImage, avatarImage] = await Promise.all([
                    loadImage(tweetImageUrl),
                    loadImage(userImage)
                ]);

                // Créer un canvas pour dessiner l'image générée et l'avatar
                const canvas = createCanvas(tweetImage.width, tweetImage.height);
                const ctx = canvas.getContext('2d');

                // Dessiner l'image générée
                ctx.drawImage(tweetImage, 0, 0);

                // Dessiner l'avatar en rond à gauche (positionnement plus haut et taille réduite)
                const avatarSize = 80; // Taille de l'avatar réduite à 80px
                const avatarX = 55; // Position horizontale de l'avatar à 60px du bord gauche (ajusté encore plus à gauche)
                const avatarY = 35; // Position verticale de l'avatar, monté à 40px du bord supérieur

                // Créer un cercle pour l'avatar
                ctx.save();
                ctx.beginPath();
                ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip(); // Appliquer le clip (le cercle) à l'avatar

                // Dessiner l'avatar dans le cercle
                ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
                ctx.restore(); // Restaurer le contexte pour ne pas affecter d'autres dessins

                // Envoyer l'image résultante dans le même canal où la commande a été envoyée
                const buffer = canvas.toBuffer();
                message.channel.send({ files: [{ attachment: buffer, name: 'tweet_image.png' }] });
            } else {
                message.channel.send("Une erreur s'est produite lors de l'ajout du tweet à l'image.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de l'ajout du tweet à l'image.");
        }
    }
};
