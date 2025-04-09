const axios = require('axios');
const fs = require('fs');

// Clé de licence locale
const localKey = {
    id: '813514236021178428', // L'ID local à vérifier
    licenseKey: '1PYIUSEG39SDJKHF389' // La clé de licence locale
};

// Lire le fichier config.json
const config = JSON.parse(fs.readFileSync('config.json'));

// Vérifier si l'ID est dans la whitelist
const isWhitelisted = config.whitelist.includes(localKey.id);
console.log('whitelist:', isWhitelisted);

// Fonction de validation des clés
async function validateKeys() {
    try {
        // Récupérer les données depuis GitHub
        const response = await axios.get('https://raw.githubusercontent.com/Natsukoo1/Cl--Legion-FINAL/refs/heads/main/key.json'); 
        const githubKeys = response.data;



        const keysArray = Array.isArray(githubKeys) ? githubKeys : githubKeys.keys;

        // Trouver la clé correspondante
        const matchingKey = keysArray.find(key => key.id === localKey.id && key.licenseKey === localKey.licenseKey);
        
        // Vérification supplémentaire pour l'ID dans config.json
        const isIdInConfig = config.whitelist.includes(localKey.id); // Vérifie également dans la whitelist

        console.log('ID Valide :', isIdInConfig);

        if (isWhitelisted && matchingKey && isIdInConfig) {
            console.log('Licence valide ! Merci pour votre soutient ! Bienvenue...');
            process.env.KEY_VALIDATED = 'true';
            require('./index.js');
        } else {
            console.error('Clé de licence invalide ou votre ID est invalide merci de contacter le support.');
            process.exit(1);
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des clés :', error);
        process.exit(1);
    }
}

// Exécuter la fonction de validation
validateKeys();
