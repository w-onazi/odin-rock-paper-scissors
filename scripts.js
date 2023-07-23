//Function declaraions
playMatch = function (e){
    round++;
    let playerSelection = e.target.className;
    let computerSelection = getComputerChoice();
    updateInfo(playerSelection,computerSelection);
    let [roundAlert,roundMessage, playerScore, compScore] = playRound(playerSelection, computerSelection);
    updateTotal(playerScore,compScore);
    updateMessage(roundAlert,roundMessage);
}

function updateInfo(playerSelection,computerSelection){
    playerChoice.setAttribute('src',`./images/${playerSelection}.png`);
    computerChoice.setAttribute('src',`./images/loop.gif`);
    setTimeout(()=>{
        computerChoice.setAttribute('src',`./images/${computerSelection}.png`); 
    },500);//plays loop.gif for 0.5secs before computers choice
    roundCount.textContent=`${round}`;
}

function updateTotal(playerScore,compScore){
    if (playerScore>compScore){
        playerTotal+=1;
    }else if(compScore>playerScore){
        compTotal+=1;
    }else{
        console.log(roundAlert,roundMessage,playerTotal,compTotal);
    }

    computerScoreCard.textContent=`C.P.U: ${compTotal}`;
    playerScoreCard.textContent=`PLAYER: ${playerTotal}`;

    if (playerTotal===5 || compTotal===5){
        alert("Game Over");
        restartGame();
    }
}


function playRound(playerSelection,computerSelection){
    let roundAlert,roundMessage,playerScore,compScore;
    if (playerSelection == computerSelection){
        roundAlert = "Draw";
        roundMessage="";
        playerScore=0;
        compScore=0;
    } else if((playerSelection == "paper" && computerSelection=="scissors")||
       (playerSelection == "scissors" && computerSelection=="rock")||
       (playerSelection == "rock" && computerSelection=="paper")){
        roundAlert = `Round lost!`;
        roundMessage= `${computerSelection} beats ${playerSelection}`;
        playerScore = 0;
        compScore =1;
    } else if((playerSelection == "rock" && computerSelection== "scissors")||
       (playerSelection == "paper" && computerSelection=="rock")||
       (playerSelection == "scissors" && computerSelection=="paper")){
        roundAlert = `Round won!`; 
        roundMessage=`${computerSelection} beats ${playerSelection}`;
        playerScore =1;
        compScore =0;
    }
    return [roundAlert,roundMessage,playerScore,compScore];
}

function getComputerChoice(){
    let randomNumber = Math.floor(Math.random()*2);
    
    if (randomNumber ===0){
     return "rock"
     } else if (randomNumber ===1){
         return "paper";
     } else{
         return "scissors";
     }
}

function restartGame(){
    playerChoice.setAttribute('src',`./images/questionmark.jpg`);
    computerChoice.setAttribute('src',`./images/questionmark.jpg`);
    round =0;
    roundCount.textContent=`${round}`;
    playerTotal =0;
    compTotal = 0;
    roundAlert="";//update test to empyt
    roundMessage="";//update text to emepty
}


//Program initiation point
//Global variables 

let round =0;
let playerTotal =0;
let compTotal =0;

const weapons = document.querySelectorAll('#weapon');
weapons.forEach(button=>button.addEventListener('click',playMatch));

//UI node selectors
const playerScoreCard = document.querySelector('.score-player');
const playerChoice = document.querySelector('#playerChoice');
const computerScoreCard = document.querySelector('.score-cpu');
const computerChoice = document.querySelector('#computerChoice')
const roundCount = document.querySelector('.roundCount');
const roundAlert = document.querySelector('.roundAlert');
const roundMessage = document.querySelector('.roundMessage');
const message = document.querySelector('.message');