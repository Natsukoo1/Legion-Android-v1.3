const fs = require('fs');
const { Permissions } = require('discord.js');

const backupFolderPath = './backup';

// Vérifie si le dossier de sauvegarde existe, sinon le crée
if (!fs.existsSync(backupFolderPath)) {
    fs.mkdirSync(backupFolderPath);
}

module.exports = {
    name: "backup",
    description: "Gestion des sauvegardes de serveur.",
    run: async (msg, args, command, client) => {
        if (args[0] === "create") {
            // Code pour créer une sauvegarde
            const backupData = {
                serverName: msg.guild.name,
                categories: msg.guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").map(category => ({
                    name: category.name,
                    position: category.position,
                    channels: msg.guild.channels.cache.filter(channel => channel.parentId === category.id).map(channel => ({
                        name: channel.name,
                        type: channel.type,
                        position: channel.position,
                    })),
                })),
                roles: msg.guild.roles.cache.map(role => ({
                    name: role.name,
                    color: role.color,
                    hoist: role.hoist,
                    permissions: role.permissions.bitfield,
                    mentionable: role.mentionable,
                    position: role.position,
                })),
                members: msg.guild.members.cache.map(member => ({
                    username: member.user.username,
                    roles: member.roles.cache.map(role => role.name),
                })),
            };

            const backupID = Date.now().toString();

            const replacer = (key, value) => {
                if (typeof value === 'bigint') {
                    return value.toString();
                }
                return value;
            };

            fs.writeFileSync(`${backupFolderPath}/${backupID}.json`, JSON.stringify(backupData, replacer, 2));

            msg.channel.send(`Sauvegarde créée ! Voici l'ID de la sauvegarde : ${backupID}`);
        } else if (args[0] === "load") {
            const backupID = args[1];

            if (!backupID) {
                msg.channel.send("Veuillez spécifier l'ID de la sauvegarde à charger.");
                return;
            }

            try {
                const backupData = JSON.parse(fs.readFileSync(`${backupFolderPath}/${backupID}.json`, 'utf-8'));

                // Code pour charger la sauvegarde
                const guild = msg.guild;

                // Création des rôles
                for (const roleData of backupData.roles) {
                    await guild.roles.create({
                        data: {
                            name: roleData.name,
                            color: roleData.color,
                            hoist: roleData.hoist,
                            permissions: roleData.permissions,
                            mentionable: roleData.mentionable,
                            position: roleData.position,
                        },
                        reason: 'Restauration de sauvegarde',
                    });
                }

                // Création des catégories et canaux
                for (const categoryData of backupData.categories) {
                    const createdCategory = await guild.channels.create(categoryData.name, {
                        type: 'GUILD_CATEGORY',
                        position: categoryData.position,
                        reason: 'Restauration de sauvegarde',
                    });

                    // Création des canaux dans la catégorie
                    for (const channelData of categoryData.channels) {
                        await guild.channels.create(channelData.name, {
                            type: channelData.type,
                            position: channelData.position,
                            parent: createdCategory,
                            reason: 'Restauration de sauvegarde',
                        });
                    }
                }

                // Attente pour s'assurer que tous les rôles et canaux sont créés avant d'attribuer les rôles aux membres
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Ajout des membres
                for (const memberData of backupData.members) {
                    const member = guild.members.cache.find(m => m.user.username === memberData.username);
                    if (member) {
                        const rolesToAdd = backupData.roles
                            .filter(roleData => memberData.roles.includes(roleData.name))
                            .map(roleData => guild.roles.cache.find(r => r.name === roleData.name))
                            .filter(Boolean); // Filter out undefined roles

                        await member.roles.add(rolesToAdd).catch(error => {
                            console.error(`Erreur lors de l'ajout de rôles à ${member.user.tag}:`, error);
                        });
                    }
                }

                msg.channel.send(`Sauvegarde chargée avec succès : ${backupID}`);
            } catch (error) {
                console.error(error);
                msg.channel.send(`Une erreur est survenue lors du chargement de la sauvegarde : ${backupID}`);
            }
        } else {
            msg.channel.send("Utilisation incorrecte. Utilisez >backup create pour créer une sauvegarde ou >backup load (id) pour charger une sauvegarde.");
        }
    }
};
