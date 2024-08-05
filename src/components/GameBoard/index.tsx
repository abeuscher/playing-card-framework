'use client'

import { dragCard, findPokerWinner, initializeGame, moveCard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

import { BasicLayout } from './layout'
import CardSlot from '@/components/CardSlot'
import { RootState } from '@/store'
import styles from '@/components/GameBoard/GameBoard.module.scss'

const GameBoard = () => {
  const initRef = useRef(false)
  const dispatch = useDispatch()
  const gameBoard = useSelector((state: RootState) => state.game.board)
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true

      const initGame = async () => {
        await dispatch(initializeGame({ board: JSON.parse(JSON.stringify(BasicLayout)) }))
        dispatch(findPokerWinner())
      }

      initGame()
    }
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
