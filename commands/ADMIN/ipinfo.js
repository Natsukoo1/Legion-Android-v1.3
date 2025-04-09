const fs = require('fs');
const axios = require('axios');

module.exports = {
    name: "ipinfo",
    aliases: ['ip'],
    description: "Obtenir des informations sur une adresse IP à partir de https://ipinfo.io.",
    run: async (message, args, command, client) => {
        const ip = args[0];

        if (!ip) {
            return message.channel.send("Veuillez fournir une adresse IP.");
        }

        try {
            const ipinfoToken = 'fb7e1128e6424f'; // Replace with your ipinfo.io token
            const response = await axios.get(`https://ipinfo.io/${ip}?token=${ipinfoToken}`);
            const ipInfo = response.data;

            // Formater les informations spécifiques
            let formattedInfo = `\`\`\`Informations pour l'adresse IP doxtool Legion v5 ${ip} :\n\n` +
                `IP: ${ipInfo.ip}\n` +
                `Nom d'hôte: ${ipInfo.hostname}\n` +
                `Ville: ${ipInfo.city}\n` +
                `Région: ${ipInfo.region}\n` +
                `Pays: ${ipInfo.country}\n` +
                `Coordonnées: ${ipInfo.loc}\n` +
                `Organisation: ${ipInfo.org}\n` +
                `Code postal: ${ipInfo.postal}\n` +
                `Fuseau horaire: ${ipInfo.timezone}\n\`\`\``;

            return message.channel.send(formattedInfo);
        } catch (error) {
            console.error(error);
            return message.channel.send("Une erreur s'est produite lors de la récupération des informations de l'adresse IP.");
        }
    }
};
