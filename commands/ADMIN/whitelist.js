const fs = require('fs');

module.exports = {
    name: "whitelist",
    aliases: ['togglewhitelist'],
    description: "Ajouter un membre à la whitelist.",
    run: async (message, args, command, client) => {
        const configPath = 'config.json';
        let config = JSON.parse(fs.readFileSync(configPath));

        const memberId = args[0];

        if (!memberId) {
            return message.channel.send("Veuillez fournir un ID de membre à ajouter à la whitelist.");
        }

        // Ajouter l'ID à la whitelist
        if (!config.whitelist.includes(memberId)) {
            config.whitelist.push(memberId);
            fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
            return message.channel.send(`L'ID ${memberId} a été ajouté à la whitelist.`);
        } else {
            return message.channel.send(`L'ID ${memberId} est déjà dans la whitelist.`);
        }
    }
};
