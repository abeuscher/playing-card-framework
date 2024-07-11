// cardLibrary.ts

import { Card, CardDeck, CardSlot, CardSlotType, CardStack, CardStackBehavior, CardStackLayout, GameBoard, Rank, Suit } from '@/types'

import { v4 as uuidv4 } from 'uuid';

export class CardGameLibrary {
  private static generateDeck(id: number): CardDeck {
    const deck: CardDeck = { id: `deck-${id}-${uuidv4()}`, cards: [], className: 'red' }
    const suits = Object.values(Suit)
    const ranks = Object.values(Rank)

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.cards.push({
          id: `${rank}-${suit}-${uuidv4()}`,
          suit,
          rank,
          faceUp: true,
          deckId: deck.id
        })
      }
    }
    return deck
  }
  public static createDefaultCardStackLayout(): CardStackLayout {
    return {
      name: 'CardStack',
      description: 'Default Card Stack',
      arrangement: 'stacked',
      direction: 'up',
      faceUp: true
    };
  }

  public static createDefaultCardStackBehavior(): CardStackBehavior {
    return {
      canDrag: true,
      canDrop: true,
      minimumCards: 0,
      maximumCards: Infinity
    };
  }
  public static createDecks(numberOfDecks: number = 1): CardDeck[] {
    let decks: CardDeck[] = []
    for (let i = 0; i < numberOfDecks; i++) {
      decks.push(this.generateDeck(i))
    }
    return decks
  }

  public static shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  public static createCardStack(cards: Card[]): CardStack {
    return {
      id: `stack-${uuidv4()}`,
      cards,
      layout: this.createDefaultCardStackLayout(),
      behavior: this.createDefaultCardStackBehavior()
    }
  }

  public static createCardSlot(type: CardSlotType, stack: CardStack): CardSlot {
    return {
      id: `slot-${uuidv4()}`,
      type,
      stacks: [stack]
    }
  }

  public static dealCardsToSlots(deck: Card[], slots: CardSlot[], cardsPerSlot: number): void {
    let deckIndex = 0
    for (const slot of slots) {
      for (let i = 0; i < cardsPerSlot; i++) {
        if (deckIndex < deck.length) {
          slot.stacks[0].cards.push(deck[deckIndex])
          deckIndex++
        }
      }
    }
  }

  public static initializeGameBoard(
    slotTypes: CardSlotType[],
    cardsPerSlot: number,
    numberOfDecks: number = 1
  ): GameBoard {
    const decks = this.createDecks(numberOfDecks)
    for (const deck of decks) {
      this.shuffleDeck(deck.cards)
    }

    const slots: CardSlot[] = slotTypes.map((type) =>
      this.createCardSlot(type, this.createCardStack([]))
    )

    this.dealCardsToSlots(decks[0].cards, slots, cardsPerSlot)

    return {
      id: `board-${uuidv4()}`,
      slots,
    }
  }
}
