
const options = document.querySelector(".options");

const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
// const humanstartBtn = document.querySelector(".one");
// const computerstartBtn = document.querySelector(".two");
const threeBtn = document.querySelector(".three");
const fourBtn = document.querySelector(".four");
const fiveBtn = document.querySelector(".five");
const playBtn = document.querySelector(".button");
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");

const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;
let n ;
// let start=2;

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    xBtn.style.backgroundColor = "white";
    switchActive(xBtn, oBtn);
});


xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    oBtn.style.backgroundColor = "white";
    switchActive(oBtn, xBtn);
});

// humanstartBtn.addEventListener("click", function(){
//      start=1;
//      computerstartBtn.style.backgroundColor = "white";
//      switchActive(computerstartBtn, humanstartBtn);
// });

// computerstartBtn.addEventListener("click", function(){
//     start =0;
//      humanstartBtn.style.backgroundColor = "white";
//      switchActive( humanstartBtn, computerstartBtn);
// });


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



 
computerBtn.addEventListener("click", function(){
    OPPONENT = "computer";
    friendBtn.style.backgroundColor = "white";
    switchActive(friendBtn, computerBtn);
});


friendBtn.addEventListener("click", function(){
    OPPONENT = "friend";
    computerBtn.style.backgroundColor = "white";
    switchActive(computerBtn, friendBtn);
});

playBtn.addEventListener("click", function(){
    if(!OPPONENT){
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }

    if(!player.man ){
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }

    // if( start==2 ){
    //     humanstartBtn.style.backgroundColor = "red";
    //     computerstartBtn.style.backgroundColor = "red";
    //     return;
    // }

    if(!n ){
        
        fiveBtn.style.backgroundColor = "red";
        fourBtn.style.backgroundColor = "red";
        threeBtn.style.backgroundColor = "red";
        return;
    }

    init(player, OPPONENT,n );
    playBtn.classList.add("hide");
});


function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}


function switchActive1(off1, off2, on){
    off1.classList.remove("active");
    off2.classList.remove("active");
    on.classList.add("active");
}
