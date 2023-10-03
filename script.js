const boxes = [...document.getElementsByClassName("box")];
const box2d = [boxes.slice(0,3),boxes.slice(3,6),boxes.slice(6)];
const playerTurnDisplay = document.getElementById("playerTurnDisplay");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = 1;
let selectedBox = 0;

restartBtn.style.display = "none";
switchPlayerDisplay();

//adding event listener
for(let row of box2d){
    for(let x of row){
        x.addEventListener("click",function (e){
            handleBoxClick(e);
        })
    }
}
restartBtn.addEventListener('click',restartGame);

function handleBoxClick(e){
    if(e.target.innerHTML!=="" || selectedBox>=9)return;
    e.target.innerHTML = currentPlayer===1?"X":"O";
 
    if(hasWon()){
        switchPlayerDisplay('haswon');
        selectedBox = 10;
        restartBtn.style.display = "inline-block";
        return;
    }
    selectedBox++;
    if(selectedBox>=9){
        switchPlayerDisplay('gameover');
        restartBtn.style.display = "inline-block";
        return;
    }
    currentPlayer = currentPlayer===1?2:1;
    switchPlayerDisplay();
}

function switchPlayerDisplay(val){
    if(val==='gameover')playerTurnDisplay.innerHTML = `Game Over`;
    else if(val==='haswon')playerTurnDisplay.innerHTML = `Player ${currentPlayer} won the game!`;
    else playerTurnDisplay.innerHTML = `Player ${currentPlayer} turn`;
}

function hasWon(){
    let x = 0,y = 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(box2d[i][j].innerHTML==='X')x++;
            else if(box2d[i][j].innerHTML==='O')x--;

            if(box2d[j][i].innerHTML==='X')y++;
            else if(box2d[j][i].innerHTML==='O')y--;
        }
        if(Math.abs(x)===3 || Math.abs(y)===3)return true;
        x = y = 0;
    }
    if(box2d[1][1].innerHTML!=="" && 
    ((box2d[0][0].innerHTML===box2d[1][1].innerHTML && box2d[1][1].innerHTML===box2d[2][2].innerHTML) || 
    (box2d[0][2].innerHTML===box2d[1][1].innerHTML && box2d[1][1].innerHTML===box2d[2][0].innerHTML))) return true;

    return false;
}

function restartGame(){
    location.reload();
}