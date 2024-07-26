'use client'

import { dragCard, initializeGame, moveCard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

import { BasicLayout } from './layout'
import CardSlot from '@/components/CardSlot'
import { RootState } from '@/store'
import styles from '@/components/GameBoard/GameBoard.module.scss'
import { useEffect } from 'react'

const GameBoard = () => {
  const dispatch = useDispatch()
  const gameBoard = useSelector((state: RootState) => state.game.board)
  useEffect(() => {
    dispatch(initializeGame({ board: JSON.parse(JSON.stringify(BasicLayout)) }))
  }, [dispatch])

  if (!gameBoard) {
    return <div>Loading...</div>
  }
  const onCardDrop = (destinationId: string) => {
    dispatch(moveCard({ destinationId: destinationId }))
  }
  const onCardDrag = (cardId: string) => {
    dispatch(dragCard({ cardId: cardId }))
  }
  return (
    <div className={styles['game-board']}>
      {gameBoard.slots &&
        gameBoard.slots.map((slot) => (
          <div key={slot.id} className={styles['card-slot']}>
            <CardSlot stacks={slot.stacks} onCardDrag={onCardDrag} onCardDrop={onCardDrop} />
          </div>
        ))}
    </div>
  )
}

export default GameBoard
