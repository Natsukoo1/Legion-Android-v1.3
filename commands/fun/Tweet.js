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

        // Pseudo affiché sur le serveur si possible
        let nickname = mentionedUser.username;
        if (message.guild) {
            const mentionedMember = message.mentions.members.first();
            if (mentionedMember && mentionedMember.displayName) {
                nickname = mentionedMember.displayName;
            }
        }

        // Texte du tweet sans mention
        const tweetText = args.filter(arg => !arg.startsWith('<@')).join(" ");
        if (!tweetText) {
            return message.channel.send("Veuillez fournir le texte du tweet.").then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        // URL avatar gris générique (l’API a besoin d’une image)
        const genericAvatar = 'https://i.imgur.com/AfFp7pu.png';

        // URL API Nekobot
        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            // Récupérer l’image tweet générée
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status !== 200 || !response.data.success) {
                return message.channel.send("Erreur lors de la génération du tweet.");
            }

            const tweetImageUrl = response.data.message;

            // Charger image tweet
            const tweetImage = await Jimp.read(tweetImageUrl);

            // Charger avatar réel (format PNG taille 128)
            const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });
            const avatarImage = await Jimp.read(avatarUrl);

            // Redimensionner avatar à 80x80
            const avatarSize = 80;
            avatarImage.resize(avatarSize, avatarSize);

            // Créer masque rond
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

            // Appliquer masque rond sur avatar
            avatarImage.mask(mask, 0, 0);

            // Position exacte de l'avatar dans l'image tweet (validé visuellement)
            const avatarX = 55;
            const avatarY = 35;

            // Coller l’avatar sur l’image tweet
            tweetImage.composite(avatarImage, avatarX, avatarY);

            // Générer buffer PNG
            const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);

            // Envoyer le résultat
            message.channel.send({ files: [{ attachment: buffer, name: 'tweet_avatar.png' }] });

        } catch (error) {
            console.error(error);
            message.channel.send("Erreur lors de la création de l'image tweet.");
        }
    }
};
