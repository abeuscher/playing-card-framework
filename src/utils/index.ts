// cardLibrary.ts

import { Card, CardDeck, CardSlot, CardSlotType, CardStack, GameBoard, Rank, Suit } from '@/types'

export class CardGameLibrary {
  private static generateDeck(id: number): CardDeck {
    const deck: CardDeck = { id: `deck-${id}-${Math.random()}`, cards: [], className: 'red' }
    const suits = Object.values(Suit)
    const ranks = Object.values(Rank)

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.cards.push({
          id: `${rank}-${suit}-${Math.random()}`,
          suit,
          rank,
          faceUp: true,
          deckId: deck.id
        })
      }
    }
    return deck
  }

  public static createDecks(numberOfDecks: number = 1): CardDecks[] {
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
      id: `stack-${Date.now()}-${Math.random()}`,
      cards
    }
  }

  public static createCardSlot(type: CardSlotType, stack: CardStack): CardSlot {
    return {
      id: `slot-${Date.now()}-${Math.random()}`,
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
      id: `board-${Date.now()}-${Math.random()}`,
      slots
    }
  }
}
