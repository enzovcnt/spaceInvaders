const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
const width = 15
const aliensRemoved = [] //garde trace des invader éliminés
let currentShooterIndex = 202   //détermine position initiale du shooter


//loop > create 225 square in the div grid
for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    grid.appendChild(square) //elements dans la balise div .grid
}


const squares = Array.from(document.querySelectorAll('.grid div')) //mettre tout les éléments div dans un array
console.log(squares)

const alienInvaders = [  //séléctionne les index pour leur donner une classe > utilise la boucle pour cela
    0,1,2,3,4,5,6,7,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for (let i = 0; i < alienInvaders.length; i++) {
        if(!aliensRemoved.includes(i)){   //check si quelque chose existe dans aliensRemoved et si rien ajoute class
            squares[alienInvaders[i]].classList.add('invader');
        }

    }
}
draw()

squares[currentShooterIndex].classList.add('shooter')  //ajoute la classe shooter à la div

function moveShooter(e){ //met e car utilise événement e dans la fonction
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1 //plus capable de bouger plus à gauche
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')
    // à chaque fois appuye sur une arrow key la fonction enléve la classe à la div actuelle et la remet à la div suivante
}
document.addEventListener('keydown', moveShooter)