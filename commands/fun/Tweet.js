const Jimp = require('jimp');
const axios = require('axios');

module.exports = {
    name: "tweet",
    description: "Ajoute un tweet sur la photo de profil d'un utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        // Supprimer le message de commande si possible
        if (message.deletable) {
            message.delete().catch(() => {});
        }

        // Vérifier si un utilisateur est mentionné
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.channel.send("Veuillez mentionner un utilisateur.").then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        // Récupérer l'avatar Discord au format PNG 128px
        const avatarUrl = mentionedUser.displayAvatarURL({ format: 'png', size: 128 });

        // Récupérer le vrai pseudo affiché dans le serveur
        let nickname = mentionedUser.username;
        if (message.guild) {
            const mentionedMember = message.mentions.members.first();
            if (mentionedMember && mentionedMember.displayName) {
                nickname = mentionedMember.displayName;
            }
        }

        // Récupérer le texte du tweet (sans la mention)
        const tweetText = args.filter(arg => !arg.startsWith('<@')).join(" ");
        if (!tweetText) {
            return message.channel.send("Veuillez fournir le texte du tweet.").then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        // URL API Nekobot pour générer l'image tweet (avec un avatar générique)
        const genericAvatar = 'https://i.imgur.com/AfFp7pu.png'; // image grise par défaut
        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(genericAvatar)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;

                // Charger l'image tweet et l'avatar Discord
                const tweetImage = await Jimp.read(tweetImageUrl);
                const avatarImage = await Jimp.read(avatarUrl);

                // Redimensionner avatar à 80x80
                const avatarSize = 80;
                avatarImage.resize(avatarSize, avatarSize);

                // Créer un masque rond pour l'avatar
                const mask = new Jimp(avatarSize, avatarSize, 0x00000000);
                mask.scan(0, 0, avatarSize, avatarSize, (x, y, idx) => {
                    const radius = avatarSize / 2;
                    const centerX = radius;
                    const centerY = radius;
                    const dx = x - centerX;
                    const dy = y - centerY;
                    if (dx*dx + dy*dy <= radius*radius) {
                        mask.bitmap.data[idx + 3] = 255; // alpha opaque
                    }
                });
                avatarImage.mask(mask, 0, 0);

                // Position du rond gris sur l'image tweet (à coller)
                const avatarX = 55;
                const avatarY = 35;
                tweetImage.composite(avatarImage, avatarX, avatarY);

                // Envoyer l'image finale
                const buffer = await tweetImage.getBufferAsync(Jimp.MIME_PNG);
                message.channel.send({ files: [{ attachment: buffer, name: 'tweet_image.png' }] });

            } else {
                message.channel.send("Une erreur s'est produite lors de la génération du tweet.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de l'ajout du tweet à l'image.");
        }
    }
};
