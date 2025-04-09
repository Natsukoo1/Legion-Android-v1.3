module.exports = {
    name: "meme",
    aliases: [],
    description: "Obtenez un mème aléatoire depuis Reddit.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // L'URL de l'API Reddit pour les mèmes aléatoires
        const memeUrl = 'https://www.reddit.com/r/memes.json';

        try {
            // Utilisez un import dynamique pour 'node-fetch'
            const fetch = await import('node-fetch');

            const response = await fetch.default(memeUrl);

            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des mèmes : ${response.statusText}`);
            }

            const memeData = await response.json();

            // Accédez aux enfants (posts) de l'objet data
            const children = memeData.data.children;

            if (children.length > 0) {
                // Sélectionnez un post aléatoire
                const randomPost = children[Math.floor(Math.random() * children.length)];

                // Accédez à l'image du post
                const imageUrl = randomPost.data.url;

                // Envoyez le lien de l'image dans le canal
                message.channel.send(imageUrl);
            } else {
                message.channel.send("Aucun mème n'a été trouvé.");
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la récupération des mèmes.");
        }
    }
};
