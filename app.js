// ================================
// === DEBUT DU SERVEUR BACKEND === 
// ================================
//
// Le serveur EXPRESS est crée ici puis configurer avec les routeurs, les contrôlleurs, les middleware, les cors
// Avant de lancer le serveur on export app.js au service de socket qui ajoute les websocket et renvoie à server.js pour le lancement .listen
// Ce service ajoute un serveur websocket en plus à express puis on le renvoie à server.js pour le lancement avec listen

import express from 'express';
import cookieParser from 'cookie-parser'; // Module pour pouvoir lire les cookies
import { ENV } from './config.js'; // Import des variables d'environement

// Importation des routes
import userRouter from './src/routes/user.route.js';
import characterRouter from './src/routes/character.route.js';
import battleRouter from './src/routes/battle.route.js';

import './src/models/index.js'; // Importation et connexion de la base de données

const app = express(); // Lancement du serveur express

// Implémentation des middlewares
app.use(express.json()); // Pour lire les données JSON
app.use(cookieParser()); // Pour parser les cookies

app.use((requete, reponse, next) => { // Methode pour faire fonctionner les cors
    reponse.setHeader("Access-Control-Allow-Origin", ENV.WEB_APP_URL);
    reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    reponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    reponse.setHeader("Access-Control-Allow-Credentials", true);
    return next();
});

// Middleware qui rend le dossier /public accessible sur la machine local
if (ENV.NODE_ENV === 'prod') {
    app.use(express.static('/public'));
} else {
    app.use(express.static('public'));
}

// Middleware pour connecter les routes
app.use("/api/user", userRouter);
app.use("/api/character", characterRouter);
app.use("/api/battle", battleRouter);

export default app;
