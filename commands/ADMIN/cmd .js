let commandDetectionEnabled = true;  // Variable pour suivre si la détection des commandes est activée

module.exports = {
    name: "cmd",
    description: "Détecte et gère la commande >commande et les commandes spéciales",
    run: async (message, client) => {
        // Si le message commence par >commande, gérer l'activation/désactivation
        if (message.content.startsWith(">commande")) {
            const args = message.content.split(" ").slice(1);

            // Activation de la détection des commandes fun
            if (args[0] === 'activer' && !commandDetectionEnabled) {
                commandDetectionEnabled = true;
                message.channel.send("La détection des commandes fun est maintenant activée !");
            } 
            // Désactivation de la détection des commandes fun
            else if (args[0] === 'désactiver' && commandDetectionEnabled) {
                commandDetectionEnabled = false;
                message.channel.send("La détection des commandes fun a été désactivée.");
            } 
            else {
                message.channel.send("La détection des commandes fun est déjà activée ou vous avez mal utilisé la commande.");
            }
        }

        // Si la détection est activée, on vérifie les commandes
        if (!commandDetectionEnabled) return;  // Ne fait rien si la détection n'est pas activée

        const content = message.content.trim();

        // Vérifier si le message commence par une commande valide et exécuter l'action correspondante
        if (content.startsWith(">crush")) {
            const user = message.mentions.users.first();
            if (user) {
                message.channel.send(`${message.author.username} a un crush secret sur ${user.username} 💘`);
            } else {
                message.channel.send("Veuillez mentionner une personne !");
            }
        } else if (content.startsWith(">love")) {
            const users = message.mentions.users.array();
            if (users.length === 2) {
                message.channel.send(`${users[0].username} et ${users[1].username} sont faits l'un pour l'autre ! ❤️`);
            } else {
                message.channel.send("Veuillez mentionner deux personnes !");
            }
        } else if (content.startsWith(">hug")) {
            const user = message.mentions.users.first();
            if (user) {
                message.channel.send(`${message.author.username} donne un câlin à ${user.username} 🤗`);
            } else {
                message.channel.send("Veuillez mentionner une personne !");
            }
        } else if (content.startsWith(">slap")) {
            const user = message.mentions.users.first();
            if (user) {
                message.channel.send(`${message.author.username} gifle ${user.username} 👋`);
            } else {
                message.channel.send("Veuillez mentionner une personne !");
            }
        } else if (content.startsWith(">punch")) {
            const user = message.mentions.users.first();
            if (user) {
                message.channel.send(`${message.author.username} donne un coup de poing à ${user.username} 👊`);
            } else {
                message.channel.send("Veuillez mentionner une personne !");
            }
        } else if (content.startsWith(">chut")) {
            const user = message.mentions.users.first();
            if (user) {
                message.channel.send(`${message.author.username} fait taire ${user.username} 🤫`);
            } else {
                message.channel.send("Veuillez mentionner une personne !");
            }
        }
    }
};
