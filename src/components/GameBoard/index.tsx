'use client'

import { CardSlotType, GameBoard as GameBoardType } from '@/types'
import { useEffect, useState } from 'react'

import { CardGameLibrary } from '@/utils'
import CardSlot from '@/components/CardSlot'

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState<null | GameBoardType>(null)

  useEffect(() => {
    // Initialize the game board
    const board = CardGameLibrary.initializeGameBoard(
      [CardSlotType.Deck, CardSlotType.Foundation, CardSlotType.Tableau],
      5,
      1
    )
    setGameBoard(board)
  }, [])

  if (!gameBoard) {
    return <div>Loading...</div>
  }

  return (
    <div className="game-board">
      {gameBoard.slots &&
        gameBoard.slots.map((slot) => (
          <div key={slot.id} className="card-slot">
            <CardSlot stacks={slot.stacks} onCardClick={() => {}} onCardDrop={() => {}} />
          </div>
        ))}
    </div>
  )
}

export default GameBoard
