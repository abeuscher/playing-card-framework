// types.ts

// Enum for suit and rank of playing cards
export enum Suit {
    Hearts = 'Hearts',
    Diamonds = 'Diamonds',
    Clubs = 'Clubs',
    Spades = 'Spades',
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
    King = 'King',
  }
  
  // Interface for a playing card
  export interface Card {
    id: string;
    suit: Suit;
    rank: Rank;
    faceUp: boolean;
  }
  
  // Interface for a card stack
  export interface CardStack {
    id: string;
    cards: Card[];
  }
  
  // Enum for different types of card slots on the game board
  export enum CardSlotType {
    Deck = 'Deck',
    DiscardPile = 'DiscardPile',
    Foundation = 'Foundation',
    Tableau = 'Tableau',
  }
  
  // Interface for a card slot on the game board
  export interface CardSlot {
    id: string;
    type: CardSlotType;
    stack: CardStack;
  }
  
  // Interface for the game board
  export interface GameBoard {
    id: string;
    slots: CardSlot[];
  }
  
  // Interface for the game state
  export interface GameState {
    board: GameBoard;
    history: GameBoard[];
    currentTurn: number;
  }
  
  // Function types for game actions
  export type MoveCardFunction = (fromSlotId: string, toSlotId: string, cardId: string) => void;
  export type FlipCardFunction = (cardId: string) => void;
  export type ShuffleDeckFunction = (deckId: string) => void;
  
  // Interface for the game context
  export interface GameContext {
    state: GameState;
    moveCard: MoveCardFunction;
    flipCard: FlipCardFunction;
    shuffleDeck: ShuffleDeckFunction;
  }
  
  // Optional: Type for player actions if multiplayer is considered
  export interface PlayerAction {
    playerId: string;
    actionType: 'move' | 'flip' | 'shuffle';
    payload: any;
  }
  