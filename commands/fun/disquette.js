module.exports = {
    name: "disquette",
    description: "Affiche une disquette de drague aléatoire avec le pseudo de la personne mentionnée.",
    run: async (message, args, command, client) => {
        // Vérifiez si un utilisateur a été mentionné
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply("Mentionnez une personne à qui envoyer la disquette !");
        }

        // Récupérez le pseudo de l'utilisateur mentionné
        const targetName = user.username;

        // Liste de 50 disquettes de drague
        const disquettesDrague = [
            `Hey ${targetName}, tu es un(e) magnifique virus qui a infecté mon cœur.`,
            `Si tu étais un être humain, tu serais un cheat code, car tu as rendu ma vie beaucoup plus facile.`,
            `Est-ce que tu as une carte ? Parce que je viens de me perdre dans tes yeux.`,
            `Excuse-moi, mais je pense que tu m'as volé le manuel du ciel, car chaque fois que je te regarde, les anges chantent.`,
            `Je ne suis pas photographe, mais je peux nous voir ensemble.`,
            `Si tu étais une étoile filante, je ferais un vœu à chaque fois que je te vois.`,
            `Est-ce que tu crois au coup de foudre au premier regard, ou dois-je repasser ?`,
            `Tu es tellement belle que tu as mis le soleil en faillite.`,
            `Si la beauté était un crime, tu aurais une peine de prison à vie.`,
            `Excuse-moi, je pense que tu as fait tomber quelque chose : mon cœur.`,
            `Si la beauté était une maladie, tu serais en quarantaine.`,
            `Es-tu fatigué(e) ? Parce que tu as trottiné dans mes rêves toute la nuit.`,
            `Est-ce que tu as un plan ? Parce que je me suis perdu dans tes yeux.`,
            `Si la beauté était une maladie, tu serais en quarantaine.`,
            `Excuse-moi, je crois que tu m'as volé le dictionnaire. Parce que quand je te regarde, tous les autres mots disparaissent.`,
            `Salut ${targetName}, tu es comme un virus magnifique qui a infecté mon cœur.`,
            `Si tu étais un code de triche, tu rendrais ma vie tellement plus facile.`,
            `As-tu une carte ? Parce que je me suis complètement perdu dans tes yeux.`,
            `Excuse-moi, mais je pense que tu as dérobé le manuel du ciel, car chaque fois que je te regarde, les anges chantent.`,
            `Je ne suis pas photographe, mais je peux clairement nous voir ensemble.`,
            `Si tu étais une étoile filante, je ferais un vœu à chaque fois que je te vois.`,
            `Crois-tu au coup de foudre au premier regard, ou dois-je repasser ?`,
            `Tu es tellement belle que tu as mis le soleil en faillite.`,
            `Si la beauté était un crime, tu aurais une peine de prison à vie.`,
            `Excuse-moi, je pense que tu as fait tomber quelque chose : mon cœur.`,
            `Si la beauté était une maladie, tu serais en quarantaine.`,
            `Es-tu fatigué(e) ? Parce que tu as trottiné dans mes rêves toute la nuit.`,
            `As-tu un plan ? Parce que je me suis perdu dans tes yeux.`,
            `Si la beauté était une maladie, tu serais en quarantaine.`,
            `Excuse-moi, je crois que tu m'as volé le dictionnaire. Parce que quand je te regarde, tous les autres mots disparaissent.`,
            `Salut ${targetName}, tu es comme une mélodie envoûtante qui résonne dans mon cœur.`,
            `Si tu étais une potion magique, tu aurais déjà ensorcelé mon existence.`,
            `As-tu une boussole ? Parce que depuis que je t'ai rencontré(e), je ne peux plus trouver le nord.`,
            `Excuse-moi, mais je pense que tu as pris possession de la clé de mon bonheur.`,
            `Je ne suis pas poète, mais avec toi, chaque instant devient une rime parfaite.`,
            `Si tu étais une étoile filante, je danserais sous ton éclat toute la nuit.`,
            `Crois-tu au destin ? Parce que depuis que nos regards se sont croisés, je suis convaincu(e) que nous sommes faits l'un(e) pour l'autre.`,
            `Tu es tellement éblouissante que même la lune pourrait prendre des leçons de lumière de toi.`,
            `Si l'élégance était une monnaie, tu serais une milliardaire en un instant.`,
            `Excuse-moi, je pense que tu as fait tomber quelque chose d'important : le battement de mon cœur.`,
            `Si la gentillesse était une épidémie, tu serais l'épicentre de mon affection.`,
            `Es-tu un(e) artiste ? Parce que chaque fois que je te regarde, tu peins des sourires sur mon visage.`,
            `As-tu une montre ? Parce que le temps semble s'arrêter quand je suis avec toi.`,
            `Si la douceur était une punition, tu purgerais une peine à vie.`,
            `Excuse-moi, je crois que tu as emprisonné mon âme avec ton charme irrésistible.`,
            `Salut ${targetName}, tu es comme une éclipse totale qui obscurcit toutes mes pensées sauf toi.`,
            `Si tu étais une constellation, je me perdrais volontiers dans ton ciel étoilé.`,
            `As-tu une boussole intérieure ? Parce que tu es la direction que je veux suivre.`,
            `Excuse-moi, mais je pense que tu as trouvé le trésor de mon cœur sans même chercher.`,
            `Je ne suis pas écrivain, mais avec toi, chaque jour devient un nouveau chapitre passionnant.`,
            `Si tu étais une aurore boréale, je resterais éveillé(e) toute la nuit pour admirer ta beauté.`,
            `Crois-tu au pouvoir des émotions ? Parce que les miennes s'emballent chaque fois que je suis près de toi.`,
            `Tu es tellement étincelant(e) que même les étoiles s'éteignent de jalousie.`,
            `Si la perfection était une maladie, tu serais une épidémie mondiale.`,
            `Excuse-moi, je pense que tu as capturé quelque chose d'irremplaçable : mon cœur.`,
            `Si la tendresse était un crime, tu serais la fugitive la plus recherchée.`,
            `Es-tu une illusion ? Parce que depuis que je t'ai vue, rien d'autre ne semble réel.`,
            `As-tu une horloge ? Parce que le temps avec toi passe toujours trop vite.`,
            `Si la délicatesse était une compétence, tu serais une experte incontestée.`,
            `Excuse-moi, je crois que tu as déclenché quelque chose de magique : l'amour.`,
            `Salut ${targetName}, tu es comme une étoile solitaire qui guide mes pensées dans l'obscurité.`,
            `Si tu étais une énigme, je passerais ma vie à chercher la réponse.`,
            `As-tu une boussole émotionnelle ? Parce que tu diriges mon cœur dans toutes les bonnes directions.`,
            `Excuse-moi, mais je pense que tu as accédé à la clé de la félicité dans mon cœur.`,
            `Je ne suis pas un poète, mais avec toi, chaque mot devient une déclaration d'amour.`
        ];

        // Sélectionnez une disquette de drague aléatoire
        const randomDisquetteDrague = disquettesDrague[Math.floor(Math.random() * disquettesDrague.length)];

        // Affichez la disquette de drague aléatoire avec le pseudo
        message.channel.send(`:heart: ${targetName}, ${randomDisquetteDrague} :heart:`);
    }
};
