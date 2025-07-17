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

        const whiteAvatarUrl = 'https://i.imgur.com/T3pOaH0.png';
        const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });

        // Construire URL Nekobot avec avatar blanc
        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(whiteAvatarUrl)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl);
            if (!response.data.success) return message.channel.send("Erreur génération image tweet.");

            const tweetImage = await Jimp.read(response.data.message);
            const avatarImage = await Jimp.read(avatarUrl);

            avatarImage.resize(80, 80);

            // Création du masque rond
            const mask = new Jimp(80, 80, 0x00000000);
            mask.scan(0, 0, mask.bitmap.width, mask.bitmap.height, function (x, y, idx) {
                const radius = 40;
                const centerX = 40;
                const centerY = 40;
                const dx = x - centerX;
                const dy = y - centerY;

                if (dx * dx + dy * dy <= radius * radius) {
                    mask.bitmap.data[idx + 0] = 255;
                    mask.bitmap.data[idx + 1] = 255;
                    mask.bitmap.data[idx + 2] = 255;
                    mask.bitmap.data[idx + 3] = 255;
                } else {
                    mask.bitmap.data[idx + 3] = 0;
                }
            });

            avatarImage.mask(mask, 0, 0);

            // Descendre l'image d'environ 2cm (~75 pixels)
            const avatarX = 65;
            const avatarY = 30;

            tweetImage.composite(avatarImage, avatarX, avatarY);

            const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);

            message.channel.send({ files: [{ attachment: buffer, name: "tweet.png" }] });

        } catch (err) {
            console.error(err);
            message.channel.send("Erreur lors de la création du tweet.");
        }
    }
};
