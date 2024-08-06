import { GameBoard } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const BasicLayout: GameBoard = {
  id: `board-${uuidv4()}`,
  slots: [
    {
      id: 'opponent-slot',
      title: 'Opponent',
      stacks: [
        {
          id: 'opponent-hand',
          cards: new Array(),
          initialCards: 7,
          order: 'ascending',
          rules: [],
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: true
          }
        }
      ]
    },
    {
      id: 'play-area',
      stacks: [
        {
          id: 'draw-pile',
          cards: new Array(),
          initialCards: 38,
          order: 'ascending',
          rules: [],
          layout: {
            name: 'Stack',
            description: 'Draw Pile',
            arrangement: 'stacked',
            direction: 'down',
            faceUp: false
          },
        },
        {
          id: 'discard-pile',
          cards: new Array(),
          initialCards: 0,
          order: 'ascending',
          rules: [],
          layout: {
            name: 'Stack',
            description: 'stack',
            arrangement: 'stacked',
            direction: 'up',
            faceUp: true
          },
        }
      ]
    },
    {
      id: 'player-slot',
      title: 'Player',
      stacks: [
        {
          id: 'player-hand',
          cards: new Array(),
          initialCards: 7,
          order: 'ascending',
          rules: [],
          layout: {
            name: 'Hand',
            description: 'Left to right',
            arrangement: 'spread',
            direction: 'right',
            faceUp: true
          },
        }
      ]
    }
  ]
}
