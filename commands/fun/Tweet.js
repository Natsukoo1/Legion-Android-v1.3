const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

module.exports = {
    name: "tweet",
    description: "Ajoute un tweet avec la vraie photo de profil sur l'avatar gris.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        if (message.deletable) {
            message.delete().catch(() => {});
        }

        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.channel.send("Veuillez mentionner un utilisateur.").then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        let nickname = mentionedUser.username;
        if (message.guild) {
            const mentionedMember = message.mentions.members.first();
            if (mentionedMember && mentionedMember.displayName) {
                nickname = mentionedMember.displayName;
            }
        }

        const tweetText = args.filter(arg => !arg.startsWith('<@')).join(" ");
        if (!tweetText) {
            return message.channel.send("Veuillez fournir le texte du tweet.").then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        // Utilise un avatar générique transparent (ou gris clair) pour générer le tweet sans avatar
        const genericAvatar = 'https://i.imgur.com/AfFp7pu.png';

        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;
                // Charger les images
                const [tweetImage, avatarImage] = await Promise.all([
                    loadImage(tweetImageUrl),
                    loadImage(mentionedUser.displayAvatarURL({ format: 'png', size: 128 }))
                ]);

                const canvas = createCanvas(tweetImage.width, tweetImage.height);
                const ctx = canvas.getContext('2d');

                // Dessiner l'image tweet complète
                ctx.drawImage(tweetImage, 0, 0);

                // Position et taille du cercle avatar (à ajuster précisément selon image tweet)
                const avatarSize = 80;
                const avatarX = 55;
                const avatarY = 35;

                // Dessiner avatar en rond (clip cercle)
                ctx.save();
                ctx.beginPath();
                ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
                ctx.restore();

                // Envoi image finale
                const buffer = canvas.toBuffer();
                message.channel.send({ files: [{ attachment: buffer, name: 'tweet_avatar.png' }] });
            } else {
                message.channel.send("Erreur lors de la génération du tweet.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Erreur lors de la création de l'image tweet.");
        }
    }
};
