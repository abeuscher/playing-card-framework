import { GameBoard, GameState } from '@/types'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

import { CardGameLibrary } from '@/utils'

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
    initializeGame: (state, action: PayloadAction<{ board: GameBoard }>) => {
      const newBoard = CardGameLibrary.initializeGameBoard(action.payload.board, 1)
      state.board = newBoard
    },
    moveCard: (state, action: PayloadAction<{ destinationId: string }>) => {
      state.destinationStackId = action.payload.destinationId
      if (!state.selectedCardId || !state.destinationStackId) {
        return
      }
      const cardIndex = state.board.slots
        .map((slot) => slot.stacks)
        .flat()
        .find((stack) => stack.cards.some((card) => card.id === state.selectedCardId))
        ?.cards.findIndex((card) => card.id === state.selectedCardId)
      if (cardIndex !== -1) {
        const theCard = state.board.slots
          .map((slot) => slot.stacks)
          .flat()
          .find((stack) => stack.cards.some((card) => card.id === state.selectedCardId))
          ?.cards.pop()
        if (theCard) {
          state.board.slots
            .map((slot) => slot.stacks)
            .flat()
            .find((stack) => stack.id === state.destinationStackId)
            ?.cards.push(theCard)
        }
      }
       state.destinationStackId = ``
       state.selectedCardId = ``
    },
    dragCard: (state, action: PayloadAction<{ cardId: string }>): void => {
      state.selectedCardId = action.payload.cardId
    }
  }
})

export const { initializeGame, moveCard, dragCard } = gameSlice.actions
export default gameSlice.reducer
