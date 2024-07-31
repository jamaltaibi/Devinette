/*

Les listes


Devine le nombre version complète
----------------------------------

-> Reprendre l'algorithme "Devine le nombre" et le traduire en JS
- Découper le code en fonctions claires
	-> Se poser la question : quelles sont les étapes du jeu ?
- Ajouter un système de score : + 1 point l'utilisateur•trice si iel gagne, + 1 point pour l'ordi dans le cas contraire.

- Afficher un système de commandes : 
	- score : affiche le score ( n'importe quand )
    - pause: enregistre la partie ( uniquement si une partie est en cours, sinon, on affiche un message d'erreur )

Au début du jeu, on demande à l'utilisateur si il souhaite jouer. Il peut répondre OUI, ou NON
Si il a une partie en cours, on lui demande si il veut reprendre la partie en cours, il peut répondre OUI ou NON
Si il répond non, on commence une nouvelle partie, si il répond oui, on reprend la partie en cours.
Si l'utilisateur entre autre chose qu'un nombre, ou une commande, on affiche un message d'erreur.

=> Essayer d'utiliser le moins de lignes de code possible.


-----
En groupe de 2 ( mixe en terme de niveau )

Tic Tac Toe

Faire un morpion. 
L'utilisateur peut placer une croix dans la matrice ( en choisissant sur l'axe XY)
Si l'emplacement n'est pas libre, afficher un message d'erreur
Sinon, ajouter la croix, et donner son tour à l'ordinateur.
L'ordinateur "choisi" de manière random une position libre

Si trois formes identiques se suivent, le jeu est terminé.

*/

let nbEssais;
const maxEssais = 5;
let secret;
let partieEnCours = false;

let scoreHumain = parseInt(localStorage.getItem('Humain'), 10) || 0;
let scoreOrdi = parseInt(localStorage.getItem('Ordi'), 10) || 0;

const demarrerPartie = () => {
    secret = Math.floor(Math.random() * 100) + 1;
    nbEssais = 0;
    partieEnCours = true;
    console.log("Une nouvelle partie commence !");
};

const verifierReponse = (input) => {
    if (input === secret) {
        alert("Bravo ! Vous avez trouvé le nombre.");
        scoreHumain++;
        terminerPartie(true);
    } else if (input > secret) {
        alert("Trop haut !");
    } else if (input < secret) {
        alert("Trop bas !");
    }

    if (Math.abs(secret - input) < 10) {
        alert("Tu es proche !");
    }

    nbEssais++;

    if (nbEssais >= maxEssais) {
        terminerPartie(false);
    }
};

const terminerPartie = (victoire) => {
    partieEnCours = false;
    if (!victoire) {
        alert("Perdu ! Le nombre secret était " + secret);
        scoreOrdi++;
    }
    localStorage.setItem('Humain', scoreHumain);
    localStorage.setItem('Ordi', scoreOrdi);
    afficherScore();
};

const afficherScore = () => {
    console.log('Score - Humain : ' + scoreHumain + ' | Ordi : ' + scoreOrdi);
};

const pausePartie = () => {
    if (partieEnCours) {
        console.log("Partie en cours sauvegardée.");
    } else {
        console.log("Aucune partie en cours à sauvegarder.");
    }
};

const lancerJeu = () => {
    const reponseInitiale = prompt("Souhaitez-vous jouer ? (OUI/NON)").toUpperCase();
    if (reponseInitiale === 'OUI') {
        if (partieEnCours) {
            const reprendre = prompt("Voulez-vous reprendre la partie en cours ? (OUI/NON)").toUpperCase();
            if (reprendre === 'NON') {
                demarrerPartie();
            }
        } else {
            demarrerPartie();
        }

        while (partieEnCours) {
            let input = prompt("Devine un nombre entre 1 et 100 ou entrez une commande (score/pause)").toLowerCase();

            if (input === 'score') {
                afficherScore();
            } else if (input === 'pause') {
                pausePartie();
                break;
            } else {
                input = parseInt(input, 10);
                if (!isNaN(input)) {
                    verifierReponse(input);
                } else {
                    alert("Entrée invalide. Veuillez entrer un nombre ou une commande valide.");
                }
            }
        }
    } else {
        console.log("Merci, à bientôt !");
    }
};

// Lancer le jeu
lancerJeu();


// Correction :

