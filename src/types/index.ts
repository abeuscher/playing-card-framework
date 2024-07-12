// types.ts

// Enum for suit and rank of playing cards
export enum Suit {
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Spades = 'Spades'
}

export enum Rank {
  Ace = 'Ace',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King'
}

export interface Card {
  id: string
  suit: Suit
  rank: Rank
  faceUp: boolean
  deckId: string
}

export type CardDeck = {
  id: string
  className: string
  cards: Card[]
}

export const CardClassMap = {
  Ace: 'a',
  Two: '2',
  Three: '3',
  Four: '4',
  Five: '5',
  Six: '6',
  Seven: '7',
  Eight: '8',
  Nine: '9',
  Ten: '10',
  Jack: 'j',
  Queen: 'q',
  King: 'k'
}

export interface CardStackLayout {
  name: string // e.g. 'Tableau'
  description: string // e.g. 'Tableau stack'
  arrangement: 'stacked' | 'spread' | 'fan' 
  direction: 'left' | 'right' | 'up' | 'down'
  faceUp: boolean
}

export interface CardStackBehavior {
  canDrag: boolean
  canDrop: boolean
  minimumCards: number
  maximumCards: number
}

// Interface for a card stack
export interface CardStack {
  id: string
  cards: Card[]
  initialCards?: number
  layout?: CardStackLayout
  behavior?: CardStackBehavior
}

// Interface for a card slot on the game board
export interface CardSlot {
  id: string
  stacks: CardStack[]
}

// Interface for the game board
export interface GameBoard {
  id: string
  slots: CardSlot[]
}

// Interface for the game state
export interface GameState {
  board: GameBoard
  history: GameBoard[]
  currentTurn: number
  selectedCardId: string | null
  destinationStackId: string | null
}
