import { CardStack, GameBoard, GameState, Outcome } from '@/types'
import { GetState, PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CardGameLibrary } from '@/utils'
import PokerHandEvaluator from '@/utils/pokerhandevaluator'

const initialState: GameState = {
  board: {
    id: 'board-1',
    slots: []
  },
  playerHands: [],
  history: [],
  currentTurn: 0,
  selectedCardId: null,
  destinationStackId: null,
  outcome: {} as Outcome,
  message: null
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
      for (const slot of state.board.slots) {
        for (const stack of slot.stacks) {
          if (stack.isHand) {
            state.playerHands.push(stack)
          }
        }
      }
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
      const splicedCard = state.board.slots[slotIndex].stacks[stackIndex].cards.splice(
        cardIndex,
        1
      )[0]
      const destinationStack = state.board.slots[destinationSlotIndex].stacks[destinationStackIndex]
      splicedCard.faceUp = destinationStack?.layout?.faceUp || false
      state.board.slots[destinationSlotIndex].stacks[destinationStackIndex].cards.push(splicedCard)
      state.destinationStackId = ``
      state.selectedCardId = ``
    },
    dragCard: (state, action: PayloadAction<{ cardId: string }>): void => {
      state.selectedCardId = action.payload.cardId
    },
    dealCard: (
      state,
      action: PayloadAction<{ sourceStack: string; destinationStack: string; numCards: number }>
    ): void => {
      const { destinationStack, sourceStack, numCards } = action.payload
      const { destinationSlotIndex, destinationStackIndex } = findStack(
        state.board,
        destinationStack
      )
      const { slotIndex, stackIndex, cardIndex } = findCard(state.board, sourceStack)
      const splicedCards = state.board.slots[slotIndex].stacks[stackIndex].cards.splice(
        cardIndex,
        numCards
      )
      const destinationStackObj =
        state.board.slots[destinationSlotIndex].stacks[destinationStackIndex]
      splicedCards.map((card: any) => {
        card.faceUp = destinationStackObj?.layout?.faceUp || false
      })
      state.board.slots[destinationSlotIndex].stacks[destinationStackIndex].cards.concat(
        splicedCards
      )
    },
    findPokerWinner: (state) => {
      const stateCopy = JSON.parse(JSON.stringify(state))
      console.log(stateCopy)
      state.outcome = PokerHandEvaluator.evaluateWinner(state.playerHands)
      state.outcome.hands.map((hand) => {
        hand.forEach((card: any) => {
          if (state.playerHands) {
            state.playerHands.map((playerHand, handIdx) => {
              playerHand.cards.map((playerCard, cardIdx) => {
                if (playerCard.id === card.id) {
                  state.playerHands[handIdx].cards[cardIdx].isSelected = true
                }
              })
            })
          }
        })
      })
    },
    toggleCardSelection: (state, action: PayloadAction<{ stackId: string; cardId: string }>) => {
      const playerHand = state.playerHands.find((hand) => hand.id === action.payload.stackId)
      const card = playerHand?.cards.find((c) => c.id === action.payload.cardId)
      if (card) {
        card.isSelected = !card.isSelected
      }
    }
  }
})

export const { initializeGame, moveCard, dragCard, findPokerWinner, toggleCardSelection } =
  gameSlice.actions
export default gameSlice.reducer
