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

**************************************************************************/

/* 1er essai */

// let nbEssais = 0;
// const maxEssais = 5;
// const secret = 10; // Le nombre à deviner
// let input;
// let humain = parseInt(localStorage.getItem('Humain'),10 )|| 0 ;
// let ordi = parseInt(localStorage.getItem('ordi'),10 ) || 0  ;


// const lancer = () => {


// 	input = 0
// 	nbEssais=0	

//      while (nbEssais < maxEssais && input !== secret) {
//         input = parseInt(prompt(`Devine un nombre entre 1 et 100 sinon ecrire "pause" pour enregistrer la partie en cours`));
// 		if(input){
// 			if(nbEssais!== 0){
// 				localStorage.setItem('Humain : ',humain)
// 				localStorage.setItem('ordi : ',ordi)
// 			}else{
// 				alert('aucune partie en cours')
// 			}
// 		}
// 		console.log("essai restant :",maxEssais-1-nbEssais	);
//         if (input === secret) {
// 			console.log('Bravo !')
// 			humain++
//         } else {
//             if (input > secret) {
// 				console.log('Trop haut')              
//             } else if (input < secret) {
// 				console.log('Trop bas')			
//             }
//             if (Math.abs(secret - input) < 10) {
// 				console.log('Tu es proche !')
//             }
//             nbEssais += 1;
//         }
//     }
//     if (input !== secret) {
// 		console.log('Perdu !')
// 		ordi++
//     }
// }

// const score = () => { console.log('humain :' + humain , 'ordi:' +ordi)};


/************************************************************************** */

/* 2eme essai */

// let nbEssais;
// const maxEssais = 5;
// let secret;
// let partieEnCours = false;

// let scoreHumain = parseInt(localStorage.getItem('Humain'), 10) || 0;
// let scoreOrdi = parseInt(localStorage.getItem('Ordi'), 10) || 0;

// const demarrerPartie = () => {
//     secret = Math.floor(Math.random() * 100) + 1;
//     nbEssais = 0;
//     partieEnCours = true;
//     console.log("Une nouvelle partie commence !");
// };

// const verifierReponse = (input) => {
//     if (input === secret) {
//         alert("Bravo ! Vous avez trouvé le nombre.");
//         scoreHumain++;
//         terminerPartie(true);
//     } else if (input > secret) {
//         alert("Trop haut !");
//     } else if (input < secret) {
//         alert("Trop bas !");
//     }

//     if (Math.abs(secret - input) < 10) {
//         alert("Tu es proche !");
//     }

//     nbEssais++;

//     if (nbEssais >= maxEssais) {
//         terminerPartie(false);
//     }
// };

// const terminerPartie = (victoire) => {
//     partieEnCours = false;
//     if (!victoire) {
//         alert("Perdu ! Le nombre secret était " + secret);
//         scoreOrdi++;
//     }
//     localStorage.setItem('Humain', scoreHumain);
//     localStorage.setItem('Ordi', scoreOrdi);
//     afficherScore();
// };

// const afficherScore = () => {
//     console.log('Score - Humain : ' + scoreHumain + ' | Ordi : ' + scoreOrdi);
// };

// const pausePartie = () => {
//     if (partieEnCours) {
//         console.log("Partie en cours sauvegardée.");
//     } else {
//         console.log("Aucune partie en cours à sauvegarder.");
//     }
// };

// const lancerJeu = () => {
//     const reponseInitiale = prompt("Souhaitez-vous jouer ? (OUI/NON)").toUpperCase();
//     if (reponseInitiale === 'OUI') {
//         if (partieEnCours) {
//             const reprendre = prompt("Voulez-vous reprendre la partie en cours ? (OUI/NON)").toUpperCase();
//             if (reprendre === 'NON') {
//                 demarrerPartie();
//             }
//         } else {
//             demarrerPartie();
//         }

//         while (partieEnCours) {
//             let input = prompt("Devine un nombre entre 1 et 100 ou entrez une commande (score/pause)").toLowerCase();

//             if (input === 'score') {
//                 afficherScore();
//             } else if (input === 'pause') {
//                 pausePartie();
//                 break;
//             } else {
//                 input = parseInt(input, 10);
//                 if (!isNaN(input)) {
//                     verifierReponse(input);
//                 } else {
//                     alert("Entrée invalide. Veuillez entrer un nombre ou une commande valide.");
//                 }
//             }
//         }
//     } else {
//         console.log("Merci, à bientôt !");
//     }
// };

// // Lancer le jeu
// lancerJeu();

/************************************************************************** */

// Correction :

let userScore = 0;
let computerScore = 0;

function startGame() {
    while (confirm('Voulez-vous jouer ?')) {
        let data = load();
        if(data && confirm('Reprendre la partie ?')) {
            console.log(data);
            userScore = +data[0];
            computerScore = +data[1];
            let nbEssais = +data[2];
            let secret = +data[3];
            guessNumber(nbEssais, secret)
        } else {
            guessNumber();
        }

    }
}

function guessNumber(essai = 0, nbSecret) {
    let nbEssais = essai;
    let secret = nbSecret ?? Math.floor(Math.random() * 100 + 1);
    console.log(secret);
    let input;

    while( nbEssais < 5) {
        input = prompt('Devine un nombre entre 1 et 100'); // Attention, retourne une string !

            if(input === "score") {
                score();
                continue;
            } else if (input === 'pause') {
                save(nbEssais, secret);
                continue;
            } else if(isNaN(Number(input))) {
                alert('Mauvais caractère entré !');
                continue;
            }

        input = Number(input);
        if(input === secret) {
            alert('Gagné !');
            userScore++;
            break;
        } else if (input > secret) {
            alert('Trop haut !')
        } else {
            alert('Trop Bas !')
        }
        isClose(input, secret);
        nbEssais++;
    }
    if(nbEssais >= 5) {
        alert('Perdu !');
        computerScore++;
    }
}

function isClose(input, secret) {
    if(secret - input < 10 && secret - input > -10) {
        alert('Tu es proche !')
    }
}

function score() {
    alert(`User : ${userScore} -- Computer : ${computerScore}`);
}

function save(nbEssais, secret) {
    const data = [userScore, computerScore, nbEssais, secret];
    localStorage.setItem('guessNumber', data.join(','));
}

function load() {
    const data = localStorage.getItem('guessNumber')?.split(',');
    localStorage.clear();
    return data;
}

startGame();