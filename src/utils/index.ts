import { Card, CardSlot, GameBoard, Rank, Suit } from '@/types'

import {CardDeck} from '../types/deck'
import { v4 as uuidv4 } from 'uuid'

export class CardGameLibrary {
  private static suitOrder = Object.keys(Suit)
  private static rankOrder = Object.keys(Rank)
  public static dealCardsToSlots(deck: CardDeck, slots: CardSlot[]): void {
    for (const slot of slots) {
      for (const stack of slot.stacks) {
        if (stack.initialCards) {
          for (let i = 0; i < stack.initialCards; i++) {
            const thisCard = deck.drawCard()
            if (thisCard) {
              thisCard.faceUp = stack.layout?.faceUp || false
              stack.cards.push(thisCard)
            }
          }
        }
      }
    }
  }
  public static initializeGameBoard(gameBoard: GameBoard): GameBoard {
    const deck = new CardDeck(`deck-${uuidv4()}`, 'red')
    deck.shuffle()
    this.dealCardsToSlots(deck, gameBoard.slots)
    return gameBoard
  }

  public static isNext(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true
    const lastCard = cards[cards.length - 1]
    return Object.keys(Rank).indexOf(lastCard.rank) === Object.keys(Rank).indexOf(newCard.rank) - 1
  }

  public static isPrevious(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true
    const lastCard = cards[cards.length - 1]
    return Object.keys(Rank).indexOf(lastCard.rank) === Object.keys(Rank).indexOf(newCard.rank) + 1
  }

  public static isSameSuit(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true
    const lastCard = cards[cards.length - 1]
    console.log(lastCard.suit, newCard.suit)
    return lastCard.suit === newCard.suit
  }

  public static isSameRank(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true
    const lastCard = cards[cards.length - 1]
    return lastCard.rank === newCard.rank
  }

  public static isAlternateColor(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true
    const lastCard = cards[cards.length - 1]
    const isRed = (suit: string) => suit === 'hearts' || suit === 'diamonds'
    return isRed(lastCard.suit.toLowerCase()) !== isRed(newCard.suit.toLowerCase())
  }
}
