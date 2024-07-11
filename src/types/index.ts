// types.ts

import { init } from "next/dist/compiled/webpack/webpack"

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
  Ace: 'card-a',
  Two: 'card-2',
  Three: 'card-3',
  Four: 'card-4',
  Five: 'card-5',
  Six: 'card-6',
  Seven: 'card-7',
  Eight: 'card-8',
  Nine: 'card-9',
  Ten: 'card-10',
  Jack: 'card-j',
  Queen: 'card-q',
  King: 'card-k'
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
  layout: CardStackLayout
  behavior: CardStackBehavior  
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
