const fs = require('fs');
const chokidar = require('chokidar');

module.exports = {
    name: "logedit",
    aliases: ['togglelogedit'],
    description: "Activer ou désactiver la notification des messages édités.",
    run: async (message, args, command, client) => {
        try {
            await message.delete();
        } catch (error) {
            console.error('Erreur lors de la suppression du message initial :', error);
        }

        const configPath = 'config.json';
        let config = JSON.parse(fs.readFileSync(configPath));

        // Inverser la valeur editMessageNotification (on <-> off)
        config.editMessageNotification = config.editMessageNotification === 'on' ? 'off' : 'on';

        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

        message.channel.send(`La notification des messages édités a été ${config.editMessageNotification === 'on' ? 'activée' : 'désactivée'}.`);

        // Mettez en place la surveillance du fichier de configuration
        const watcher = chokidar.watch(configPath);

        watcher.on('change', (path) => {
            config = JSON.parse(fs.readFileSync(path));
        });
    }
};
