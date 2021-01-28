//document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    const height = 4
    let squares = []
    let score = 0


    const start = document.querySelector('.start')
    start.addEventListener('click',refresh)

        function refresh() {
            console.log("connected");
            window.location.reload()
        }



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
        randomNumber = Math.floor(Math.random()*squares.length) 
        if (squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate ()
    }

    //number swipe right 
    function moveRight(){
        for (let i=0; i <16; i++){
            if (i % 4 ===0){  
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
        musique()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        musique()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        musique()
        combineColumn()
        moveDown()
        generate()
    }

    function keyUp(){
        moveUp()
        musique()
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
          if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#A1FBF7'
          else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#DEE3FF'//#A1D9FB'// #A5B2FF  #DEE3FF #A1D9FB
          else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#f5d8e4' 
          else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#a6cfff'
          else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#6485DD' 
          else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#acaee0'
          else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#1FC7FF' 
          else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#137C9F' 
          else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#1F57FF' 
          else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#95B0FF' 
          else if (squares[i].innerHTML == 1024) {
            squares[i].style.backgroundColor = '#E3C5DB';
            squares[i].style.fontSize = "xx-large";
          }
          else if (squares[i].innerHTML == 2048){
            squares[i].style.backgroundColor = '#FFEFFB';
            squares[i].style.fontSize = "xx-large";
          } 
        }
    }
    addColours()

    var myTimer = setInterval(addColours, 50)
    console.log(myTimer)

    function musique(){
        var audio = new Audio('Airlive5.mp3');
        audio.play();
    }

    

    

    

    

    
    

//})