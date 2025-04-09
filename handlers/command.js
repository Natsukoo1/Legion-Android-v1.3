const { readdirSync } = require('fs');

module.exports = (client) => {
    console.log("Connexion au serveur en cours...");

    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        }
    });

    console.log(" LEGION V1.3 Fonctionnel ! amuses toi bien  ! ");
}
