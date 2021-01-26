//document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    const height = 4
    let squares = []
    let score = 0

    //create a playing booard 
    function createBoard(){
        //as long as i is < than 16 we want to keep looping 
        //to create a square
        for(let i=0; i<width*height;i++){
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
            checkForGameOver()
        } else generate ()
    }

    //number swipe right 
    function moveRight(){
        for (let i=0; i <16; i++){
            if (i % 4 ===0){ //define where row is. 
                let totalOne = squares[i].innerHTML // store index of i in 
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //make a new array who reflet what we have in the innerHTML
                // value are number in "string", use parseInt to tranform in number (because we need to had number together after)
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                console.log(row)

                // filter out numbers from row and store the filter number in a new array [2]
                let filteredRow = row.filter(num => num)
                console.log(filteredRow)
                // filter all the element who don't have a number or 0 - each row have 4 row - length filter element
                let missing = 4 - filteredRow.length
                console.log(missing)
                let zeros = Array(missing).fill(0) //new array of zero based of amount element missing 
                console.log(zeros)
                // Merge 0 array with filtered array 
                let newRow = zeros.concat(filteredRow)
                console.log(newRow)

                // get innerHTML and assign new value
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]

            }
        }
    }


    //number swipe left 
    function moveLeft(){
        for (let i=0; i <16; i++){
            if (i % 4 ===0){ 
                let totalOne = squares[i].innerHTML 
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0) 
                let newRow = filteredRow.concat(zeros) //new oder to make appear to the left
            
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]

            }
        }
    }

    //swipe down 
    function moveDown() {
        for(let i=0; i<4; i++){
            let totalOne= squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }


        //swipe up 
        function moveUp() {
            for(let i=0; i<4; i++){
                let totalOne= squares[i].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree = squares[i+width*2].innerHTML
                let totalFour = squares[i+width*3].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
    
                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = filteredColumn.concat(zeros)
    
                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+width*2].innerHTML = newColumn[2]
                squares[i+width*3].innerHTML = newColumn[3]
            }
        }







    // Combine the number if same number next to each others with swipte direction 
    function combineRow(){
        for (let i=0; i <15; i++){
            if (squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal // Assign new value to a square
                squares[i+1].innerHTML = 0 // replace the value of the second square 
                score +=combinedTotal
                scoreDisplay.innerHTML=score

            }
        }
        checkForWin();
    }


    function combineColumn(){
        for (let i=0; i <12; i++){
            //12 because we are checking the square directly below the square we are looping over
            // not possible from the 13 square because no square underneath 
            if (squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal 
                squares[i+width].innerHTML = 0 
                score += combinedTotal
                scoreDisplay.innerHTML=score 
            }
        }
        checkForWin();
    }



    // assign keycodes 
    //e for event 
    function control(e) {
        if(e.keyCode === 39){
            keyRight()
        } else if (e.keyCode === 37){
            keyLeft()
        } else if (e.keyCode === 38){
            keyUp()
        } else if (e.keyCode === 40){
            keyDown()
        } 
    }
    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    //check for the number 2048 in the squares to win the game
    function checkForWin(){
        for (let i = 0; i < squares.length; i++){
            if (squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keyup',control)
            }
        }
    }


    //check if there are no zeros on the board to lose the game
    function checkForGameOver(){
        let zeros = 0
        for (let i=0; i<squares.length; i++){
            if (squares[i].innerHTML==0){
                zeros++
            }
        }
        if (zeros === 0){
            resultDisplay.innerHTML="You Lose!"
            document.removeEventListener('keyup',control)
        }
    }

//})