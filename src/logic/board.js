import { WINNER_COMBOS } from "../Constants"
export const checkWinnerFrom = (boardToCheck)=>{
    //Se revisa todas las combinaciones ganadoras x u o
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    //Si no hay winner
    return null
  }

export const checkEndGame= (newBoard) =>{
    //revisamos si no hay espacios vacios en 
    // el array gameboard y eso nos dira que es empate

    //newBoard  = [x, o, x, null, x ...]
    return newBoard.every((square)=> square !== null)
  }