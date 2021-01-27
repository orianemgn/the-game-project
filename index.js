//document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    const height = 4
    let squares = []
    let score = 0


    //function newGame(){}

        //if click button new game createBoard()
      //  window.addEventListener('load',()=> {
        //    const newGame = document.querySelector('.start');
         //   newGame.addEventListener('click',()=>{
          //  window.location.reload(true)
           // });
        //});

        function refresh() {
            console.log("connected");
            window.location.reload()
        }



   //function clearBoard() {
     //   let cells = document.querySelectorAll('.cell')
    //    console.log(cells)
     //   cells.forEach(cell => {
     //       gridDisplay.removeChild(cell);
     //   })
        
  //  }


    //create a playing booard : I create 16 div - an array with 16 number 0 and I place 2 number 2 randomly insid 
    function createBoard(){
        for(let i=0; i<width*height;i++){
            square = document.createElement('div')
            //square.classList.add('cell')
            //0 inside each square/div : 
            square.innerHTML = 0 
            //each square placed in the grid : 
            gridDisplay.appendChild(square) 
            //push each new square into the empty squares array
            squares.push(square) 
            //console.log('hello')
            //console.log(square.innerHTML)
        }
        // function called twice here because we need to create 2 number 2 when we create the board
        generate() 
        generate()
        
        
    }
    createBoard();


    //generate number 2 randomly inside the array/grid 
    function generate(){
        // pick a randow position in the grid : 
        randomNumber = Math.floor(Math.random()*squares.length) 
        if (squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        // if inside the innerHTML square !=0 try again : 
        } else generate ()
    }

    //number swipe right 
    function moveRight(){
        for (let i=0; i <16; i++){
            if (i % 4 ===0){ //define where row is 
                // store index of i : 
                let totalOne = squares[i].innerHTML 
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //create new array to reflet what we have in the innerHTML
                // value are number in "string"
                // => parseInt to tranform in number (to addition number after)
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                //console.log(row)

                // filter out numbers from row and store the filter number in a new array [2]
                let filteredRow = row.filter(num => num)
                //console.log(filteredRow)
                // filter all the element who don't have a number or 0 - each row have 4 row - length filter element
                let missing = 4 - filteredRow.length
                //console.log(missing)
                let zeros = Array(missing).fill(0) //new array of zero based of amount element missing 
                console.log(zeros)
                // Merge 0 array with filtered array 
                let newRow = zeros.concat(filteredRow) //find a way to combine the 2 array but 2 come closer???
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
                //console.log(combinedTotal);
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

    function colors(){
        for (let i=0; i<16;i++){
            if (square.innerHTML == 0){
                square.classList.add('cell')
                
            }
        }
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
        color()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        color()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
        color()
    
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
        color()
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
        if (zeros === 0){ // and if you can't combine anymore 
            resultDisplay.innerHTML="You Lose!"
            document.removeEventListener('keyup',control)
        }
    }


    function clear() {
        clearInterval(myTimer)
      }
    

    

    function addColours() {
        for (let i=0; i < squares.length; i++) {
          if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
          else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
          else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8' 
          else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179' 
          else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4' 
          else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
          else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e' 
          else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
          else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
          else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
          else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
          else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
        }
    }
    addColours()




    var myTimer = setInterval(addColours, 50)




/*

    function color (){
        for (let i=0; squares.length; i++){
            console.log("loop square",squares[i])
            if (squares[i].innerHTML ==0) {
                squares[i].classList.add('colorZero')
                //console.log('hello')
                //console.log(squares[i])
            } else if (squares[i].innerHTML == 2){
                squares[i].classList.remove('colorZero')
                squares[i].classList.add('colorTwo')
                console.log(squares[i])
            } else if (squares[i].innerHTML == 4){
                squares[i].classList.remove('colorTwo')
                square[i].classList.add('colorFour')
                console.log(squares[i])
            } else if (squares[i].innerHTML===8){
                square[i].classList.add('color8')
            } else if (squares[i].innerHTML  == 16){
                square[i].classList.add('color16')
            } else if (squares[i].innerHTML  == 32){
                square[i].classList.add('color32')
            } else if (squares[i].innerHTML  == 64){
                square[i].classList.add('color64')
            } else if (squares[i].innerHTML  == 128){
                square[i].classList.add('color128')
            } else if (squares[i].innerHTML  == 256){
                square[i].classList.add('color256')
            } else if (squares[i].innerHTML  == 512){
                square[i].classList.add('color512')
            } else if (squares[i].innerHTML  == 1024){
                square[i].classList.add('color1024')
            } else if (squares[i].innerHTML  == 2048){
                square[i].classList.add('color2048')
            }
            
        }
    }
*/
    
    color()
    

    

    
    

//})