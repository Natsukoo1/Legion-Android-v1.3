module.exports = {
    name: "testpersonnalite",
    description: "Un test de personnalité simple avec réactions.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        // Explication initiale
        await message.channel.send(
            "**Test de Personnalité** 🎭\n\n" +
            "Répondez aux questions avec les réactions suivantes :\n" +
            ":one:, :two:, ou :three:\n\n" +
            "Commençons !"
        );

        // Questions et scores
        const questions = [
            {
                question: "Quel est votre passe-temps favori ?\n:one: Lire un livre\n:two: Faire du sport\n:three: Explorer la nature",
                scores: [1, 2, 3],
                categories: ['Calme', 'Dynamique', 'Aventurier']
            },
            {
                question: "Comment préférez-vous passer une soirée ?\n:one: Regarder un film\n:two: Sortir avec des amis\n:three: Rester seul",
                scores: [2, 3, 1],
                categories: ['Sociable', 'Dynamique', 'Réfléchi']
            },
            {
                question: "Quelle qualité vous définit le mieux ?\n:one: Créatif\n:two: Énergique\n:three: Réfléchi",
                scores: [3, 2, 1],
                categories: ['Créatif', 'Dynamique', 'Réfléchi']
            },
            {
                question: "Comment gérez-vous les situations stressantes ?\n:one: Je me calme et je réfléchis\n:two: J’agis rapidement\n:three: J'ignore et je prends du recul",
                scores: [1, 3, 2],
                categories: ['Réfléchi', 'Réactif', 'Détaché']
            },
            {
                question: "Quel type de musique aimez-vous ?\n:one: Calme et apaisante\n:two: Rythmé et dynamique\n:three: Indépendante et originale",
                scores: [1, 2, 3],
                categories: ['Sérénité', 'Dynamique', 'Créatif']
            },
            {
                question: "Quel est votre rôle dans un groupe ?\n:one: Le leader\n:two: Le soutien\n:three: L'observateur",
                scores: [2, 3, 1],
                categories: ['Leader', 'Soutien', 'Observateur']
            },
            {
                question: "Si vous deviez partir en vacances, où iriez-vous ?\n:one: Dans une ville historique\n:two: Dans un endroit isolé en nature\n:three: Sur une plage paradisiaque",
                scores: [3, 2, 1],
                categories: ['Historique', 'Nature', 'Détente']
            },
            {
                question: "Comment vous décririez-vous lors d'une conversation ?\n:one: Très bavard\n:two: Assez réservé\n:three: Écoute plus que je parle",
                scores: [1, 2, 3],
                categories: ['Bavard', 'Réservé', 'Écoute']
            },
            {
                question: "Quelle approche préférez-vous pour résoudre un problème ?\n:one: Analyser les faits et trouver une solution logique\n:two: Penser en dehors des sentiers battus\n:three: Suivre l’instinct et les émotions",
                scores: [1, 3, 2],
                categories: ['Logique', 'Instinctif', 'Écoute']
            },
            {
                question: "Quel est votre rapport à l’avenir ?\n:one: Je suis optimiste et prêt à relever des défis\n:two: Je suis prudent et réfléchi\n:three: Je préfère vivre au jour le jour",
                scores: [2, 3, 1],
                categories: ['Optimiste', 'Prudent', 'Détaché']
            },
            {
                question: "Quelle est votre plus grande crainte ?\n:one: L'échec\n:two: L'inconnu\n:three: La solitude",
                scores: [3, 1, 2],
                categories: ['Echec', 'Inconnu', 'Solitude']
            }
        ];

        let currentIndex = 0;
        let categories = {
            Calme: 0,
            Dynamique: 0,
            Aventurier: 0,
            Sociable: 0,
            Réfléchi: 0,
            Créatif: 0,
            Réactif: 0,
            Détaché: 0,
            Sérénité: 0,
            Leader: 0,
            Soutien: 0,
            Observateur: 0,
            Historique: 0,
            Nature: 0,
            Détente: 0,
            Bavard: 0,
            Réservé: 0,
            Écoute: 0,
            Logique: 0,
            Instinctif: 0,
            Optimiste: 0,
            Prudent: 0,
            Echec: 0,
            Inconnu: 0,
            Solitude: 0
        };

        const askQuestion = async () => {
            const currentQuestion = questions[currentIndex];
            const questionMessage = await message.channel.send(`**Question ${currentIndex + 1}**:\n${currentQuestion.question}`);

            // Ajoute les réactions disponibles pour répondre à la question
            try {
                await questionMessage.react("1️⃣");
                await questionMessage.react("2️⃣");
                await questionMessage.react("3️⃣");
            } catch (err) {
                console.error("Erreur en ajoutant les réactions :", err);
                return;
            }

            // Filtre pour capturer n'importe quelle réaction parmi 1️⃣, 2️⃣ ou 3️⃣ de tout utilisateur
            const filter = (reaction, user) =>
                ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) && !user.bot;

            // Crée un collecteur de réactions
            const collector = questionMessage.createReactionCollector({ filter, max: 1, time: 30000 });

            collector.on("collect", async (reaction, user) => {
                const selectedIndex = ["1️⃣", "2️⃣", "3️⃣"].indexOf(reaction.emoji.name);
                const selectedCategory = currentQuestion.categories[selectedIndex];

                // Ajoute les scores dans les catégories
                categories[selectedCategory] += currentQuestion.scores[selectedIndex];

                // Supprime la réaction du bot
                await reaction.users.remove(client.user.id);

                // Passe à la question suivante ou affiche le résultat
                currentIndex++;
                if (currentIndex < questions.length) {
                    askQuestion();
                } else {
                    showResult();
                }
            });

            collector.on("end", (collected) => {
                if (collected.size === 0) {
                    message.channel.send("⏳ Temps écoulé. Test annulé.");
                }
            });
        };

        const showResult = () => {
            // Trouver la catégorie la plus élevée
            const highestCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);

            let personality = "";
            switch (highestCategory) {
                case 'Calme':
                    personality = "Vous êtes **Calme et Réfléchi**. 🌌";
                    break;
                case 'Dynamique':
                    personality = "Vous êtes **Énergique et Dynamique**. ⚡";
                    break;
                case 'Aventurier':
                    personality = "Vous êtes **Aventurier et Créatif**. 🌍";
                    break;
                case 'Sociable':
                    personality = "Vous êtes **Sociable et Ouvert**. 🗣";
                    break;
                case 'Réfléchi':
                    personality = "Vous êtes **Réfléchi et Analytique**. 🧠";
                    break;
                case 'Créatif':
                    personality = "Vous êtes **Créatif et Original**. 🎨";
                    break;
                case 'Réactif':
                    personality = "Vous êtes **Réactif et Audacieux**. 🔥";
                    break;
                case 'Détaché':
                    personality = "Vous êtes **Détaché et Philosophe**. 🧘‍♂️";
                    break;
                case 'Sérénité':
                    personality = "Vous êtes **Sérénité et Apaisé**. 🌸";
                    break;
                case 'Leader':
                    personality = "Vous êtes **Leader et Inspirant**. 💼";
                    break;
                case 'Soutien':
                    personality = "Vous êtes **Soutien et Empathique**. 💖";
                    break;
                case 'Observateur':
                    personality = "Vous êtes **Observateur et Réfléchi**. 👀";
                    break;
                case 'Historique':
                    personality = "Vous êtes **Passionné par l'Histoire**. 📜";
                    break;
                case 'Nature':
                    personality = "Vous êtes **Amoureux de la Nature**. 🌳";
                    break;
                case 'Détente':
                    personality = "Vous êtes **Amoureux de la Détente**. 🏖";
                    break;
                case 'Bavard':
                    personality = "Vous êtes **Bavard et Expressif**. 🗣";
                    break;
                case 'Réservé':
                    personality = "Vous êtes **Réservé et Discret**. 🤐";
                    break;
                case 'Écoute':
                    personality = "Vous êtes **Écoute et Empathique**. 👂";
                    break;
                case 'Logique':
                    personality = "Vous êtes **Logique et Structuré**. 🧩";
                    break;
                case 'Instinctif':
                    personality = "Vous êtes **Instinctif et Passionné**. 🔥";
                    break;
                case 'Optimiste':
                    personality = "Vous êtes **Optimiste et Positif**. ☀️";
                    break;
                case 'Prudent':
                    personality = "Vous êtes **Prudent et Réfléchi**. 🧐";
                    break;
                case 'Spontané':
                    personality = "Vous êtes **Spontané et Aventureux**. 🎢";
                    break;
                case 'Echec':
                    personality = "Vous avez peur de **l'Échec**. 😰";
                    break;
                case 'Inconnu':
                    personality = "Vous avez peur de **l'Inconnu**. ❓";
                    break;
                case 'Solitude':
                    personality = "Vous avez peur de **la Solitude**. 🌙";
                    break;
            }

            // Vérifier que personality n'est pas vide avant d'envoyer
            if (personality.trim() !== "") {
                message.channel.send(personality);
            } else {
                message.channel.send("Une erreur est survenue lors du calcul de votre personnalité.");
            }
        };

        // Lancer la première question
        askQuestion();
    }
};
