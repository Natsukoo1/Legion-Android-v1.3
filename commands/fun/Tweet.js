const axios = require('axios');
const Jimp = require('jimp');

module.exports = {
    name: "tweet",
    description: "Tweet avec photo de profil intégrée sans canvas",
    run: async (message, args) => {
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

        // URL avatar par défaut grise (pour que l'API génère un tweet avec espace avatar gris)
        const genericAvatar = 'https://i.imgur.com/AfFp7pu.png';

        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;

                // Chargement images
                const tweetImage = await Jimp.read(tweetImageUrl);
                const avatarImage = await Jimp.read(mentionedUser.displayAvatarURL({ format: 'png', size: 128 }));

                // Redimension avatar
                const avatarSize = 80;
                avatarImage.resize(avatarSize, avatarSize);

                // Masque rond
                const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
                mask.scan(0, 0, avatarSize, avatarSize, function (x, y, idx) {
                    const radius = avatarSize / 2;
                    const centerX = radius;
                    const centerY = radius;
                    const dx = x - centerX;
                    const dy = y - centerY;
                    if (dx * dx + dy * dy <= radius * radius) {
                        this.bitmap.data[idx + 3] = 255;
                    }
                });

                avatarImage.mask(mask, 0, 0);

                // Position du petit avatar dans l'image tweet
                const avatarX = 55;
                const avatarY = 35;

                tweetImage.composite(avatarImage, avatarX, avatarY);

                const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);

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
