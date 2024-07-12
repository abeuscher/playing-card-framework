import { GameBoard } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const BasicLayout: GameBoard = {
  id: `board-${uuidv4()}`,
  slots: [
    {
      id: 'opponent-slot',
      stacks: [
        {
          id: 'opponent-hand',
          cards: new Array(),
          initialCards: 2,
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: false
          },
          behavior: {
            canDrag: true,
            canDrop: true,
            minimumCards: 0,
            maximumCards: 52
          }
        }
      ]
    },
    {
      id: 'play-area',
      stacks: [
        {
          id: 'discard-pile',
          cards: new Array(),
          initialCards: 0,
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
          id: 'draw-pile',
          cards: new Array(),
          initialCards: 0,
          layout: {
            name: 'Stack',
            description: 'stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: false
          },
          behavior: {
            canDrag: true,
            canDrop: true,
            minimumCards: 0,
            maximumCards: 52
          }
        }
      ]
    },
    {
      id: 'player-slot',
      stacks: [
        {
          id: 'player-hand',
          cards: new Array(),
          initialCards: 2,
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: false
          },
          behavior: {
            canDrag: true,
            canDrop: true,
            minimumCards: 0,
            maximumCards: 52
          }
        }
      ]
    }
  ]
}
