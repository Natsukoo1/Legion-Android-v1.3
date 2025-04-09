const fs = require('fs');
const { spawn } = require('child_process');
const chokidar = require('chokidar'); // Importez le module chokidar

module.exports = {
    name: "afk",
    aliases: ['toggleafk'],
    description: "Activer ou désactiver l'AFK et redémarrer le bot.",
    run: async (message, args, command, client) => {
        // Tentative de suppression du message initial
        try {
            await message.delete();
        } catch (error) {
            console.error('Erreur lors de la suppression du message initial :', error);
        }

        // Lire le fichier de configuration
        const configPath = 'config.json';
        let config = JSON.parse(fs.readFileSync(configPath));

        // Inverser la valeur AFK (on <-> off)
        config.afk = config.afk === 'on' ? 'off' : 'on';

        // Écrire la nouvelle valeur dans le fichier de configuration
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

        // Afficher un message en fonction de la nouvelle valeur
        message.channel.send(`L'AFK a été ${config.afk === 'on' ? 'activé' : 'désactivé'}.`);

        // Redémarrer le bot en utilisant un nouveau processus Node.js
        const botProcess = spawn('node', ['index.js'], {
            detached: true,
            stdio: 'inherit'
        });

        botProcess.unref(); // Détache le nouveau processus

        // Vous pouvez également envoyer un message de confirmation ici si nécessaire

        // Mettez en place la surveillance du fichier de configuration
        const watcher = chokidar.watch(configPath);

        watcher.on('change', (path) => {
            // Lorsque le fichier de configuration change, mettez à jour la valeur de l'option AFK en temps réel
            config = JSON.parse(fs.readFileSync(path));
        });
    }
};
