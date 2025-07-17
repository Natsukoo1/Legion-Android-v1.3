const axios = require('axios');
const Jimp = require('jimp');

module.exports = {
    name: "tweet",
    description: "Tweet avec photo de profil affichée (Jimp)",
    run: async (message, args) => {
        if (message.author.bot) return;
        if (message.deletable) message.delete().catch(() => {});

        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.channel.send("Veuillez mentionner un utilisateur.").then(m => {
                setTimeout(() => m.delete(), 5000);
            });
        }

        // Pseudo à afficher (nickname ou username)
        let nickname = mentionedUser.username;
        if (message.guild) {
            const member = message.guild.members.cache.get(mentionedUser.id);
            if (member && member.displayName) nickname = member.displayName;
        }

        const tweetText = args.filter(arg => !arg.startsWith('<@')).join(' ');
        if (!tweetText) {
            return message.channel.send("Veuillez fournir le texte du tweet.").then(m => {
                setTimeout(() => m.delete(), 5000);
            });
        }

        try {
            // On utilise une image de fond neutre pour le tweet (avatar gris)
            const genericAvatar = 'https://i.imgur.com/AfFp7pu.png';

            // Appel à l'API Nekobot
            const apiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

            const response = await axios.get(apiUrl, { timeout: 10000 });
            if (!response.data.success) {
                return message.channel.send("Erreur lors de la génération du tweet.");
            }

            // Charger l'image tweet
            const tweetImage = await Jimp.read(response.data.message);

            // Charger l'avatar Discord (PNG 128x128)
            const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });
            const avatarImage = await Jimp.read(avatarUrl);

            // Redimensionner avatar à 80x80 pixels
            const avatarSize = 80;
            avatarImage.resize(avatarSize, avatarSize);

            // Créer masque rond pour l'avatar
            const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
            mask.scan(0, 0, avatarSize, avatarSize, function(x, y, idx) {
                const radius = avatarSize / 2;
                const centerX = radius;
                const centerY = radius;
                const dx = x - centerX;
                const dy = y - centerY;
                if (dx*dx + dy*dy <= radius*radius) {
                    this.bitmap.data[idx + 3] = 255; // alpha à 255 (opaque)
                }
            });

            // Appliquer le masque rond à l'avatar
            avatarImage.mask(mask, 0, 0);

            // Position du coin supérieur gauche de l'avatar sur le tweet
            const avatarX = 55;
            const avatarY = 35;

            // Coller l'avatar sur l'image tweet
            tweetImage.composite(avatarImage, avatarX, avatarY);

            // Générer buffer PNG et envoyer
            const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);
            message.channel.send({ files: [{ attachment: buffer, name: 'tweet.png' }] });

        } catch (error) {
            console.error('Erreur commande tweet:', error);
            message.channel.send("Une erreur est survenue lors de la création de l'image tweet.");
        }
    }
};
