// Enum for suit and rank of playing cards
export enum Suit {
  Spades = 'Spades',
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs'
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
  isSelectable: boolean
  isSelected: boolean
  isDraggable: boolean
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
  name: string
  description: string
  arrangement: 'stacked' | 'spread' | 'fan' 
  direction: 'left' | 'right' | 'up' | 'down'
  faceUp: boolean
  selectable: boolean
  draggable: boolean
}

// Interface for a card stack
export interface CardStack {
  id: string
  cards: Card[]
  initialCards?: number
  order: 'ascending' | 'descending'
  rules: string[]
  isHand: boolean
  layout?: CardStackLayout
}

// Interface for a card slot on the game board
export interface CardSlot {
  id: string
  title?: string
  stacks: CardStack[]
}

// Interface for the game board
export interface GameBoard {
  id: string
  slots: CardSlot[]
}

export interface GameState {
  board: GameBoard;
  playerHands: CardStack[];
  history: any[]; // Assuming this is defined elsewhere
  currentTurn: number;
  selectedCardId: string | null;
  destinationStackId: string | null;
  outcome: Outcome; // Assuming Outcome is defined elsewhere
  message: string | null;
}


export type Outcome = {
  winners: Array<CardStack>;
  losers: Array<CardStack>;
  handName: string;
  handRank: number;
  hands: Array<any>;
};

export interface MessageBox {
  message: string;
  type: 'info' | 'warning' | 'error';
  duration: number;
}