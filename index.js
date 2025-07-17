const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const chokidar = require('chokidar');
const gradient = require('gradient-string');

// Vérification de sécurité
console.log(' ');
if (!process.env.KEY_VALIDATED) {
    console.error('Accès refusé : index.js ne peut pas être exécuté directement.');
    process.exit(1);
}

// Initialisation client
const client = new Client({ checkUpdate: false });
const config = require('./config.json');
const prefix = config.prefix;
const token = config.token;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

// Chargement des handlers
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const adminIDs = ["813514236021178428", "807698314396434452", "352455898230292480"];

// Fonctions de mise à jour dynamique des paramètres
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

// Watcher de config.json
const configFileWatcher = chokidar.watch('./config.json');
configFileWatcher.on('change', () => {
    updateAfkValue();
    updateDeleteMessageNotificationValue();
    updateEditMessageNotificationValue();

    const updatedConfig = JSON.parse(fs.readFileSync('./config.json'));
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

// Activation des commandes admin (en cours de dev)
function activateAdminMode() {
    const adminCommandsPath = "./commands/ADMIN";
    const adminCommandFiles = fs.readdirSync(adminCommandsPath);
    // Implémentation potentielle du chargement dynamique
}

function deactivateAdminMode() {
    // Implémentation potentielle de désactivation admin
}

// Vérification de blacklist au démarrage
async function checkBlacklistOnStartup(client) {
    const path = './blacklist.json';
    if (!fs.existsSync(path)) return;

    const blacklist = JSON.parse(fs.readFileSync(path));
    let found = false;

    console.log("\n[🔍] Vérification des blacklistés dans les amis et serveurs communs...");

    for (const id of blacklist) {
        const user = client.users.cache.get(id);
        if (user) {
            console.log(`[⚠️] Blacklisté trouvé dans vos amis ou serveurs : ${user.tag} (${id})`);
            found = true;
        }
    }

    // Utiliser une boucle async séquentielle pour éviter le spam de listeners
    for (const guild of client.guilds.cache.values()) {
        try {
            const members = await guild.members.fetch();
            members.forEach(member => {
                if (blacklist.includes(member.id)) {
                    console.log(`[🚨] Blacklisté dans "${guild.name}" : ${member.user.tag} (${member.id})`);
                    found = true;
                }
            });
        } catch (err) {
            console.error(`[Erreur] Impossible de fetch membres dans ${guild.name} : ${err.message}`);
        }
    }

    if (!found) console.log("[✅] Aucun utilisateur blacklisté détecté.");
}

// Ready
client.on('ready', () => {
    client.user.setActivity('★ LEGION V1.3 FONDATEUR VERSION ★', { type: "PLAYING" });
    updateAfkValue();
    checkBlacklistOnStartup(client);

    console.log("\x1b[35m [LEGIONInfos]: \x1b[41m\x1b[37mLEGION n'est pas responsable en cas de bannissement\x1b[40m");
    console.log("\x1b[35m [LEGIONInfos]: \x1b[41m\x1b[37mAucun token n'est sauvegardé, vous pouvez utiliser le bot sans risque !\x1b[40m");

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
    console.log(purpleGradient(`	[+] Activité de jeux:    ${client.user.presence.activities[0]?.name || 'Aucune'}`));
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

// Gestion des commandes utilisateur
client.on('messageCreate', async message => {
    if (message.author.bot || message.author.id !== client.user.id) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (!cmd.length) return;

    const d = new Date();

    if (!config.whitelist.includes(message.author.id)) {
        console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Unauthorized user: ${message.author.tag}`);
        return;
    }

    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (config.afk === "on") {
            console.log(`AFK Notification: ${message.author.tag} vous a écrit pendant que vous étiez afk.`);
            message.reply("LEGION V1.3 > Je suis afk je te répondrai plus tard");
        }
        command.run(message, args, command, client);
        console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Commande exécutée : ${cmd}`);
    }
});

// Notifications suppression de messages
client.on('messageDelete', deletedMessage => {
    if (deletedMessage.author?.id !== client.user.id && !deletedMessage.guild) {
        console.log(`AntiMessageDelete By Legion V1.3 : ${deletedMessage.author.tag} : ${deletedMessage.content}`);
        if (config.deleteMessageNotification === "on") {
            const user = client.users.cache.get(deletedMessage.author.id);
            user?.send(`**AntiMessageDelete By Legion V1.3** : ${deletedMessage.content}`);
        }
    }
});

// Notifications modification de messages
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author?.id !== client.user.id && !newMessage.guild) {
        console.log(`AntiMessageEdit By Legion V1.3 : ${newMessage.author.tag} : ${oldMessage.content} => ${newMessage.content}`);
        if (config.editMessageNotification === "on") {
            const user = client.users.cache.get(newMessage.author.id);
            user?.send(`**AntiMessageEdit By Legion V1.3** : "${oldMessage.content}" => "${newMessage.content}"`);
        }
    }
});

// Connexion du bot
client.login(token);

// Export runApp si besoin dans d'autres fichiers
function runApp() {}
module.exports.runApp = runApp;
