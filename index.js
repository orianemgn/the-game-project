console.log("hello");


//document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []

    //create a playing booard 
    function createBoard(){
        //as long as i is < than 16 we want to keep looping 
        //to create a square
        for(let i=0; i<width*width;i++){
            square = document.createElement('div')
            square.innerHTML = 0 //element 0 inside each square/div
            gridDisplay.appendChild(square) //each square put in the grid
            squares.push(square) // to push each new square into the empty squares array
        }
        generate() // we call the fonction here because we need to create de number when we create the board
        generate () // 2nd time to generate a second 2 (we need 2 number to make meet them)
    }
    createBoard();


    //generate number 2 randomly inside the array/grid 
    // if inside the innerHTML square !=0 try again
    function generate(){
        randomNumber = Math.floor(Math.random()*squares.length) // pick a randow position in the grid 
        if (squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML = 2
        } else generate ()
    }





//})