//Function declaraions
playMatch = function (e){
    let  roundAlert,roundMessage, playerScore, compScore, playerSelection,computerSelection;

    round++;
    playerSelection = e.target.className;
    computerSelection = getComputerChoice();
    updateInfo(playerSelection,computerSelection);
    [roundAlert,roundMessage, playerScore, compScore] = playRound(playerSelection, computerSelection);
    updateTotal(playerScore,compScore);
    updateMessage(roundAlert,roundMessage,compScore,playerScore);

    let finalVerdict = ((playerTotal==5)? "YOU WIN!!!":compTotal==5? "YOU LOSE!!!":"");

    if (playerTotal==5 || compTotal==5){
        alert(`Game Over. ${finalVerdict}\nPlayer:${playerTotal}\nComputer:${compTotal}`);
        restartGame();
        return;
    }
}

function updateInfo(playerSelection,computerSelection){
    playerChoice.setAttribute('src',`./images/${playerSelection}.png`);
    setTimeout(()=>{
        computerChoice.setAttribute('src',`./images/${computerSelection}.png`); 
    },500);//plays loop.gif for 0.5secs before computers choice
    computerChoice.setAttribute('src',`./images/loop.gif`); 

    roundCount.textContent=`${round}`;
}

function updateMessage(roundAlert,roundMessage,compScore,playerScore){
    verdict.textContent=`${roundAlert}`;
    verdictInfo.textContent=`${roundMessage}`;
    if (compScore>playerScore){
        message.setAttribute("class","message lost");
    }else{
        message.setAttribute("class","message");
    }
}

function updateTotal(playerScore,compScore){
    if(playerScore>compScore){
        playerTotal+=1;
    }else if(compScore>playerScore){
        compTotal+=1;
    }

    computerScoreCard.textContent=`C.P.U: ${compTotal}`;
    playerScoreCard.textContent=`PLAYER: ${playerTotal}`;
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
        roundMessage=`${playerSelection} beats ${computerSelection}`;
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
    setTimeout(()=>{
        computerChoice.setAttribute('src',`./images/questionmark.jpg`); 
    },40);
    round =0;
    roundCount.textContent=`${round}`;
    playerTotal =0;
    compTotal = 0;
    computerScoreCard.textContent=`C.P.U: ${compTotal}`;
    playerScoreCard.textContent=`PLAYER: ${playerTotal}`;
    verdict.textContent="";
    verdictInfo.textContent="";
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
const computerChoice = document.querySelector('#computerChoice');
const roundCount = document.querySelector('.roundCount');
const verdict = document.querySelector('.roundAlert');
const verdictInfo= document.querySelector('.roundMessage');
const message = document.querySelector('.message');