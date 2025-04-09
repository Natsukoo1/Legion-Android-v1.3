const axios = require("axios");

module.exports = {
    name: "clyde",
    description: "Obtenez une image clydifiée.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        // Supprimer le message contenant la commande
        message.delete();

        // Vérifier si le texte à clydifier est fourni
        const textToClydify = args.join(" ");
        if (!textToClydify) {
            message.channel.send("Veuillez fournir un texte à clydifier.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000); // Supprimer le message d'erreur après 5 secondes
            });
            return;
        }

        // Paramètre raw pour obtenir des octets d'image bruts
        const rawOption = args.includes("--raw") ? '&raw=1' : '';

        // L'URL de l'API NekoBot pour clydifier le texte
        const clydeApiUrl = `https://nekobot.xyz/api/imagegen?type=clyde&text=${encodeURIComponent(textToClydify)}${rawOption}`;

        try {
            const response = await axios.get(clydeApiUrl);

            if (response.status === 200 && response.data.success) {
                const imageUrl = response.data.message; // Obtenir l'URL de l'image clydifiée

                // Envoyez le lien de l'image clydifiée dans le canal
                message.channel.send(imageUrl);
            } else {
                message.channel.send("Une erreur s'est produite lors de la création de l'image clydifiée.").then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000); // Supprimer le message d'erreur après 5 secondes
                });
            }
        } catch (error) {
            console.error(error);
            message.channel.send("Une erreur s'est produite lors de la création de l'image clydifiée.").then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000); // Supprimer le message d'erreur après 5 secondes
            });
        }
    }
};
