const axios = require("axios");

module.exports = {
    name: "blague",
    description: "Obtenez une blague aléatoire.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        message.delete();

        // L'URL de l'API JokeAPI pour une blague aléatoire
        const jokeUrl = 'https://v2.jokeapi.dev/joke/Any?lang=fr';

        try {
            const response = await axios.get(jokeUrl);

            if (response.status === 200) {
                const jokeData = response.data;

                if (jokeData.setup && jokeData.delivery) {
                    // Si la blague a une partie "setup" et "delivery", affichez-la comme une blague à deux parties
                    const jokeText = "```\n" +
                        `>> Question: <<\n${jokeData.setup}\n` +
						'----------------------------------- \n'+
                        `>> Réponse: <<\n${jokeData.delivery}\n` +
                        "```";
                    message.channel.send(jokeText);
                } else if (jokeData.joke) {
                    // Sinon, affichez la blague simple
                    const jokeText = "```\n" +
                        `**Blague:**\n${jokeData.joke}\n` +
                        "```";
                    message.channel.send(jokeText);
                } else {
                    message.channel.send("Aucune blague n'a été trouvée.");
                }
            } else {
                message.channel.send("Une erreur s'est produite lors de la récupération de la blague.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la récupération de la blague.");
        }
    }
};
