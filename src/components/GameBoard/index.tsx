'use client'

import { dragCard, moveCard, setGameBoard } from '@/store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

import { CardGameLibrary } from '@/utils'
import CardSlot from '@/components/CardSlot'
import { RootState } from '@/store'
import { useEffect } from 'react'

const GameBoard = () => {
  const dispatch = useDispatch()
  //const selectedCardId = useSelector((state: RootState) => state.game.selectedCardId)
  const gameBoard = useSelector((state: RootState) => state.game.board)
  useEffect(() => {
    // Initialize the game board
    const board = CardGameLibrary.initializeGameBoard(
      [
        {
          id: 'slot-1',
          stacks: [
            {
              id: 'stack-1',
              cards: [],
              initialCards: 10,
              layout: {
                name: 'Tableau',
                description: 'Tableau stack',
                arrangement: 'stacked',
                direction: 'up',
                faceUp: true
              },
              behavior: {
                canDrag: true,
                canDrop: true,
                minimumCards: 0,
                maximumCards: 52
              }
            }
          ],
          layout: {
            name: 'Tableau',
            description: 'Tableau stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: true
          },
          behavior: {
            canDrag: true,
            canDrop: true,
            minimumCards: 0,
            maximumCards: 52
          }
        },
        {
          id: 'slot-2',
          stacks: [
            {
              id: 'stack-2',
              cards: [],
              layout: {
                name: 'Tableau',
                description: 'Tableau stack',
                arrangement: 'stacked',
                direction: 'up',
                faceUp: true
              },
              behavior: {
                canDrag: true,
                canDrop: true,
                minimumCards: 0,
                maximumCards: 52
              }
            },
            {
              id: 'stack-3',
              cards: [],
              layout: {
                name: 'Tableau',
                description: 'Tableau stack',
                arrangement: 'stacked',
                direction: 'up',
                faceUp: true
              },
              behavior: {
                canDrag: true,
                canDrop: true,
                minimumCards: 0,
                maximumCards: 52
              }
            }
          ],
          layout: {
            name: 'Tableau',
            description: 'Tableau stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: true
          },
          behavior: {
            canDrag: true,
            canDrop: true,
            minimumCards: 0,
            maximumCards: 52
          }
        }
      ],
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
