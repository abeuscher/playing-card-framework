import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { GameState } from '@/types'

const initialState: GameState = {
  board: {
    id: 'board-1',
    slots: []
  },
  history: [],
  currentTurn: 0,
  selectedCardId: null,
  destinationStackId: null
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (state) => {
      console.log('Game Init')
    },
    moveCard: (state, action: PayloadAction<{ destinationId: string }>) => {
      state.destinationStackId = action.payload.destinationId
    },
    dragCard: (state, action: PayloadAction<{ cardId: string }>): void => {
      state.selectedCardId = action.payload.cardId
      const cardStack = state.board.slots
        .map((slot) => slot.stacks)
        .flat()
        .find((stack) => stack.cards.some((card) => card.id === action.payload.cardId))
      if (cardStack) {
        if (cardStack.cards.length === 0) {
          return
        }
        cardStack.cards.slice(
          cardStack.cards.findIndex((card) => card.id === action.payload.cardId),
          1
        )
        const destinationStack = state.board.slots
          .map((slot) => slot.stacks)
          .flat()
          .find((stack) => stack.id === state.destinationStackId)
        if (destinationStack) {
          destinationStack.cards.push(cardStack.cards[0])
        }
      }
    }
  }
})

export const { initializeGame, moveCard, dragCard } = gameSlice.actions
export default gameSlice.reducer
