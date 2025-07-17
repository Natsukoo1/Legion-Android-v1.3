const axios = require('axios');
const Jimp = require('jimp');

module.exports = {
    name: "tweet",
    description: "Génère un tweet avec la vraie photo de profil intégrée sans canvas, grâce à Jimp.",
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

        // Avatar générique transparent pour la génération (remplace par un gris si tu veux)
        const genericAvatar = 'https://i.imgur.com/AfFp7pu.png';

        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;

                // Charger les images avec Jimp
                const [tweetImage, avatarImageRaw] = await Promise.all([
                    Jimp.read(tweetImageUrl),
                    Jimp.read(mentionedUser.displayAvatarURL({ format: 'png', size: 128 }))
                ]);

                // Redimensionner avatar à la taille désirée (80x80)
                const avatarSize = 80;
                avatarImageRaw.resize(avatarSize, avatarSize);

                // Pour faire un masque circulaire sur l'avatar (Jimp ne fait pas ça direct, on va tricher avec alpha mask)
                // Créer un masque circulaire
                const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
                mask.scan(0, 0, avatarSize, avatarSize, function (x, y, idx) {
                    const radius = avatarSize / 2;
                    const centerX = radius;
                    const centerY = radius;
                    const dx = x - centerX;
                    const dy = y - centerY;
                    if (dx * dx + dy * dy <= radius * radius) {
                        // Alpha = 255 (opaque)
                        this.bitmap.data[idx + 3] = 255;
                    }
                });

                // Appliquer le masque circulaire sur l'avatar
                avatarImageRaw.mask(mask, 0, 0);

                // Position du cercle avatar sur l'image tweet (à ajuster si besoin)
                const avatarX = 55;
                const avatarY = 35;

                // Coller l'avatar masqué sur l'image tweet
                tweetImage.composite(avatarImageRaw, avatarX, avatarY);

                // Exporter en buffer
                const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);

                // Envoyer le résultat
                message.channel.send({ files: [{ attachment: buffer, name: 'tweet_avatar.png' }] });
            } else {
                message.channel.send("Erreur lors de la génération du tweet.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur est survenue lors de la création de l'image tweet.");
        }
    }
};
