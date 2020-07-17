function init(player, OPPONENT, n, level){

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
    const ctx = canvas.getContext("2d");
    ctx.globalAlpha=1;
    ctx.fillStyle = "#52d29d";
    
    //Variables for board creation
    let board = [];
    let Column = 3;
    let Row = 3;
    let SPACE_SIZE = 150;
    
    //Add comment for start
    let start=0
    let gameData = new Array(9);
    
    //All the winning combinations
    let Combos = [[0,1,2],
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
    
    //Conditions for changing the board variables according to the size of the board
    if (n === 4){
        Column = 4;
        Row = 4;
        SPACE_SIZE = 112.5;
        gameData = new Array(16);
        Combos = [[0,1,2,3],
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
        Column = 5;
        Row = 5;
        SPACE_SIZE = 90;
        gameData = new Array(25);
        Combos = [[0,1,2,3,4],
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
   
    let bestEvaluation = -Infinity;
    let currentPlayer = player.man;
    let GAME_OVER = false;
    
    //id variable to work in a single array(more convinient)
    let id=0;
    
    //This function draws the board when play button is clicked
    function drawBoard(){
        let id = 0
        removeClass(document.getElementById("charachters"), 'celebrate_human');
        removeClass(document.getElementById("charachters"), 'celebrate_robot');
        removeClass(document.getElementById("charachters"), 'celebrate_human1');
        for(let i = 0; i < Row; i++){
            board[i] = [];
            for(let j = 0; j < Column; j++){
                board[i][j] = id;
                id++;
                console.log("draw called");
                ctx.strokeStyle = "#FFFFFF";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    }
    drawBoard();
    
    //Listens to the user's click and according to that places the symbol on board
    canvas.addEventListener("click", function(event){

        if(GAME_OVER) return;

        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;
        let i = Math.floor(Y/SPACE_SIZE);
        let j = Math.floor(X/SPACE_SIZE);
        let id = board[i][j];

        if(gameData[id]) return;
        gameData[id] = currentPlayer;

        drawOnBoard(currentPlayer, i, j);
        //checks if a move is a winning/tie/losing move
        if(isWinner(gameData, currentPlayer)){
            
            if(bestEvaluation==-Infinity){
            if(currentPlayer==player.man){
               addClass(document.getElementById("charachters"), 'celebrate_human');
            }else if(currentPlayer==player.friend){
               addClass(document.getElementById("charachters"), 'celebrate_human1');
            }
        }
              ctx.globalAlpha=0.5;
                 for(let j = 0; j < Combos[start].length; j++){
                    id=Combos[start][j];
                    let space = getIJ(id);
                    ctx.fillRect(space.j*SPACE_SIZE, space.i*SPACE_SIZE, canvas.width/n, canvas.height/n);
             }
            setTimeout( showGameOver,700,currentPlayer);
            //showGameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }

        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        if( OPPONENT == "computer"){

            if(level=="noob"){
            let id = noob( gameData, player.computer ).id;
            gameData[id] = player.computer;
            let space = getIJ(id);

            drawOnBoard(player.computer, space.i, space.j);

            if(isWinner(gameData, player.computer)){
                ctx.globalAlpha=0.5;
                 for(let j = 0; j < Combos[start].length; j++){
                    
                    id=Combos[start][j];
                    let space = getIJ(id);
                    ctx.fillRect(space.j*SPACE_SIZE, space.i*SPACE_SIZE, canvas.width/n, canvas.height/n);

                    }
                showGameOver(player.computer);
                GAME_OVER = true;
                return;
            }
        

            if(isTie(gameData)){
                showGameOver("tie");
                GAME_OVER = true;
                return;
            }
        }else if(level=="pro"){

            let id = minimax( gameData, player.computer ).id;
            gameData[id] = player.computer;
            let space = getIJ(id);

            drawOnBoard(player.computer, space.i, space.j);

            if(isWinner(gameData, player.computer)){
              ctx.globalAlpha=0.5;
                   for(let j = 0; j < Combos[start].length; j++){
                    id=Combos[start][j];
                    let space = getIJ(id);
                    ctx.fillRect(space.j*SPACE_SIZE, space.i*SPACE_SIZE, canvas.width/n, canvas.height/n);

                    }
                setTimeout( showGameOver,700,player.computer);
                //showGameOver(player.computer);
                GAME_OVER = true;
                return;
            }

            if(isTie(gameData)){
                showGameOver("tie");
                GAME_OVER = true;
                return;
            }

    
       }
    }else{
            currentPlayer = currentPlayer == player.man ? player.friend : player.man;
        }
    });
    
    //this function always makes the human win the game, it evaluates move in such ways(minimax algorithm)
    function noob(gameData, PLAYER){

        if( isWinner(gameData, player.computer) ) return { evaluation : -20 };
        if( isWinner(gameData, player.man)      ) return { evaluation : +20 };
        if( isTie(gameData)                     ) return { evaluation : 0 };

        let EMPTY_SPACES = getEmptySpaces(gameData);
        let moves = [];

        for( let i = 0; i < EMPTY_SPACES.length; i++){
            let id = EMPTY_SPACES[i];
            let backup = gameData[id];
            gameData[id] = PLAYER;
            let move = {};
            move.id = id;
            if( PLAYER == player.computer){
                move.evaluation = noob(gameData, player.man).evaluation;
            }else{
                move.evaluation = noob(gameData, player.computer).evaluation;
            }
            gameData[id] = backup;
            moves.push(move);
        }

        let bestMove;

        if(PLAYER == player.computer){
             bestEvaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
             bestEvaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }


    //Implementation of minimax algorithm(recursive), this function always makes the computer win the game
    function minimax(gameData, PLAYER){

        if( isWinner(gameData, player.computer) ) return { evaluation : +10 };
        if( isWinner(gameData, player.man)      ) return { evaluation : -10 };
        if( isTie(gameData)                     ) return { evaluation : 0 };

        let EMPTY_SPACES = getEmptySpaces(gameData);
        let moves = [];

        for( let i = 0; i < EMPTY_SPACES.length; i++){
            let id = EMPTY_SPACES[i];
            let backup = gameData[id];
            gameData[id] = PLAYER;
            let move = {};
            move.id = id;
            if( PLAYER == player.computer){
                move.evaluation = minimax(gameData, player.man).evaluation;
            }else{
                move.evaluation = minimax(gameData, player.computer).evaluation;
            }
            gameData[id] = backup;
            moves.push(move);
        }

        let bestMove;

        if(PLAYER == player.computer){
             bestEvaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
             bestEvaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }


    //puts the symbol on board
    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;
        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE, img.width*(3/n), img.height*(3/n));
    }

    //computes how many empty spaces are left for the computer to make a move
    function getEmptySpaces(gameData){
        let EMPTY = [];

        for( let id = 0; id < gameData.length; id++){
            if(!gameData[id]) EMPTY.push(id);
        }
        return EMPTY;
    }
    //converts the 1D array(id) to the 2D blocks/array as on the game board
    function getIJ(id){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] == id) return { i : i, j : j}
            }
        }
    }
    
    //checks for the winner
    function isWinner(gameData, player){
       let i=0;
        for( i = 0; i < Combos.length; i++){
            let won = true;

            for(let j = 0; j < Combos[i].length; j++){
                let id = Combos[i][j];
                won = gameData[id] == player && won;
            }

            if(won){
               start =i;
                return true;
            }
        }
    
        return false;
    }
    //checks if it is match draw
    function isTie(gameData){
        let isBoardFill = true;

        for(let i = 0; i < gameData.length; i++){
           isBoardFill = gameData[i] && isBoardFill;
        }

        if(isBoardFill){
           return true;
        }
        return false;
    }


    //displays the game over message with the winner and play again button to start the game again
    function showGameOver(player){
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `img/${player}.png`;

        if(bestEvaluation==+10||bestEvaluation==-20)
            addClass(document.getElementById("charachters"), 'celebrate_robot');
        else if(bestEvaluation==-10||bestEvaluation==+20) 
            addClass(document.getElementById("charachters"), 'celebrate_human');

        gameOverElement.innerHTML = `
            <h1>${message}</1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;

          gameOverElement.classList.remove("hide");
    }

    
}
