const Jimp = require('jimp');
const axios = require('axios');

module.exports = {
    name: "tweet",
    description: "Ajoute un tweet sur la photo de profil d'un utilisateur mentionné.",
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

        const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });

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

        // Utiliser un avatar blanc uni à la place du rond gris
        // Pour avoir un fond propre à remplacer
        const whiteAvatar = 'https://i.imgur.com/T3pOaH0.png'; // image carrée blanche

        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(whiteAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 15000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;

                // Charger les images
                const tweetImage = await Jimp.read(tweetImageUrl);
                const avatarImage = await Jimp.read(avatarUrl);

                const avatarSize = 80;
                avatarImage.resize(avatarSize, avatarSize);

                // Création d'un masque rond pour l'avatar
                const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
                mask.scan(0, 0, avatarSize, avatarSize, (x, y, idx) => {
                    const radius = avatarSize / 2;
                    const centerX = radius;
                    const centerY = radius;
                    const dx = x - centerX;
                    const dy = y - centerY;
                    if (dx * dx + dy * dy <= radius * radius) {
                        mask.bitmap.data[idx + 3] = 255; // alpha opaque
                    }
                });
                avatarImage.mask(mask, 0, 0);

                // Position précise du rond sur l'image tweet Nekobot
                const avatarX = 55;
                const avatarY = 35;

                // Coller avatar masqué sur le tweet
                tweetImage.composite(avatarImage, avatarX, avatarY);

                // Envoyer le résultat
                const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);
                message.channel.send({ files: [{ attachment: buffer, name: 'tweet_image.png' }] });

            } else {
                message.channel.send("Erreur lors de la génération du tweet.");
            }
        } catch (err) {
            console.error(err);
            message.channel.send("Erreur lors de la création de l'image.");
        }
    }
};
