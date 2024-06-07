import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./Constants.js"
import {checkWinnerFrom, checkEndGame} from "./logic/board.js"
import {WinnerModal} from "./components/WinnerModal.jsx";
import { GameBoard } from "./components/GameBoard.jsx"
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  //null no hay ganador, false es empate
  const[winner, setWinner] = useState(null)


  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) =>{
    //No actualizamos esta posicion si ya esta ocupada
    if(board[index] || winner) return
    //Actualizar tablero
    const newBoard = [...board] //copiamos el contenido del state board actual a una nueva const
    newBoard[index] = turn //recibe x u o segun el indice recibido desde el handleClick
    setBoard(newBoard)
    //Cambiamos el turno
    const newTurn= turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //Revisar si hay un ganador 🎉
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)

      //alert(`El ganador es ${newWinner} `) // por el alert el ultimo movimiento no se muestra
      // el seteado del use state es asincrono
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar el juego</button>
      <GameBoard board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X} 
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
