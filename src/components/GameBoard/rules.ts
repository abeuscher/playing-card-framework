import { GameBoard } from "@/types";
type GameMove = {
    action: string;
    card: string;
    source: string;
    destination: string;
}
type GameTurn = {
    moves: GameMove[];
    player: string;
}
class PokerGame {
    humanPlayer: { hand: never[]; tableau: never[][]; stock: never[]; reserve: never[]; };
    computerPlayer: { hand: never[]; tableau: never[][]; stock: never[]; reserve: never[]; };
    gameBoard: { id: string; slots: never[]; };
    gameHistory: { turns: GameTurn[]; };
    constructor() {
      this.humanPlayer = {
        hand: [],
        tableau: Array(4).fill().map(() => []),
        stock: [],
        reserve: []
      };
      
      this.computerPlayer = {
        hand: [],
        tableau: Array(4).fill().map(() => []),
        stock: [],
        reserve: []
      };
      this.gameBoard = {
        id: 'board-1',
        slots: []
      }
        this.gameHistory = {
            turns: []
        }
    }