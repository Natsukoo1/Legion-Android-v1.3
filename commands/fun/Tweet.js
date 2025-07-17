const Jimp = require('jimp');
const axios = require('axios');

module.exports = {
    name: "tweet",
    description: "Ajoute un tweet sur la photo de profil d'un utilisateur mentionné.",
    run: async (message, args) => {
        if (message.author.bot) return;
        if (message.deletable) message.delete().catch(() => {});

        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.channel.send("Veuillez mentionner un utilisateur.").then(m => setTimeout(() => m.delete(), 5000));
        }

        let nickname = mentionedUser.username;
        if (message.guild) {
            const member = message.guild.members.cache.get(mentionedUser.id);
            if (member && member.displayName) nickname = member.displayName;
        }

        const tweetText = args.filter(arg => !arg.startsWith('<@')).join(" ");
        if (!tweetText) {
            return message.channel.send("Veuillez fournir le texte du tweet.").then(m => setTimeout(() => m.delete(), 5000));
        }

        const whiteAvatarUrl = 'https://i.imgur.com/T3pOaH0.png'; // avatar blanc
        const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });

        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(whiteAvatarUrl)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl);
            if (!response.data.success) return message.channel.send("Erreur génération image tweet.");

            const tweetImage = await Jimp.read(response.data.message);
            const avatarImage = await Jimp.read(avatarUrl);

            const avatarSize = 80;
            avatarImage.resize(avatarSize, avatarSize);

            // Créer un masque rond simple
            const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
            mask.scan(0, 0, avatarSize, avatarSize, (x, y, idx) => {
                const radius = avatarSize / 2;
                const centerX = radius;
                const centerY = radius;
                const dx = x - centerX;
                const dy = y - centerY;
                if (dx * dx + dy * dy <= radius * radius) {
                    mask.bitmap.data[idx + 3] = 255; // alpha opaque dans le cercle
                }
            });

            avatarImage.mask(mask, 0, 0);

            // Décaler la photo vers le bas de 60px
            const avatarX = 50;
            const avatarY = 28 + 60;

            tweetImage.composite(avatarImage, avatarX, avatarY);

            const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);
            message.channel.send({ files: [{ attachment: buffer, name: "tweet.png" }] });

        } catch (err) {
            console.error(err);
            message.channel.send("Erreur lors de la création du tweet.");
        }
    }
};
