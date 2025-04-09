module.exports = {
    name: "citation",
    description: "Obtenez une citation aléatoire.",
    run: async (message, args, command, client) => {
        // Liste de 50 citations
        const citations = [
            "La vie est un mystère à résoudre, non un problème à résoudre. - Albert Einstein",
            "La seule chose dont nous devons avoir peur, c'est de la peur elle-même. - Franklin D. Roosevelt",
            "La vie commence là où commence la peur. - Osho",
            "La meilleure façon de prédire l'avenir est de le créer. - Peter Drucker",
            "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
            "Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux. - Marcel Proust",
            "L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt",
            "Le seul moyen de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "La vraie gloire, c'est d'essayer de devenir supérieur à soi-même. - Ernest Hemingway",
            "La créativité consiste à mettre de l'ordre dans le chaos. - Albert Einstein",
            "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il provient de vos propres actions. - Dalai Lama",
            "L'avenir n'appartient pas à ceux qui se lèvent tôt, mais à ceux qui se lèvent motivés. - Mark Twain",
            "La seule limite à nos réalisations de demain sera nos doutes d'aujourd'hui. - Franklin D. Roosevelt",
            "L'important n'est pas ce que l'on fait de nous, mais ce que nous faisons nous-mêmes de ce que l'on a fait de nous. - Jean-Paul Sartre",
            "Le changement n'est jamais douloureux. Seul le passage du temps est douloureux. - Muriel Spark",
            "L'imagination est plus importante que le savoir. - Albert Einstein",
            "La seule façon de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "Le courage n'est pas l'absence de peur, mais la capacité de la vaincre. - Nelson Mandela",
            "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
            "Les seules limites qui existent sont celles que vous vous imposez. - Dr. Wayne Dyer",
            "La vie est ce qui se passe lorsque vous êtes occupé à faire d'autres projets. - John Lennon",
            "La vie est vraiment simple, mais nous insistons à la rendre compliquée. - Confucius",
            "L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt",
            "La seule façon de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il provient de vos propres actions. - Dalai Lama",
            "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
            "Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux. - Marcel Proust",
            "La créativité consiste à mettre de l'ordre dans le chaos. - Albert Einstein",
            "L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt",
            "Le seul moyen de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "La vraie gloire, c'est d'essayer de devenir supérieur à soi-même. - Ernest Hemingway",
            "La créativité consiste à mettre de l'ordre dans le chaos. - Albert Einstein",
            "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il provient de vos propres actions. - Dalai Lama",
            "L'avenir n'appartient pas à ceux qui se lèvent tôt, mais à ceux qui se lèvent motivés. - Mark Twain",
            "La seule limite à nos réalisations de demain sera nos doutes d'aujourd'hui. - Franklin D. Roosevelt",
            "L'important n'est pas ce que l'on fait de nous, mais ce que nous faisons nous-mêmes de ce que l'on a fait de nous. - Jean-Paul Sartre",
            "Le changement n'est jamais douloureux. Seul le passage du temps est douloureux. - Muriel Spark",
            "L'imagination est plus importante que le savoir. - Albert Einstein",
            "La seule façon de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "Le courage n'est pas l'absence de peur, mais la capacité de la vaincre. - Nelson Mandela",
            "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
            "Les seules limites qui existent sont celles que vous vous imposez. - Dr. Wayne Dyer",
            "La vie est ce qui se passe lorsque vous êtes occupé à faire d'autres projets. - John Lennon",
            "La vie est vraiment simple, mais nous insistons à la rendre compliquée. - Confucius",
            "L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt",
            "La seule façon de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
            "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il provient de vos propres actions. - Dalai Lama",
            "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill"
        ];

        // Sélectionnez une citation aléatoire
        const randomCitation = citations[Math.floor(Math.random() * citations.length)];

        // Affichez la citation
        const citationText = `**Citation aléatoire :**\n${randomCitation}`;
        message.channel.send(citationText);
    }
};
