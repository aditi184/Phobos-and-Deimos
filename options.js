
const options = document.querySelector(".options");

const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const threeBtn = document.querySelector(".three");
const fourBtn = document.querySelector(".four");
const fiveBtn = document.querySelector(".five");
const playBtn = document.querySelector(".button");
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const robotBtn = document.querySelector(".robot");
const humanfriend = document.querySelector(".human1");
const proBtn = document.querySelector(".pro");
const noobBtn = document.querySelector(".noob");
const lev=document.querySelector(".level");



const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;
let n ;
let level ="pro";


computerBtn.addEventListener("click", function(){
    robotBtn.classList.remove("hide");
    humanfriend.classList.add("hide");
    OPPONENT = "computer";
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
    OPPONENT = "friend";
    computerBtn.style.backgroundColor = "white";
    switchActive(computerBtn, friendBtn);
});

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

    if(!level ){
        proBtn.style.backgroundColor = "red";
        noobBtn.style.backgroundColor = "red";
        return;
    }


    if(!n ){
        fiveBtn.style.backgroundColor = "red";
        fourBtn.style.backgroundColor = "red";
        threeBtn.style.backgroundColor = "red";
        return;
    }

    if( OPPONENT == "computer"&& n!=3){
        alert("First two moves may take some time!!");
    }



    init(player, OPPONENT,n, level );
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
