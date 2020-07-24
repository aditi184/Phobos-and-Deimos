const options = document.querySelector(".options");

// to select buttons
const xButton = document.querySelector(".x");
const oButton = document.querySelector(".o");
const threeBtn = document.querySelector(".three");
const fourBtn = document.querySelector(".four");
const fiveBtn = document.querySelector(".five");
const playButton = document.querySelector(".button");
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const robotBtn = document.querySelector(".robot");
const humanfriend = document.querySelector(".human1");
const proBtn = document.querySelector(".pro");
const noobBtn = document.querySelector(".noob");
const lev=document.querySelector(".level");


// gameover element
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let opponent;
let n ;
let level ="pro";


//Events handlers for play versus, select level, choose your symbol, select board size options
computerBtn.addEventListener("click", function(){
    lev.classList.remove("hide");
    robotBtn.classList.remove("hide");
    humanfriend.classList.add("hide");
    opponent = "computer";
    friendBtn.style.backgroundColor = "white";
    switchActive(friendBtn, computerBtn);
});


friendBtn.addEventListener("click", function(){
    lev.classList.add("hide");
    robotBtn.classList.add("hide");
    humanfriend.innerHTML = `
           <div> <img src="img/4.png" alt="">
                        <div class="lh">
                            <img src="img/1.png" alt="">
                        </div>
                        <div class="rh">
                            <img src="img/2.png" alt="">
                        </div>
                        <div class="mouth">
                            <img src="img/mouth.png" alt="">
                        </div>
                        <div class="die"></div>
                        </div>
        `;
        humanfriend.classList.remove("hide");
    opponent = "friend";
    computerBtn.style.backgroundColor = "white";
    switchActive(computerBtn, friendBtn);
});

oButton.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    xButton.style.backgroundColor = "white";
    switchActive(xButton, oButton);
});


xButton.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    oButton.style.backgroundColor = "white";
    switchActive(oButton, xButton);
});


proBtn.addEventListener("click", function(){
    level= "pro";
    noobBtn.style.backgroundColor = "white";
    switchActive(noobBtn, proBtn);
});

noobBtn.addEventListener("click", function(){
    level= "noob";
    proBtn.style.backgroundColor = "white";
    switchActive(proBtn, noobBtn);
});


threeBtn.addEventListener("click", function(){
    n = 3;
    fiveBtn.style.backgroundColor = "white";
    fourBtn.style.backgroundColor = "white";
    switchActive1( fiveBtn, fourBtn, threeBtn);
});



fourBtn.addEventListener("click", function(){
    n = 4;
    threeBtn.style.backgroundColor = "white";
    fiveBtn.style.backgroundColor = "white";
    switchActive1(fiveBtn, threeBtn, fourBtn);
});


fiveBtn.addEventListener("click", function(){
    n = 5;
    threeBtn.style.backgroundColor = "white";
    fourBtn.style.backgroundColor = "white";
    switchActive1(fourBtn, threeBtn, fiveBtn);
});


playButton.addEventListener("click", function(){
    if(!opponent){
        computerBtn.style.backgroundColor = "#E9393980";
        friendBtn.style.backgroundColor = "#E9393980";
        return;
    }

    if(!player.man ){
        oButton.style.backgroundColor = "#E9393980";
        xButton.style.backgroundColor = "#E9393980";
        return;
    }

    if(!level ){
        proBtn.style.backgroundColor = "#E9393980";
        noobBtn.style.backgroundColor = "#E9393980";
        return;
    }


    if(!n ){
        fiveBtn.style.backgroundColor = "#E9393980";
        fourBtn.style.backgroundColor = "#E9393980";
        threeBtn.style.backgroundColor = "#E9393980";
        return;
    }

    if( opponent == "computer"&& n!=3){
        alert("First two moves may take some time!!");
    }


     //Starts a new game with chosen values
    init(player, opponent,n, level );
    playButton.classList.add("hide");
});

// enables the user to select only one option
function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}

// enables the user to select only one option
function switchActive1(off1, off2, on){
    off1.classList.remove("active");
    off2.classList.remove("active");
    on.classList.add("active");
}
