import { GameBoard, GameState } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CardGameLibrary } from '@/utils'
import PokerHandEvaluator from '@/utils/pokerhandevaluator'

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

const findCard = (board: GameBoard, cardId: string) => {
  const slot =
    board.slots.find((slot) => {
      return slot.stacks.some((stack) => stack.cards.some((card) => card.id === cardId))
    }) || board.slots[0]
  const stack =
    slot?.stacks.find((stack) => stack.cards.some((card) => card.id === cardId)) || slot?.stacks[0]
  const card = stack?.cards.find((card) => card.id === cardId) || stack?.cards[0]
  return {
    slotIndex: board.slots.indexOf(slot),
    stackIndex: slot?.stacks.indexOf(stack),
    cardIndex: stack?.cards.indexOf(card)
  }
}

const findStack = (board: GameBoard, stackId: string) => {
  const slot =
    board.slots.find((slot) => {
      return slot.stacks.some((stack) => stack.id === stackId)
    }) || board.slots[0]
  const stack = slot?.stacks.find((stack) => stack.id === stackId) || slot?.stacks[0]
  return {
    destinationSlotIndex: board.slots.indexOf(slot),
    destinationStackIndex: slot?.stacks.indexOf(stack)
  }
}

const executeRule = (rule: string, card: any, stack: any) => {
  switch (rule) {
    case 'next':
      return CardGameLibrary.isNext(stack.cards, card)
    case 'previous':
      return CardGameLibrary.isPrevious(stack.cards, card)
    case 'sameSuit':
      return CardGameLibrary.isSameSuit(stack.cards, card)
    case 'sameRank':
      return CardGameLibrary.isSameRank(stack.cards, card)
    case 'alternateColor':
      return CardGameLibrary.isAlternateColor(stack.cards, card)
    default:
      return false
  }
}

const executeCardStackRules = (card: any, stack: any, rules: any[]) => {
  let result = true
  rules.forEach((rule: string) => {
    if (!executeRule(rule, card, stack)) {
      result = false
    }
  })
  return result
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (state, action: PayloadAction<{ board: any }>) => {
      state.board = CardGameLibrary.initializeGameBoard(action.payload.board)
    },
    moveCard: (state, action: PayloadAction<{ destinationId: string }>) => {
      state.destinationStackId = action.payload.destinationId
      if (!state.selectedCardId || !state.destinationStackId) {
        return
      }
      const { slotIndex, stackIndex, cardIndex } = findCard(state.board, state.selectedCardId)
      const { destinationSlotIndex, destinationStackIndex } = findStack(
        state.board,
        state.destinationStackId
      )
      if (
        !executeCardStackRules(
          state.board.slots[slotIndex].stacks[stackIndex].cards[cardIndex],
          state.board.slots[destinationSlotIndex].stacks[destinationStackIndex],
          state.board.slots[destinationSlotIndex].stacks[destinationStackIndex].rules
        )
      ) {
        state.destinationStackId = ``
        state.selectedCardId = ``
        return
      }
      const splicedCard = state.board.slots[slotIndex].stacks[stackIndex].cards.splice(cardIndex, 1)[0]
      const destinationStack = state.board.slots[destinationSlotIndex].stacks[destinationStackIndex]
      splicedCard.faceUp = destinationStack?.layout?.faceUp || false
      state.board.slots[destinationSlotIndex].stacks[destinationStackIndex].cards.push(splicedCard)
      state.destinationStackId = ``
      state.selectedCardId = ``
    },
    dragCard: (state, action: PayloadAction<{ cardId: string }>): void => {
      state.selectedCardId = action.payload.cardId
    },
    findPokerWinner: (state) => {
      const playerHand = {"player":"player", "hand":state.board.slots[2].stacks[0].cards }
      const opponentHand = {"player":"opponent", "hand":state.board.slots[0].stacks[0].cards }
      console.log(PokerHandEvaluator.evaluateWinner([playerHand, opponentHand]))
    }
  }
})

export const { initializeGame, moveCard, dragCard, findPokerWinner } = gameSlice.actions
export default gameSlice.reducer
