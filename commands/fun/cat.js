const axios = require("axios");

module.exports = {
    name: "cat",
    description: "Obtenez une image aléatoire d'un chat.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // L'URL de l'API The Cat API pour une image de chat aléatoire
        const catImageUrl = 'https://api.thecatapi.com/v1/images/search';

        try {
            const response = await axios.get(catImageUrl);

            if (response.status === 200) {
                const imageUrl = response.data[0].url; // Prend la première image de la réponse

                // Envoyez le lien de l'image de chat dans le canal
                message.channel.send(imageUrl);
            } else {
                message.channel.send("Une erreur s'est produite lors de la récupération de l'image du chat.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la récupération de l'image du chat.");
        }
    }
};
