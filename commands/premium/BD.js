const fs = require('fs'); // Nécessite le module fs
const path = require('path'); // Nécessite le module path pour gérer les chemins de fichiers

module.exports = {
    name: "bd",
    aliases: [],
    description: "Simuler un chargement de 1% à 100% en moins de 10 secondes et exporter les infos du serveur.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            // Ignorer les commandes des bots
            return;
        }

        // Crée le message de chargement initial
        const loadingMessage = await message.channel.send("Chargement en cours...");

        const startTime = Date.now();
        const endTime = startTime + 10000; // 10 secondes

        let progress = 1;
        while (progress <= 100) {
            const currentTime = Date.now();
            const remainingTime = endTime - currentTime;

            // Calcule la vitesse de progression en fonction du temps restant
            const speed = Math.max(1, Math.floor((100 - progress) / (remainingTime / 1000))); // 100% en moins de 10 secondes

            progress += speed;

            if (progress > 100) {
                progress = 100;
            }

            // Mise à jour du message de chargement à chaque itération
            try {
                if (loadingMessage && loadingMessage.editable) {
                    await loadingMessage.edit(`Chargement en cours... ${progress}%`);
                }
            } catch (error) {
                console.log("Erreur lors de l'édition du message de chargement :", error.message);
                break;
            }

            const delay = Math.min(remainingTime, 50); // Pas plus de 50 ms entre les mises à jour
            await new Promise(resolve => setTimeout(resolve, delay));

            if (progress >= 100) {
                break; // Sort de la boucle si le chargement atteint 100%
            }
        }

        // Une fois le chargement terminé, affiche un message de confirmation
        try {
            if (loadingMessage && loadingMessage.editable) {
                await loadingMessage.edit("Chargement terminé. La base de données du serveur a été correctement sauvegardée :white_check_mark:");
            }
        } catch (error) {
            console.log("Erreur lors de l'édition du message de fin de chargement :", error.message);
        }

        // Collecte des informations détaillées du serveur
        const serverInfo = {
            serverName: message.guild.name,
            serverID: message.guild.id,
            ownerID: message.guild.ownerId,
            ownerTag: message.guild.owner ? message.guild.owner.user.tag : 'Inconnu', // Vérification ajoutée ici
            memberCount: message.guild.memberCount,
            region: message.guild.preferredLocale,
            createdAt: message.guild.createdAt,
            systemChannelID: message.guild.systemChannelID,
            verificationLevel: message.guild.verificationLevel,
            defaultChannelID: message.guild.defaultChannelId,
            rolesCount: message.guild.roles.cache.size,
            channelsCount: message.guild.channels.cache.size,
            emojisCount: message.guild.emojis.cache.size,
            bansCount: await message.guild.bans.fetch().then(bans => bans.size).catch(() => 0), // Gestion des erreurs pour les bans
            features: message.guild.features.join(", "),
            vanityURL: message.guild.vanityURLCode || 'None',
            boostCount: message.guild.premiumSubscriptionCount,
            premiumTier: message.guild.premiumTier,
            boostsEnabled: message.guild.premiumTier > 0,
            memberVerificationLevel: message.guild.verificationLevel,
            channels: message.guild.channels.cache.map(c => `${c.type}: ${c.name}`).join(', '),
            roles: message.guild.roles.cache.map(role => role.name).join(', ')
        };

        // Formatage des informations à exporter dans le fichier
        const serverInfoText = `
        Server Name: ${serverInfo.serverName}
        Server ID: ${serverInfo.serverID}
        Owner ID: ${serverInfo.ownerID} (${serverInfo.ownerTag})
        Member Count: ${serverInfo.memberCount}
        Region: ${serverInfo.region}
        Created At: ${serverInfo.createdAt}
        System Channel ID: ${serverInfo.systemChannelID}
        Verification Level: ${serverInfo.verificationLevel}
        Default Channel ID: ${serverInfo.defaultChannelID}
        Roles Count: ${serverInfo.rolesCount}
        Channels Count: ${serverInfo.channelsCount}
        Emojis Count: ${serverInfo.emojisCount}
        Bans Count: ${serverInfo.bansCount}
        Features: ${serverInfo.features}
        Vanity URL: ${serverInfo.vanityURL}
        Boost Count: ${serverInfo.boostCount}
        Premium Tier: ${serverInfo.premiumTier}
        Boosts Enabled: ${serverInfo.boostsEnabled}
        Member Verification Level: ${serverInfo.memberVerificationLevel}
        Channels: ${serverInfo.channels}
        Roles: ${serverInfo.roles}
        `;

        // Définition du chemin d'exportation à deux dossiers avant "premium"
        const exportDir = path.join(__dirname, '../../infoServeurs');
        
        // Crée le dossier si il n'existe pas
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }

        // Crée le fichier avec le nom du serveur dans le dossier d'exportation
        const serverFilePath = path.join(exportDir, `info serveur ${serverInfo.serverName}.txt`);
        fs.writeFileSync(serverFilePath, serverInfoText, 'utf8');
        console.log(`Server information has been written to ${serverFilePath}`);
    }
};
