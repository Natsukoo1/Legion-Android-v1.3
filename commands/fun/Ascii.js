const figlet = require('figlet');

module.exports = {
    name: "ascii",
    aliases: [],
    description: "Génère du texte en art ASCII.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        message.delete();

        const text = args.join(" ");

        if (!text) {
            // Vérifier si du texte est fourni en argument
            message.channel.send("Veuillez fournir du texte à convertir en art ASCII (ex : >ascii Hello).");
            return;
        }

        // Utilise la bibliothèque 'figlet' pour générer l'art ASCII
        figlet(text, (err, data) => {
            if (err) {
                console.log('Erreur de conversion en ASCII :', err);
                return;
            }

            // Envoie l'art ASCII dans le même canal
            message.channel.send("```\n" + data + "\n```");
        });
    }
};
