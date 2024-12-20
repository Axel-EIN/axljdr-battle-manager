import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function removeFile(publicFilePath) {
  fs.unlink(__dirname + '/../..' + '/public/' + publicFilePath, (err) => {
    if (err) {
      console.error(`Erreur lors de la tentative de suppression du fichier : ${err}`);
      return;
    }
    console.log(`Le fichier ${publicFilePath} a bien été supprimé du disque.`);
  });
}

export function checkAndCreateDir(pathRelativeToRoot) {

    let absolutePath = '';
    if (ENV.NODE_ENV === 'prod') {
        absolutePath = '/' + pathRelativeToRoot;
    } else {
        absolutePath = __dirname + '/../../' + pathRelativeToRoot;
    }
    
    if ( !fs.existsSync(absolutePath) ) {
        fs.mkdirSync(absolutePath);
        console.log(`Le dossier a ${absolutePath} a bien été crée !`);
        return;
    }
    console.log(`Le dossier ${absolutePath} existait déjà !`);
}
