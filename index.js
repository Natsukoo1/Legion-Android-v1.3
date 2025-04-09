const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const gradient = require('gradient-string');
const chokidar = require('chokidar');
console.log(' ');

if (!process.env.KEY_VALIDATED) {
    console.error('Accès refusé : index.js ne peut pas être exécuté directement.');
    process.exit(1); // Sortie avec une erreur
}

function runApp() {
}

module.exports.runApp = runApp;

const client = new Client({
    checkUpdate: false,
});
const config = require('./config.json');

const prefix = config.prefix;
const token = config.token;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const adminIDs = ["813514236021178428", "807698314396434452", "352455898230292480"];

function updateAfkValue() {
    const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
    config.afk = updatedConfig.afk;
}

function updateDeleteMessageNotificationValue() {
    const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
    config.deleteMessageNotification = updatedConfig.deleteMessageNotification;
}

function updateEditMessageNotificationValue() {
    const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
    config.editMessageNotification = updatedConfig.editMessageNotification;
}

const configFileWatcher = chokidar.watch('./config.json');
configFileWatcher.on('change', () => {
    updateAfkValue();
    updateDeleteMessageNotificationValue();
    updateEditMessageNotificationValue();

const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
const adminIDs = ["813514236021178428", "807698314396434452", "352455898230292480"];

if (
    adminIDs.includes(client.user.id) &&
    updatedConfig.adminPassword === "S6G8vQ2bf" &&
    updatedConfig.adminMode === "on"
) {
    activateAdminMode();
} else {
    deactivateAdminMode();
}

});

function activateAdminMode() {
    const adminCommandsPath = "./commands/ADMIN";
    const adminCommandFiles = fs.readdirSync(adminCommandsPath);

    adminCommandFiles.forEach(file => {
        const adminCommand = require(`${adminCommandsPath}/${file}`);
        client.commands.set(adminCommand.name, adminCommand);
        // Vous pouvez également ajouter des alias et d'autres configurations au besoin
    });

    console.log("Vous êtes administrateur.");
}

function deactivateAdminMode() {
    console.log("Vous n'êtes pas administrateur.");
    const adminCommandsPath = "./commands/ADMIN";
    const adminCommandFiles = fs.readdirSync(adminCommandsPath);

    adminCommandFiles.forEach(file => {
        const adminCommand = require(`${adminCommandsPath}/${file}`);
        client.commands.delete(adminCommand.name);
        // Vous pouvez également ajouter des alias et d'autres configurations au besoin
    });
}

client.on('ready', () => {
    client.user.setActivity('★ LEGION V1.3 FONDATEUR VERSION ★', { type: "PLAYING" });
    updateAfkValue();

const gradient = require('gradient-string');

console.log("\x1b[35m [LEGIONInfos]: \x1b[41m\x1b[37mLEGION n'est pas responsable en cas de banissement \x1b[40m");
console.log("\x1b[35m [LEGIONInfos]: \x1b[41m\x1b[37mLEGION Aucun token n'est sauvegardé vous pouvez utiliser le bot sans risque! \x1b[40m");

const centeredTitle = `
 ██╗     ███████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗    ███████╗███████╗██╗     ███████╗██████╗  ██████╗ ████████╗
 ██║     ██╔════╝██╔════╝ ██║██╔═══██╗████╗  ██║    ██╔════╝██╔════╝██║     ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝
 ██║     █████╗  ██║  ███╗██║██║   ██║██╔██╗ ██║    ███████╗█████╗  ██║     █████╗  ██████╔╝██║   ██║   ██║   
 ██║     ██╔══╝  ██║   ██║██║██║   ██║██║╚██╗██║    ╚════██║██╔══╝  ██║     ██╔══╝  ██╔══██╗██║   ██║   ██║   
 ███████╗███████╗╚██████╔╝██║╚██████╔╝██║ ╚████║    ███████║███████╗███████╗██║     ██████╔╝╚██████╔╝   ██║   
 ╚══════╝╚══════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚══════╝╚══════╝╚═╝     ╚═════╝  ╚═════╝    ╚═╝   
    
`;

const purpleGradient = gradient(['#7F00FF', '#E100FF']);
console.log(purpleGradient(centeredTitle));

console.log(purpleGradient('Version 1.3 par Natsukoo_ amuses toi bien :D'));
console.log('');
console.log(purpleGradient(`════════════════════════════════════════════════════════════════════════`));
console.log(purpleGradient(`	[+] Pseudo:              ${client.user.username}`));
console.log(purpleGradient(`	[+] ID:                  ${client.user.id}`));
console.log(purpleGradient(`	[+] Nombre de serveurs:  ${client.guilds.cache.size}`));
console.log(purpleGradient(`	[+] Nombre d'amis:       ${client.users.cache.size}`));
console.log(purpleGradient(`	[+] Nitro:               ${client.user.premiumType !== 'NONE' ? 'Oui' : 'Non'}`));
console.log(purpleGradient(`	[+] 2FA:                 ${client.user.mfaEnabled}`));
console.log(purpleGradient(`	[+] Premium:             ${config.whitelist.includes(client.user.id) ? 'Oui' : 'Non'}`));
console.log(purpleGradient(`	[+] Activité de jeux:    ${client.user.presence.activities[0].name}`));
console.log(purpleGradient(`	[+] Liste Blanche:       ${config.whitelist.includes(client.user.id) ? 'Oui' : 'Non'}`));
console.log(purpleGradient(`	[+] Administrateur:      ${adminIDs.includes(client.user.id) ? 'Oui' : 'Non'}`));
console.log(purpleGradient(`	[+] Prefix:              ${prefix}`));
console.log(purpleGradient(`════════════════════════════════════════════════════════════════════════`));
console.log('');




    const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
    if (updatedConfig.adminPassword !== "S6G8vQ2bf" || updatedConfig.adminMode !== "on") {
        deactivateAdminMode();
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.author.id != client.user.id) return;

    const isGuildMessage = !!message.guild;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    if (!config.whitelist.includes(message.author.id)) {
        console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Unauthorized user: ${message.author.tag}`);
        return;
    }

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if (isGuildMessage) {
            if (message.guild) {
                // Votre logique de traitement de commande dans un serveur ici
            }
        } else {
            if (config.afk === "on") {
                console.log(`AFK Notification: ${message.author.tag} vous a écrit pendant que vous étiez afk.`);
                message.reply("LEGION V1.3 > Je suis afk je te répondrai plus tard");
            }
        }

        command.run(message, args, command, client);
        var d = new Date();
        console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Commande exécuter : ${cmd}`);
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const isGuildMessage = !!message.guild;

    if (isGuildMessage) {
        if (message.guild) {
            // Votre logique de traitement de commande dans un serveur ici
        }
    } else {
        if (message.author.username !== client.user.username) {
            if (config.afk === "on") {
                console.log(`AFK Notification: ${message.author.tag} vous a écrit pendant que vous étiez afk.`);
                message.reply("LEGION V1.3 > Je suis afk je te répondrai plus tard");
            }
        }
    }
});

client.on('messageDelete', deletedMessage => {
    if (deletedMessage.author) {
        if (deletedMessage.author.id !== client.user.id) {
            if (!deletedMessage.guild) {
                console.log(`AntiMessageDelete By Legion V1.3 crée par Natsuko_ ${deletedMessage.author.tag} : ${deletedMessage.content}`);
                if (config.deleteMessageNotification === "on") {
                    const user = client.users.cache.get(deletedMessage.author.id);
                    if (user) {
                        user.send(`**AntiMessageDelete By Legion V1.3 crée par Natsuko_ :** ${deletedMessage.content}`);
                    }
                }
            }
        }
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author) {
        if (newMessage.author.id !== client.user.id) {
            if (!newMessage.guild) {
                console.log(`AntiMessageEdit By Legion V1.3 crée par Natsuko_ ${newMessage.author.tag} : ${oldMessage.content} => ${newMessage.content}`);
                if (config.editMessageNotification === "on") {
                    const user = client.users.cache.get(newMessage.author.id);
                    if (user) {
                        user.send(`**AntiMessageEdit By Legion V1.3 crée par Natsuko_** : "${oldMessage.content}" => "${newMessage.content}"`);
                    }
                }
            }
        }
    }
});

client.login(token);
