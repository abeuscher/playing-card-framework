// cardLibrary.ts

import { Card, CardSlot, CardSlotType, CardStack, GameBoard, Rank, Suit } from '@/types';

export class CardGameLibrary {
  private static generateDeck(): Card[] {
    const deck: Card[] = [];
    const suits = Object.values(Suit);
    const ranks = Object.values(Rank);
    
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          id: `${rank}-${suit}`,
          suit,
          rank,
          faceUp: false,
        });
      }
    }
    return deck;
  }

  public static createDecks(numberOfDecks: number = 1): Card[] {
    let decks: Card[] = [];
    for (let i = 0; i < numberOfDecks; i++) {
      decks = decks.concat(this.generateDeck());
    }
    return decks;
  }

  public static shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  public static createCardStack(cards: Card[]): CardStack {
    return {
      id: `stack-${Date.now()}-${Math.random()}`,
      cards,
    };
  }

  public static createCardSlot(type: CardSlotType, stack: CardStack): CardSlot {
    return {
      id: `slot-${Date.now()}-${Math.random()}`,
      type,
      stack,
    };
  }

  public static dealCardsToSlots(deck: Card[], slots: CardSlot[], cardsPerSlot: number): void {
    let deckIndex = 0;
    for (const slot of slots) {
      for (let i = 0; i < cardsPerSlot; i++) {
        if (deckIndex < deck.length) {
          slot.stack.cards.push(deck[deckIndex]);
          deckIndex++;
        }
      }
    }
  }

  public static initializeGameBoard(slotTypes: CardSlotType[], cardsPerSlot: number, numberOfDecks: number = 1): GameBoard {
    const deck = this.createDecks(numberOfDecks);
    const shuffledDeck = this.shuffleDeck(deck);
    
    const slots: CardSlot[] = slotTypes.map(type => this.createCardSlot(type, this.createCardStack([])));
    
    this.dealCardsToSlots(shuffledDeck, slots, cardsPerSlot);
    
    return {
      id: `board-${Date.now()}-${Math.random()}`,
      slots,
    };
  }
}
/*
// Usage example
const gameBoard = CardGameLibrary.initializeGameBoard(
  [CardSlotType.Deck, CardSlotType.Foundation, CardSlotType.Tableau],
  5,
  1
);

console.log(gameBoard);
*/