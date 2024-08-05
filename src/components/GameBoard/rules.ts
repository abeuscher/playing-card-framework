import { Deck } from '@/types/deck.ts';

class PokerEngine {
  constructor(numPlayers) {
    this.numPlayers = numPlayers;
    this.deck = new Deck(); // Assuming Deck class exists
    this.players = [];
    this.communityCards = [];
    this.pot = 0;
    this.currentPlayerIndex = 0;
    this.currentBet = 0;
  }

  initializeGame() {
    this.deck.shuffle();
    this.players = Array(this.numPlayers).fill().map(() => ({
      hand: [],
      chips: 1000, // Starting chips
      currentBet: 0,
      folded: false
    }));
    this.dealInitialCards();
  }

  dealInitialCards() {
    for (let i = 0; i < 2; i++) {
      this.players.forEach(player => {
        player.hand.push(this.deck.drawCard());
      });
    }
  }

  dealCommunityCards(count) {
    for (let i = 0; i < count; i++) {
      this.communityCards.push(this.deck.drawCard());
    }
  }

  placeBet(playerIndex, amount) {
    const player = this.players[playerIndex];
    if (player.chips >= amount) {
      player.chips -= amount;
      player.currentBet += amount;
      this.pot += amount;
      this.currentBet = Math.max(this.currentBet, player.currentBet);
      return true;
    }
    return false;
  }

  fold(playerIndex) {
    this.players[playerIndex].folded = true;
  }

  nextPlayer() {
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.numPlayers;
    } while (this.players[this.currentPlayerIndex].folded);
  }

  isRoundOver() {
    const activePlayers = this.players.filter(player => !player.folded);
    return activePlayers.every(player => player.currentBet === this.currentBet || player.chips === 0);
  }

  determineWinner() {
    // This is a placeholder. Implement actual hand comparison logic here.
    const activePlayers = this.players.filter(player => !player.folded);
    return activePlayers[Math.floor(Math.random() * activePlayers.length)];
  }

  resetRound() {
    this.communityCards = [];
    this.pot = 0;
    this.currentBet = 0;
    this.players.forEach(player => {
      player.hand = [];
      player.currentBet = 0;
      player.folded = false;
    });
    this.deck.reset();
    this.deck.shuffle();
  }
}

// Redux action creators
export const initializeGame = (numPlayers) => ({
  type: 'INITIALIZE_GAME',
  payload: numPlayers
});

export const placeBet = (playerIndex, amount) => ({
  type: 'PLACE_BET',
  payload: { playerIndex, amount }
});

export const fold = (playerIndex) => ({
  type: 'FOLD',
  payload: playerIndex
});

export const dealCommunityCards = (count) => ({
  type: 'DEAL_COMMUNITY_CARDS',
  payload: count
});

export const nextPlayer = () => ({
  type: 'NEXT_PLAYER'
});

export const determineWinner = () => ({
  type: 'DETERMINE_WINNER'
});

export const resetRound = () => ({
  type: 'RESET_ROUND'
});

// Redux reducer
const initialState = {
  engine: null
};

export const pokerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      const engine = new PokerEngine(action.payload);
      engine.initializeGame();
      return { ...state, engine };
    case 'PLACE_BET':
      state.engine.placeBet(action.payload.playerIndex, action.payload.amount);
      return { ...state };
    case 'FOLD':
      state.engine.fold(action.payload);
      return { ...state };
    case 'DEAL_COMMUNITY_CARDS':
      state.engine.dealCommunityCards(action.payload);
      return { ...state };
    case 'NEXT_PLAYER':
      state.engine.nextPlayer();
      return { ...state };
    case 'DETERMINE_WINNER':
      const winner = state.engine.determineWinner();
      return { ...state, winner };
    case 'RESET_ROUND':
      state.engine.resetRound();
      return { ...state };
    default:
      return state;
  }
};