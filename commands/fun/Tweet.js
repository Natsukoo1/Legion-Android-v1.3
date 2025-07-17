const { createCanvas, loadImage } = require('canvas');
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

        // Récupérer l'avatar
        const userImage = mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

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

        // API NekoBot pour générer l'image
        const tweetApiUrl = `https://nekobot.xyz/api/imagegen?type=tweet&image=${encodeURIComponent(userImage)}&text=${encodeURIComponent(tweetText)}&username=${encodeURIComponent(nickname)}`;

        try {
            const response = await axios.get(tweetApiUrl, { timeout: 10000 });
            if (response.status === 200 && response.data.success) {
                const tweetImageUrl = response.data.message;

                const [tweetImage, avatarImage] = await Promise.all([
                    loadImage(tweetImageUrl),
                    loadImage(userImage)
                ]);

                const canvas = createCanvas(tweetImage.width, tweetImage.height);
                const ctx = canvas.getContext('2d');

                ctx.drawImage(tweetImage, 0, 0);

                const avatarSize = 80;
                const avatarX = 55;
                const avatarY = 35;

                ctx.save();
                ctx.beginPath();
                ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
                ctx.restore();

                const buffer = canvas.toBuffer();
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
