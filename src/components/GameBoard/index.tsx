'use client'

import React, { useEffect } from 'react'

import CardSlot from '@/components/CardSlot'
import FoundationColumn from '@/components/FoundationColumn'
import TableauColumn from '@/components/TableauColumn'
import { initializeGame } from '@/store/gameSlice'
import styles from '@/components/GameBoard/gameBoard.module.scss'
import { useDispatch } from 'react-redux'
import useGameState from '@/hooks/useGameState'

const GameBoard = () => {
  const dispatch = useDispatch()
  const { player, opponent, tableauLeft, tableauRight, foundationLeft, foundationRight } =
    useGameState()

  useEffect(() => {
    dispatch(initializeGame())
  }, [dispatch])

  return (
    <div className={styles.gameBoard}>
      <div className={styles.grid}>
        {/* Opponent's Area */}
        <div className={styles.playerArea}>
          <CardSlot
            key={'opponent-reserve'}
            slotId={'opponent-reserve'}
            cards={opponent.reserve.cards}
            faceDown={false}
          />
          <CardSlot
            key={'opponent-waste'}
            slotId={'opponent-waste'}
            cards={opponent.waste.cards}
            faceDown={false}
          />
          <CardSlot
            key={'opponent-hand'}
            slotId={'opponent-hand'}
            cards={opponent.hand.cards}
            faceDown={true}
          />
        </div>
        <div className={styles.playArea}>
          <TableauColumn columnId={'tableau-left'} columns={tableauLeft.columns} />
          <FoundationColumn columnId={'foundation-left'} columns={foundationLeft.columns} />
          <FoundationColumn columnId={'foundation-right'} columns={foundationRight.columns} />
          <TableauColumn columnId={'tableau-right'} columns={tableauRight.columns} />
        </div>
        {/* Player's Area */}
        <div className={styles.playerArea}>
          <CardSlot
            key={'player-reserve'}
            slotId={'player-reserve'}
            cards={player.reserve.cards}
            faceDown={false}
          />
          <CardSlot
            key={'player-waste'}
            slotId={'player-waste'}
            cards={player.waste.cards}
            faceDown={false}
          />
          <CardSlot
            key={'player-hand'}
            slotId={'player-hand'}
            cards={player.hand.cards}
            faceDown={true}
          />
        </div>
      </div>
    </div>
  )
}

export default GameBoard
