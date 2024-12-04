const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
const width = 15



//loop > create 225 square in the div grid
for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    grid.appendChild(square) //elements dans la balise div .grid
}


const squares = Array.from(document.querySelectorAll('.grid div')) //mettre tout les éléments div dans un array
console.log(squares)