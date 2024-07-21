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
          initialCards: 0,
          order: 'ascending',
          rules: ['next','sameSuit'],
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: false
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
          order: 'descending',
          rules: ['previous'],
          layout: {
            name: 'Tableau',
            description: 'Tableau stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: true
          },
        },
        {
          id: 'draw-pile',
          cards: new Array(),
          initialCards: 0,
          order: 'ascending',
          rules: ['sameRank'],
          layout: {
            name: 'Stack',
            description: 'stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: false
          },
        }
      ]
    },
    {
      id: 'player-slot',
      stacks: [
        {
          id: 'player-hand',
          cards: new Array(),
          initialCards: 32,
          order: 'ascending',
          rules: [],
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: false
          },
        }
      ]
    }
  ]
}
