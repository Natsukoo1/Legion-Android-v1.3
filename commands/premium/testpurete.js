module.exports = {
    name: "testpurete",
    description: "Un test de pureté avec des réactions.",
    run: async (message, args, command, client) => {
        if (message.author.bot) return;

        // Explication initiale
        await message.channel.send(
            "**Test de Pureté** 🧼\n\n" +
            "Répondez honnêtement aux questions avec les réactions suivantes :\n" +
            ":one:, :two:, ou :three:\n\n" +
            "Plus votre score est bas, plus votre pureté diminue !\n\n" +
            "Commençons !"
        );

        // Questions et scores
        const questions = [
            // Questions générales
            { question: "Avez-vous déjà menti pour éviter des ennuis ?\n:one: Non, jamais\n:two: Rarement\n:three: Souvent", scores: [10, 5, 0] },
            { question: "Avez-vous déjà volé quelque chose, même insignifiant ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà triché à un examen ou un test ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            
            // Questions sur l'alcool et la drogue
            { question: "Avez-vous déjà bu de l’alcool ?\n:one: Non\n:two: Rarement\n:three: Souvent", scores: [10, 5, 0] },
            { question: "Avez-vous déjà été ivre ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà consommé des drogues douces (par ex. : cannabis) ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà consommé des drogues dures ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            
            // Questions sur la sexualité
            { question: "Avez-vous déjà embrassé quelqu’un sur la bouche ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà eu des relations sexuelles ?\n:one: Non\n:two: Oui, une fois\n:three: Oui, plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà eu une aventure d’un soir ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà envoyé ou reçu des photos explicites ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà eu des fantasmes que vous n’avez pas réalisés ?\n:one: Non\n:two: Oui, quelques-uns\n:three: Oui, beaucoup", scores: [10, 5, 0] },
            
            // Questions sur la loi et le risque
            { question: "Avez-vous déjà enfreint la loi (par ex. : excès de vitesse, vol) ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà été arrêté par la police ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            
            // Questions comportementales
            { question: "Avez-vous déjà manipulé quelqu’un pour obtenir ce que vous voulez ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà regretté une action liée à une mauvaise décision ?\n:one: Non\n:two: Rarement\n:three: Souvent", scores: [10, 5, 0] },
            
            // Questions additionnelles sur les relations et l’audace
            { question: "Avez-vous déjà embrassé quelqu’un du même sexe ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà eu une relation interdite (par ex. : infidélité) ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
            { question: "Avez-vous déjà participé à une fête où les règles ont été ignorées ?\n:one: Non\n:two: Une fois\n:three: Plusieurs fois", scores: [10, 5, 0] },
        ];

        let currentIndex = 0;
        let totalScore = 0;

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

                // Ajoute le score
                totalScore += currentQuestion.scores[selectedIndex];

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
            // Calcul du pourcentage de pureté
            const maxScore = questions.length * 10;
            const purityPercentage = Math.round((totalScore / maxScore) * 100);

            // Envoi du résultat
            message.channel.send(`**Votre score de pureté est de ${purityPercentage}%** 🧼\n\n` +
                (purityPercentage >= 80
                    ? "Vous êtes une personne très pure ! 😇"
                    : purityPercentage >= 50
                        ? "Vous êtes relativement pur, mais vous avez quelques secrets. 😉"
                        : "Votre pureté est faible... on ne juge pas, promis ! 😈")
            );
        };

        // Lancer la première question
        askQuestion();
    }
};
