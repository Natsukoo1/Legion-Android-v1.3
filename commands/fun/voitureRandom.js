const axios = require("axios");

module.exports = {
    name: "voiture",
    description: "Affiche une image aléatoire de voiture pour l'utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Vérifie si l'utilisateur a mentionné quelqu'un
        const mention = message.mentions.users.first();
        if (!mention) {
            message.channel.send("Veuillez mentionner un utilisateur.");
            return;
        }

        try {
            // Remplacez 'YOUR_API_KEY' par votre clé d'API Pexels
            const response = await axios.get('https://api.pexels.com/v1/search?query=car', {
                headers: {
                    Authorization: 'TY8qMMmvn4JzqKk1076z8C9FegAmi6f7ARAx0klidbrOOggpoZ6jEJ43'
                }
            });

            // Obtenez une image aléatoire de la réponse
            const photos = response.data.photos;
            const randomIndex = Math.floor(Math.random() * photos.length);
            const photo = photos[randomIndex];
            const carName = photo.url.split('/').pop().split('-').join(' '); // Obtenez le nom de la voiture depuis l'URL de l'image

            // Envoyer le nom de la voiture en premier
            message.channel.send(`La future voiture de ${mention} : ${carName}`);

            // Envoyer l'image de voiture dans un second message
            message.channel.send(photo.src.original);
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la récupération de l'image de la voiture.");
        }
    }
};
