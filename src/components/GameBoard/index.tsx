'use client'

import { CardSlotType, GameBoard as GameBoardType } from '@/types'
import { dragCard, moveCard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { CardGameLibrary } from '@/utils'
import CardSlot from '@/components/CardSlot'
import { RootState } from '@/store'

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState<null | GameBoardType>(null)
  const dispatch = useDispatch()
  const selectedCardId = useSelector((state: RootState) => state.game.selectedCardId)

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
  const onCardDrop = (destinationId: string) => {
    console.log('onCardDrop', destinationId)
    dispatch(moveCard({ destinationId: destinationId }))
  }
  const onCardDrag = (cardId: string) => {
    console.log('onCardDrag', cardId)
    dispatch(dragCard({ cardId: cardId }))
  }
  return (
    <div className="game-board">
      {gameBoard.slots &&
        gameBoard.slots.map((slot) => (
          <div key={slot.id} className="card-slot">
            <CardSlot stacks={slot.stacks} onCardDrag={onCardDrag} onCardDrop={onCardDrop} />
          </div>
        ))}
    </div>
  )
}

export default GameBoard
