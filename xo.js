let playerO = true;
let playerX = false;
let gameMode= '2-player';

let board = ['', '', '', '', '', '','', '', ''];
let winner= {
  w1: [0,1,2],
  w2: [0,3,6],
  w3: [0,4,8],

  w4: [1,4,7],
  w5: [2,5,8],
  w6: [3,4,5],
  w7: [2,4,6],
  w8: [6,7,8],
};

const boxes = document.querySelectorAll('.box1');

document.querySelector('.js-restart-game-button')
  .addEventListener('click', restart);

document.querySelector('.js-2-player-button')
  .addEventListener('click',()=>{
    gameMode = '2-player';
    restart();
    document.querySelector('.js-mode')
      .innerHTML = `Mode: 2-Players`;
  });
document.querySelector('.js-play-with-computer-button')
  .addEventListener('click', ()=>{
    gameMode = 'computer';
    restart();
    document.querySelector('.js-mode')
      .innerHTML = `Mode: play with bot`;
  });


boxes.forEach((box, index) =>{
  box.addEventListener('click', handleClick);
})

function stopTheGame(){
  boxes.forEach((box, index) =>{
    box.removeEventListener('click', handleClick);
  });
}

function handleClick(e){
  const index = [...boxes].indexOf(e.target);
  mark(e, index);
}

function restart(){
 playerO = true;
 playerX = false;

 board = ['', '', '', '', '', '','', '', ''];
 boxes.forEach(box=>{
  box.innerHTML = '';
  box.addEventListener('click', handleClick);
 })
 document.querySelector('.js-result').innerHTML = 'Result: ...';

}

function mark(e, i){
  // e is just an event, so we have to use e.target
  // can't play if the box has already been played
  if(e.target.innerHTML != '') return;

  // switch turn between playerO and playerX
  if(playerO){
    e.target.innerHTML = '⭕';
    playerO = false;
    playerX = true;
  }else if(playerX){
    e.target.innerHTML = '❌';
    playerO = true;
    playerX = false;
  }
  board[i] = e.target.innerHTML;
  const {winnerFound, playerWin} = win(board, i);
  // check if there's a winner
  if(winnerFound){
    document.querySelector('.js-result').innerHTML = `Result: ${playerWin} is the winner!`;
    stopTheGame();
  }else if(!board.includes('')){
    document.querySelector('.js-result').innerHTML = 'Result: Tie';
  }else if (gameMode === "computer" && playerX) {
    setTimeout(() => {
      playWithComputer();
    }, 400);
  }

}

function playWithComputer(){
  const emptyIndex = [];
  board.forEach((values, index) =>{
    if(values ===''){
      emptyIndex.push(index)
    } 
  })
  if(emptyIndex.length === 0)   return;
  const randomIndex = emptyIndex[Math.floor(Math.random()*emptyIndex.length)];
  const computerClick = {
    target: boxes[randomIndex]
  };
  mark(computerClick, randomIndex);
}

function win(board, i){
  let winnerFound = false;
  let playerWin   = '';
  for(const pattern of Object.values(winner)){
    if(pattern.includes(i)){
      winnerFound = (board[pattern[0]] !== '')
                    && (board[pattern[0]] === board[pattern[1]] 
                    && board[pattern[0]] === board[pattern[2]]) ;
        console.log(winnerFound);
        if(winnerFound){
          playerWin = board[pattern[0]];
          break;
        }
    }
  }
  return {winnerFound, playerWin};
}

