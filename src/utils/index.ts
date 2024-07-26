import {
  Card,
  CardDeck,
  CardSlot,
  CardStackLayout,
  GameBoard,
  Rank,
  Suit
} from '@/types'

import { v4 as uuidv4 } from 'uuid'

export class CardGameLibrary {

  private static suitOrder = ['hearts', 'diamonds', 'clubs', 'spades'];
  
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

  public static dealCardsToSlots(deck: Card[], slots: CardSlot[]): void {
    let deckIndex = 0
    for (const slot of slots) {
      for (const stack of slot.stacks) {
        if (stack.initialCards) {
          for (let i = 0; i < stack.initialCards; i++) {
            if (deckIndex < deck.length) {
              deck[deckIndex].faceUp = stack.layout?.faceUp || false
              stack.cards.push(deck[deckIndex])
              deckIndex++
            }
          }
        }
      }
    }
  }

  public static initializeGameBoard(
    gameBoard: GameBoard,
    numberOfDecks: number = 1
  ): GameBoard {
    const decks = this.createDecks(numberOfDecks)

    for (const deck of decks) {
      this.shuffleDeck(deck.cards)
    }

    this.dealCardsToSlots(decks[0].cards, gameBoard.slots)
    return gameBoard
  }

  public static isNext(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true;
    const lastCard = cards[cards.length - 1];
    return Object.keys(Rank).indexOf(lastCard.rank) === Object.keys(Rank).indexOf(newCard.rank) - 1
  };
  
  public static isPrevious(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true;
    const lastCard = cards[cards.length - 1];
    return Object.keys(Rank).indexOf(lastCard.rank) === Object.keys(Rank).indexOf(newCard.rank) + 1
  };
  
  public static isSameSuit(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true;
    const lastCard = cards[cards.length - 1];
    console.log(lastCard.suit, newCard.suit)
    return lastCard.suit === newCard.suit;
  };
  
  public static isSameRank (cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true;
    const lastCard = cards[cards.length - 1];
    return lastCard.rank === newCard.rank;
  };
  
  public static isAlternateColor(cards: Card[], newCard: Card): boolean {
    if (cards.length === 0) return true;
    const lastCard = cards[cards.length - 1];
    const isRed = (suit: string) => suit === 'hearts' || suit === 'diamonds';
    return isRed(lastCard.suit.toLowerCase()) !== isRed(newCard.suit.toLowerCase());
  };

}
