module.exports = {
    name: "punch",
    description: "Donne un coup de poing à l'utilisateur mentionné.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Vous devez mentionner quelqu'un à frapper.");
            return;
        }

        const punchGifs = [
            "https://media.tenor.com/wOCOTBGZJyEAAAAd/chikku-neesan-girl-hit-wall.gif",
			"https://media.tenor.com/3nPnUT5Y08EAAAAd/watch-yo-tone-watch-your-tone.gif",
		"https://media.tenor.com/VtcamdTzmoIAAAAd/naruto-haku.gif",
        ];

        const randomPunchGif = punchGifs[Math.floor(Math.random() * punchGifs.length)];

        message.channel.send(`**${message.author.username}** met un coup de poing à **${mentionedUser.username}** 🥊 !`);
        message.channel.send(randomPunchGif);
    }
};
