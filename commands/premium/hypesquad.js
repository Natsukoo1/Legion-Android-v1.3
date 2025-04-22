const fetch = require("node-fetch");

module.exports = {
    name: "hypesquad",
    description: "Change ton badge HypeSquad (bravery, brilliance, balance)",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        message.delete();

        const house = args[0]?.toLowerCase();
        const houses = {
            bravery: 1,
            brilliance: 2,
            balance: 3
        };

        if (!houses[house]) {
            return message.channel.send("❌ Utilisation : `hypesquad [bravery|brilliance|balance]`");
        }

        try {
            const res = await fetch("https://discord.com/api/v9/hypesquad/online", {
                method: "POST",
                headers: {
                    Authorization: client.token, // Ton token est utilisé automatiquement
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ house_id: houses[house] })
            });

            if (res.ok) {
                message.channel.send(`✅ Tu as rejoint la maison **${house}** !`);
            } else {
                message.channel.send("❌ Erreur lors du changement de HypeSquad.");
            }
        } catch (err) {
            console.error("Erreur HypeSquad :", err);
            message.channel.send("❌ Une erreur s'est produite.");
        }
    }
};
