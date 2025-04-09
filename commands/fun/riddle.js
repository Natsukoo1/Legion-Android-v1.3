module.exports = {
    name: "riddle",
    description: "Obtenez une énigme aléatoire ou vérifiez la réponse à une énigme spécifique.",
    run: async (message, args, command, client) => {
        if (message.author.bot) {
            return;
        }

        message.delete();

        // Liste d'énigmes stockées dans le code avec les réponses correspondantes
        const riddles = [
            {
                question: "Énigme 1 : Qu'est-ce qui a des clés mais n'ouvre aucune porte ?",
                réponse: "La réponse est un piano."
            },
            {
                question: "Énigme 2 : Je suis grand le matin, petit à midi et disparais le soir. Que suis-je ?",
                réponse: "La réponse est une ombre."
            },
            {
                question: "Énigme 3 : Qu'est-ce qui a des dents mais ne peut pas manger ?",
                réponse: "La réponse est une scie."
            },
            {
                question: "Énigme 4 : Plus vous en prenez, plus vous en laissez derrière. Que suis-je ?",
                réponse: "La réponse est des empreintes digitales."
            },
            {
                question: "Énigme 5 : Je suis toujours affamé, je peux toujours être nourri, l'élément qui me nourrit est différent chaque fois. Que suis-je ?",
                réponse: "La réponse est un feu."
            },
            {
                question: "Énigme 6 : J'ai des clés mais n'ouvre aucune porte. Qu'est-ce que je suis ?",
                réponse: "La réponse est un clavier."
            },
            {
                question: "Énigme 7 : Quel est le mot qui devient plus court lorsqu'on ajoute deux lettres ?",
                réponse: "La réponse est le mot 'court' lui-même."
            },
            {
                question: "Énigme 8 : Je commence et finis avec la lettre 'E', mais je contiens une seule lettre. Que suis-je ?",
                réponse: "La réponse est une enveloppe."
            },
            {
                question: "Énigme 9 : Je peux voler sans ailes. Qui suis-je ?",
                réponse: "La réponse est le temps."
            },
            {
                question: "Énigme 10 : Plus vous en retirez, plus il grandit. Que suis-je ?",
                réponse: "La réponse est un trou."
            },
            {
                question: "Énigme 11 : Je suis l'un des plus forts du monde, mais je ne peux pas tenir longtemps. Que suis-je ?",
                réponse: "La réponse est un bâillement."
            },
            {
                question: "Énigme 12 : Je suis toujours en train de courir, mais je n'arrive jamais nulle part. Que suis-je ?",
                réponse: "La réponse est une horloge."
            },
            {
                question: "Énigme 13 : On me trouve dans l'eau, mais je ne mouille pas. Qui suis-je ?",
                réponse: "La réponse est une ombre."
            },
            {
                question: "Énigme 14 : J'ai des dents mais je ne mords pas. Que suis-je ?",
                réponse: "La réponse est une scie."
            },
            {
                question: "Énigme 15 : Qu'est-ce qui est brisé chaque fois qu'on en parle ?",
                réponse: "La réponse est un silence."
            },
            {
                question: "Énigme 16 : Je suis un végétal, mais je ne peux pas bouger, j'ai des feuilles mais je ne suis pas un livre. Que suis-je ?",
                réponse: "La réponse est un arbre."
            },
            {
                question: "Énigme 17 : Je suis jaune, je suis petit, et je ne peux pas voler. Que suis-je ?",
                réponse: "La réponse est une banane."
            },
            {
                question: "Énigme 18 : Quand on me jette, je deviens plus grand. Qui suis-je ?",
                réponse: "La réponse est une ombre."
            },
            {
                question: "Énigme 19 : Je peux être cassé, je peux être ouvert, je peux être fermé, mais je ne peux pas être mangé. Que suis-je ?",
                réponse: "La réponse est un œuf."
            },
            {
                question: "Énigme 20 : Plus je suis grand, moins je peux être vu. Que suis-je ?",
                réponse: "La réponse est l'obscurité."
            },
            {
                question: "Énigme 21 : Qu'est-ce qui est léger comme une plume, mais même le plus fort ne peut le tenir très longtemps ?",
                réponse: "La réponse est le souffle."
            },
            {
                question: "Énigme 22 : Je suis souvent en train de courir, mais je ne peux jamais bouger. Que suis-je ?",
                réponse: "La réponse est une rivière."
            },
            {
                question: "Énigme 23 : J'ai des dents, mais je ne peux pas manger. Qui suis-je ?",
                réponse: "La réponse est un peigne."
            },
            {
                question: "Énigme 24 : Je suis une boîte qui est vide à l'intérieur. Qui suis-je ?",
                réponse: "La réponse est un coffre."
            },
            {
                question: "Énigme 25 : Quand on me donne à quelqu'un, je deviens votre maître. Qui suis-je ?",
                réponse: "La réponse est un conseil."
            },
            {
                question: "Énigme 26 : Plus je suis vieux, plus je suis précieux. Que suis-je ?",
                réponse: "La réponse est une antiquité."
            },
            {
                question: "Énigme 27 : Je suis une pièce de papier, mais je suis très puissant. Qui suis-je ?",
                réponse: "La réponse est de l'argent."
            },
            {
                question: "Énigme 28 : Je suis quelque chose que vous pouvez briser, mais je ne suis jamais réellement brisé. Que suis-je ?",
                réponse: "La réponse est une promesse."
            },
            {
                question: "Énigme 29 : Je suis petit, mais je peux tenir des mondes entiers. Que suis-je ?",
                réponse: "La réponse est un timbre."
            },
            {
                question: "Énigme 30 : Je suis partout, mais on ne peut pas me toucher, me voir ni me sentir. Que suis-je ?",
                réponse: "La réponse est l'air."
            },
            {
                question: "Énigme 31 : Plus vous en prenez, plus vous en laissez derrière. Que suis-je ?",
                réponse: "La réponse est des empreintes digitales."
            },
            {
                question: "Énigme 32 : Je suis rond, plat et très coloré. On peut me trouver sous un pied, mais je ne suis pas une créature vivante. Que suis-je ?",
                réponse: "La réponse est un tapis."
            },
            {
                question: "Énigme 33 : Je suis l'un des mots les plus longs de la langue, mais je ne contiens que trois lettres. Que suis-je ?",
                réponse: "La réponse est 'peut-être'."
            },
            {
                question: "Énigme 34 : Je suis quelque chose que vous pouvez casser, mais je ne suis pas fait de verre ou de céramique. Que suis-je ?",
                réponse: "La réponse est un œuf."
            },
            {
                question: "Énigme 35 : Je suis toujours devant vous, mais vous ne pouvez jamais me toucher. Que suis-je ?",
                réponse: "La réponse est le futur."
            },
            {
                question: "Énigme 36 : Je commence et finis avec la lettre 'E', mais je ne contiens qu'une lettre. Que suis-je ?",
                réponse: "La réponse est une enveloppe."
            },
            {
                question: "Énigme 37 : Je suis un chiffre, mais je ne peux pas être compté. Que suis-je ?",
                réponse: "La réponse est un téléphone."
            },
            {
                question: "Énigme 38 : Je suis une chose vivante, mais je n'ai pas de bouche. Qui suis-je ?",
                réponse: "La réponse est un arbre."
            },
            {
                question: "Énigme 39 : Je suis un homme qui est toujours en train de mentir. Qui suis-je ?",
                réponse: "La réponse est un miroir."
            },
            {
                question: "Énigme 40 : Je suis souvent sous le soleil, mais vous ne pouvez jamais me bronzer. Que suis-je ?",
                réponse: "La réponse est de l'ombre."
            },
            {
                question: "Énigme 41 : Je suis un objet que vous pouvez jeter, mais je reviendrai toujours. Que suis-je ?",
                réponse: "La réponse est un boomerang."
            },
            {
                question: "Énigme 42 : Je suis un nombre, mais je ne peux pas être mesuré. Que suis-je ?",
                réponse: "La réponse est un numéro de téléphone."
            },
            {
                question: "Énigme 43 : Je suis toujours en train de courir, mais je ne bouge jamais. Que suis-je ?",
                réponse: "La réponse est une horloge."
            },
            {
                question: "Énigme 44 : Je suis un fruit, mais je ne peux pas être mangé. Qui suis-je ?",
                réponse: "La réponse est une orange."
            },
            {
                question: "Énigme 45 : Je suis un outil que l'on peut utiliser pour creuser, mais je ne suis pas fait de métal. Que suis-je ?",
                réponse: "La réponse est une bêche."
            },
            {
                question: "Énigme 46 : Je suis toujours devant vous, mais vous ne pouvez jamais m'attraper. Que suis-je ?",
                réponse: "La réponse est le temps."
            },
            {
                question: "Énigme 47 : Je suis un endroit où l'on peut se reposer, mais je ne suis pas un lit. Que suis-je ?",
                réponse: "La réponse est un fauteuil."
            },
            {
                question: "Énigme 48 : Je suis un animal qui est toujours assis, même en courant. Qui suis-je ?",
                réponse: "La réponse est un chien."
            },
            {
                question: "Énigme 49 : Je suis un véhicule qui peut voler sans ailes. Que suis-je ?",
                réponse: "La réponse est une fusée."
            },
            {
                question: "Énigme 50 : Je suis une chose qui est cassée chaque fois que l'on en parle. Que suis-je ?",
                réponse: "La réponse est un silence."
            }
        ];

        if (args[0] === "reponse") {
            // Si l'utilisateur demande la réponse à une énigme spécifique
            const riddleNumber = parseInt(args[1]);

            if (isNaN(riddleNumber) || riddleNumber < 1 || riddleNumber > riddles.length) {
                message.channel.send("Veuillez spécifier un numéro d'énigme valide.");
            } else {
                const response = riddles[riddleNumber - 1].réponse;
                message.channel.send(`Réponse à l'énigme ${riddleNumber}: ${response}`);
            }
        } else {
            // Sélectionnez une énigme aléatoire
            const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

            // Affichez l'énigme
            const riddleText = "```\n" +
                `**Énigme:**\n${randomRiddle.question}\n` +
                "```";
            message.channel.send(riddleText);
        }
    } // Ajoutez une accolade fermante ici
};