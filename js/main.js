const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
const width = 15
const aliensRemoved = [] //garde trace des invader éliminés
let currentShooterIndex = 202   //détermine position initiale du shooter
let invadersID
let isGoingRight = true
let direction = 1


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

function remove(){  //fonctionne comme le shooter mais doit le faire sur tout l'array des aliens
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}






function moveShooter(e){ //met e car utilise événement e dans la fonction
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1 //divisible par 15 et pas de reste donc ne passe pas cela et donc plus capable de bouger plus à gauche en faisant -1
            break
        case 'ArrowRight': // si  plus petit que 14 peut aller plus à gauche sinon peut pas
            if (currentShooterIndex % width < width - 1) currentShooterIndex +=1 // ajoute la distance de déplacement = 1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
    // à chaque fois appuye sur une arrow key la fonction enléve la classe à la div actuelle et la remet à la div suivante
}
document.addEventListener('keydown', moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0 //si divisible par 15 et pas de reste peut pas aller plus à gauche
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 // détermine le côté droit
    remove()

    if (rightEdge && isGoingRight) { //si va au tout a droite ET continue à droite
        for(let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1 //mouvement dans index
            direction = -1
            isGoingRight = false //changer de direction
        }
    }
    if (leftEdge && !isGoingRight) { //si tout a gauche ET ne va pas à droite
        for(let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            isGoingRight = true //changer de direction
        }
    }
    for (let i = 0; i < alienInvaders.length; i++) { //lance la boucle
        alienInvaders[i] += direction
    }
    draw() //redessine car totalement enlevé

    if (squares[currentShooterIndex].classList.contains('invader')){ //si la bonne class touche le shooter
        resultDisplay.innerText = 'Game Over!'
        clearInterval(invadersID) //bouge plus
    }

    if (aliensRemoved.length === alienInvaders.length){
        resultDisplay.innerText = 'You Win'
        clearInterval(invadersID)
    }
}

invadersID = setInterval(moveInvaders, 600)

function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterIndex //donne la même position que le shooter
    function moveLaser(){ //pareil que le shooter
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
    }
    switch (e.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break
    }
}

document.addEventListener('keydown', shoot)