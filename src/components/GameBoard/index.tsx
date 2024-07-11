'use client'

import { dragCard, moveCard, setGameBoard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

import { CardGameLibrary } from '@/utils'
import CardSlot from '@/components/CardSlot'
import { CardSlotType } from '@/types'
import { RootState } from '@/store'
import { useEffect } from 'react'

const GameBoard = () => {
  const dispatch = useDispatch()
  //const selectedCardId = useSelector((state: RootState) => state.game.selectedCardId)
  const gameBoard = useSelector((state: RootState) => state.game.board)
  useEffect(() => {
    // Initialize the game board
    const board = CardGameLibrary.initializeGameBoard(
      [CardSlotType.Deck, CardSlotType.Foundation, CardSlotType.Tableau],
      2,
      1
    )
    dispatch(setGameBoard({ board }))
  }, [dispatch])

  if (!gameBoard) {
    return <div>Loading...</div>
  }
  const onCardDrop = (destinationId: string) => {
    //console.log('onCardDrop', destinationId)
    dispatch(moveCard({ destinationId: destinationId }))
  }
  const onCardDrag = (cardId: string) => {
    //console.log('onCardDrag', cardId)
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
