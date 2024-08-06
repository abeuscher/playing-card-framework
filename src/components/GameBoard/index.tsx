'use client'

import { dragCard, findPokerWinner, initializeGame, moveCard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

import { BasicLayout } from './layout'
import CardSlot from '@/components/CardSlot'
import MessageBox from '@/components/MessageBox'
import { RootState } from '@/store'
import { setMessageWithExpiration } from '@/store/message'
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
        await dispatch(findPokerWinner())
      }

      initGame()
    }
  }, [dispatch])
  const outcome = useSelector((state: RootState) => state.game.outcome)
  useEffect(() => {
    dispatch(
      setMessageWithExpiration({
        message: outcome?.winner
          ? `Winner: ${outcome.winner} with ${outcome.handName}`
          : 'Game started',
        type: 'info',
        duration: 10000 // 15 seconds
      }) as any
    )
  }, [dispatch, outcome])
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
            <CardSlot
              title={slot.title}
              stacks={slot.stacks}
              onCardDrag={onCardDrag}
              onCardDrop={onCardDrop}
            />
          </div>
        ))}
      <MessageBox />
    </div>
  )
}

export default GameBoard
