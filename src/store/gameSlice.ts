import { GameBoard, GameState } from '@/types'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

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
      console.log('moveCard', state.selectedCardId, state.destinationStackId)
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
    },
    dragCard: (state, action: PayloadAction<{ cardId: string }>): void => {
      //console.log('dragCard', action.payload.cardId)
      state.selectedCardId = action.payload.cardId
    },
    setGameBoard: (state, action: PayloadAction<{ board: GameBoard }>) => {
      //console.log('setGameBoard', action.payload.board)
      state.board = action.payload.board
    }
  }
})

export const { initializeGame, moveCard, dragCard, setGameBoard } = gameSlice.actions
export default gameSlice.reducer
