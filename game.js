function init(player, opponent, n, level){

    //Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
    function addClass(el, className) {
        if (el.classList)
        el.classList.add(className);
        else if (!hasClass(el, className)) el.className += " " + className;
    }

    function removeClass(el, className) {
        if (el.classList)
        el.classList.remove(className);
        else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
        }
    }

    //Selecting a 2D Canvas
    const canvas = document.getElementById("cvs");
    const context = canvas.getContext("2d");
    context.globalAlpha=1;
    context.fillStyle = "#52d29d";
    
    //Variables for board creation
    let board = [];
    let column = 3;
    let row = 3;
    let space_stride = 150;
    
    //Add comment for start
    let start=0
    let gameData = new Array(9);
    
    //All the winning combinations
    let win_combinations = [[0,1,2],
                  [3,4,5],
                  [6,7,8],
                  [0,3,6],
                  [1,4,7],
                  [2,5,8],
                  [0,4,8],
                  [2,4,6]];
    
    
    let xImage = new Image();
    xImage.src = "img/X.png";

    let oImage = new Image();
    oImage.src = "img/O.png";
    
    //Conditions for changing the board variables according to the size of the game board
    if (n === 4){
        column = 4;
        row = 4;
        space_stride = 112.5;
        gameData = new Array(16);
        win_combinations = [[0,1,2,3],
                  [4,5,6,7],
                  [8,9,10,11],
                  [12,13,14,15],
                  [0,4,8,12],
                  [1,5,9,13],
                  [2,6,10,14],
                  [3,7,11,15],
                  [0,5,10,15],
                  [3,6,9,12]];   
    }else if(n===5){
        column = 5;
        row = 5;
        space_stride = 90;
        gameData = new Array(25);
        win_combinations = [[0,1,2,3,4],
                  [5,6,7,8,9],
                  [10,11,12,13,14],
                  [15,16,17,18,19],
                  [20,21,22,23,24],
                  [0,5,10,15,20],
                  [1,6,11,16,21],
                  [2,7,12,17,22],
                  [3,8,13,18,23],
                  [4,9,14,19,24],
                  [0,6,12,18,24],
                  [4,8,12,16,20]];
    }
   
    let best_evaluation = -Infinity;
    let currentPlayer = player.man;
    let gameOver = false;
    
    //id variable to work in a single array(more convinient)
    let id=0;
    
    //This function draws the board when play button is clicked
    function drawBoard(){
        let id = 0
        removeClass(document.getElementById("charachters"), 'celebrate_human');
        removeClass(document.getElementById("charachters"), 'celebrate_robot');
        removeClass(document.getElementById("charachters"), 'celebrate_human1');
        for(let i = 0; i < row; i++){
            board[i] = [];
            for(let j = 0; j < column; j++){
                board[i][j] = id;
                id++;
                console.log("draw called");
                context.strokeStyle = "#FFFFFF";
                context.strokeRect(j * space_stride, i * space_stride, space_stride, space_stride);
            }
        }
    }
    drawBoard();
    
    //Listens to the user's click and according to that places the symbol on board
    canvas.addEventListener("click", function(event){

        if(gameOver) return;

        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;
        let i = Math.floor(Y/space_stride);
        let j = Math.floor(X/space_stride);
        let id = board[i][j];

        if(gameData[id]) return;
        gameData[id] = currentPlayer;

        drawOnBoard(currentPlayer, i, j);
        //checks if a move is a winning/tie/losing move
        if(isWinner(gameData, currentPlayer)){
            
            if(best_evaluation==-Infinity){
            if(currentPlayer==player.man){
               addClass(document.getElementById("charachters"), 'celebrate_human');
            }else if(currentPlayer==player.friend){
               addClass(document.getElementById("charachters"), 'celebrate_human1');
            }
        }
              context.globalAlpha=0.5;
                 for(let j = 0; j < win_combinations[start].length; j++){
                    id=win_combinations[start][j];
                    let position = get2Dpos(id);
                    context.fillRect(position.j*space_stride, position.i*space_stride, canvas.width/n, canvas.height/n);
             }
            setTimeout( displayGameOver,700,currentPlayer);
            //showGameOver(currentPlayer);
            gameOver = true;
            return;
        }

        if(isTie(gameData)){
            displayGameOver("tie");
            gameOver = true;
            return;
        }

        if(opponent=="computer"){

            if(level=="noob"){
            let id = noobMinimax( gameData, player.computer ).id;
            gameData[id] = player.computer;
            let position = get2Dpos(id);

            drawOnBoard(player.computer, position.i, position.j);

            if(isWinner(gameData, player.computer)){
                context.globalAlpha=0.5;
                 for(let j = 0; j < win_combinations[start].length; j++){
                    
                    id=win_combinations[start][j];
                    let space = get2Dpos(id);
                    context.fillRect(space.j*space_stride, space.i*space_stride, canvas.width/n, canvas.height/n);

                    }
                displayGameOver(player.computer);
                gameOver = true;
                return;
            }
        
            if(isTie(gameData)){
                displayGameOver("tie");
                gameOver = true;
                return;
            }

        }else if(level=="pro"){

            let id = proMinimax( gameData, player.computer ).id;
            gameData[id] = player.computer;
            let position = get2Dpos(id);

            drawOnBoard(player.computer, position.i, position.j);

            if(isWinner(gameData, player.computer)){
              context.globalAlpha=0.5;
                   for(let j = 0; j < win_combinations[start].length; j++){
                    id=win_combinations[start][j];
                    let space = get2Dpos(id);
                    context.fillRect(space.j*space_stride, space.i*space_stride, canvas.width/n, canvas.height/n);

                    }
                setTimeout( displayGameOver,700,player.computer);
                //showGameOver(player.computer);
                gameOver = true;
                return;
            }

            if(isTie(gameData)){
                displayGameOver("tie");
                gameOver = true;
                return;
            }

    
       }
    }else{
            currentPlayer = currentPlayer == player.man ? player.friend : player.man;
        }
    });
    
    //Implementation of minimax algorithm(recursive), this function always makes the computer win the game
    function proMinimax(gameData, PLAYER){

        if( isWinner(gameData, player.computer) ) return { evaluation : +10 };
        if( isWinner(gameData, player.man)      ) return { evaluation : -10 };
        if( isTie(gameData)                     ) return { evaluation : 0 };

        let emptySpaces = getEmptySpaces(gameData);
        let moves = [];

        for( let i = 0; i < emptySpaces.length; i++){
            let id = emptySpaces[i];
            let auxiliary = gameData[id];
            gameData[id] = PLAYER;
            let move = {};
            move.id = id;
            if(PLAYER == player.computer){
                move.evaluation = proMinimax(gameData, player.man).evaluation;
            }else{
                move.evaluation = proMinimax(gameData, player.computer).evaluation;
            }
            gameData[id] = auxiliary;
            moves.push(move);
        }

        let bestMove;

        if(PLAYER == player.computer){
             best_evaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > best_evaluation ){
                    best_evaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
             best_evaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < best_evaluation ){
                    best_evaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }

    //this function always makes the human win the game, it evaluates move in such ways(minimax algorithm)
    function noobMinimax(gameData, PLAYER){

        if( isWinner(gameData, player.computer) ) return { evaluation : -20 };
        if( isWinner(gameData, player.man)      ) return { evaluation : +20 };
        if( isTie(gameData)                     ) return { evaluation : 0 };

        let emptySpaces = getEmptySpaces(gameData);
        let moves = [];

        for( let i = 0; i < emptySpaces.length; i++){
            let id = emptySpaces[i];
            let auxiliary = gameData[id];
            gameData[id] = PLAYER;
            let move = {};
            move.id = id;
            if( PLAYER == player.computer){
                move.evaluation = noobMinimax(gameData, player.man).evaluation;
            }else{
                move.evaluation = noobMinimax(gameData, player.computer).evaluation;
            }
            gameData[id] = auxiliary;
            moves.push(move);
        }

        let bestMove;

        if(PLAYER == player.computer){
             best_evaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > best_evaluation ){
                    best_evaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
             best_evaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < best_evaluation ){
                    best_evaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }

    //computes how many empty spaces are left for the computer to make a move
    function getEmptySpaces(gameData){
        let EMPTY = [];

        for( let id = 0; id < gameData.length; id++){
            if(!gameData[id]) EMPTY.push(id);
        }
        return EMPTY;
    }

    //puts the symbol on board
    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;
        context.drawImage(img, j * space_stride, i * space_stride, img.width*(3/n), img.height*(3/n));
    }

    //converts the 1D array(id) to the 2D blocks/array as on the game board
    function get2Dpos(id){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] == id) return { i : i, j : j}
            }
        }
    }
    //checks if it is match draw
    function isTie(gameData){
        let isBoardFull = true;

        for(let i = 0; i < gameData.length; i++){
           isBoardFull = gameData[i] && isBoardFull;
        }

        if(isBoardFull){
           return true;
        }
        return false;
    }

    //checks for the winner
    function isWinner(gameData, player){
       let i=0;
        for( i = 0; i < win_combinations.length; i++){
            let win = true;

            for(let j = 0; j < win_combinations[i].length; j++){
                let id = win_combinations[i][j];
                win = gameData[id] == player && win;
            }

            if(win){
               start =i;
                return true;
            }
        }
    
        return false;
    }

    //displays the game over message with the winner and play again button to start the game again
    function displayGameOver(player){
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `img/${player}.png`;

        if(best_evaluation==+10||best_evaluation==-20)
            addClass(document.getElementById("charachters"), 'celebrate_robot');
        else if(best_evaluation==-10||best_evaluation==+20) 
            addClass(document.getElementById("charachters"), 'celebrate_human');

        gameOverElement.innerHTML = `
            <h1>${message}</1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;

          gameOverElement.classList.remove("hide");
    }
}
