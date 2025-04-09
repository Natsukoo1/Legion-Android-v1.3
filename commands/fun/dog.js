const axios = require("axios");

module.exports = {
    name: "dog",
    description: "Obtenez une image aléatoire d'un chien.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // L'URL de l'API Dog.ceo pour une image de chien aléatoire
        const dogImageUrl = 'https://dog.ceo/api/breeds/image/random';

        try {
            const response = await axios.get(dogImageUrl);

            if (response.status === 200) {
                const imageUrl = response.data.message;

                // Envoyez le lien de l'image de chien dans le canal
                message.channel.send(imageUrl);
            } else {
                message.channel.send("Une erreur s'est produite lors de la récupération de l'image du chien.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la récupération de l'image du chien.");
        }
    }
};
