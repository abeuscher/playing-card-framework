import { Card, Rank, Suit } from '../types';

import PokerHandEvaluator from '../utils/pokerhandevaluator';

describe('PokerHandEvaluator', () => {
    // Helper function to create a card
    const createCard = (rank: Rank, suit: Suit): Card => ({
      rank, suit, id: '', faceUp: false, deckId: '',
      isSelectable: false, isSelected: false, isDraggable: false
    });
  
    // Helper function to create a player's hand
    const createPlayerHand = (id: string, cards: Card[]): CardStack => ({
      id, cards, name: `Player ${id}`
    });
  
    describe('evaluateWinner', () => {
      it('should correctly identify the winner with different hand ranks', () => {
        const players = [
          createPlayerHand('1', [
            createCard(Rank.Ace, Suit.Hearts),
            createCard(Rank.Ace, Suit.Spades),
            createCard(Rank.King, Suit.Diamonds),
            createCard(Rank.Queen, Suit.Clubs),
            createCard(Rank.Jack, Suit.Hearts)
          ]),
          createPlayerHand('2', [
            createCard(Rank.King, Suit.Hearts),
            createCard(Rank.King, Suit.Spades),
            createCard(Rank.King, Suit.Diamonds),
            createCard(Rank.Queen, Suit.Clubs),
            createCard(Rank.Jack, Suit.Hearts)
          ])
        ];
  
        const result = PokerHandEvaluator.evaluateWinner(players);
  
        expect(result.winners.length).toBe(1);
        expect(result.winners[0].id).toBe('2');
        expect(result.handName).toBe('Three of a Kind');
      });
  
      it('should correctly break ties', () => {
        const players = [
          createPlayerHand('1', [
            createCard(Rank.Ace, Suit.Hearts),
            createCard(Rank.Ace, Suit.Spades),
            createCard(Rank.King, Suit.Diamonds),
            createCard(Rank.Queen, Suit.Clubs),
            createCard(Rank.Jack, Suit.Hearts)
          ]),
          createPlayerHand('2', [
            createCard(Rank.Ace, Suit.Clubs),
            createCard(Rank.Ace, Suit.Diamonds),
            createCard(Rank.King, Suit.Hearts),
            createCard(Rank.Queen, Suit.Spades),
            createCard(Rank.Ten, Suit.Hearts)
          ])
        ];
  
        const result = PokerHandEvaluator.evaluateWinner(players);
  
        expect(result.winners.length).toBe(1);
        expect(result.winners[0].id).toBe('1');
        expect(result.handName).toBe('One Pair');
      });
  
      it('should handle multiple winners', () => {
        const players = [
          createPlayerHand('1', [
            createCard(Rank.Ace, Suit.Hearts),
            createCard(Rank.Ace, Suit.Spades),
            createCard(Rank.King, Suit.Diamonds),
            createCard(Rank.Queen, Suit.Clubs),
            createCard(Rank.Jack, Suit.Hearts)
          ]),
          createPlayerHand('2', [
            createCard(Rank.Ace, Suit.Clubs),
            createCard(Rank.Ace, Suit.Diamonds),
            createCard(Rank.King, Suit.Hearts),
            createCard(Rank.Queen, Suit.Spades),
            createCard(Rank.Jack, Suit.Clubs)
          ])
        ];
  
        const result = PokerHandEvaluator.evaluateWinner(players);
  
        expect(result.winners.length).toBe(2);
        expect(result.winners.map(w => w.id)).toEqual(expect.arrayContaining(['1', '2']));
        expect(result.handName).toBe('One Pair');
      });
  
      it('should throw an error when no players are provided', () => {
        expect(() => PokerHandEvaluator.evaluateWinner([])).toThrow('At least one player is required');
      });
    });
  });

describe('PokerHandEvaluator.evaluateWinner', () => {
    // Helper function to create a card
    const createCard = (rank: Rank, suit: Suit): Card => ({
      rank,
      suit,
      id: '',
      faceUp: false,
      deckId: '',
      isSelectable: false,
      isSelected: false,
      isDraggable: false
    });
  
    // Helper function to create a player's hand
    const createHand = (id: string, cards: Card[]): CardStack => ({
      id,
      cards,
      isHand: true,
      layout: { faceUp: true },
      rules: []
    });
  
    test('throws error when no players are provided', () => {
      expect(() => PokerHandEvaluator.evaluateWinner([])).toThrow('At least one player is required');
    });
  
    test('correctly identifies a single winner', () => {
      const players = [
        createHand('player1', [
          createCard(Rank.Ace, Suit.Hearts),
          createCard(Rank.Ace, Suit.Spades),
          createCard(Rank.King, Suit.Diamonds),
          createCard(Rank.Queen, Suit.Clubs),
          createCard(Rank.Jack, Suit.Hearts)
        ]),
        createHand('player2', [
          createCard(Rank.King, Suit.Hearts),
          createCard(Rank.King, Suit.Spades),
          createCard(Rank.Ten, Suit.Diamonds),
          createCard(Rank.Nine, Suit.Clubs),
          createCard(Rank.Eight, Suit.Hearts)
        ])
      ];
  
      const result = PokerHandEvaluator.evaluateWinner(players);
  
      expect(result.winners.length).toBe(1);
      expect(result.winners[0].id).toBe('player1');
      expect(result.losers.length).toBe(1);
      expect(result.losers[0].id).toBe('player2');
      expect(result.handName).toBe('One Pair');
      expect(result.handRank).toBe(2);
    });
  
    test('correctly identifies a tie', () => {
      const players = [
        createHand('player1', [
          createCard(Rank.Ace, Suit.Hearts),
          createCard(Rank.Ace, Suit.Spades),
          createCard(Rank.King, Suit.Diamonds),
          createCard(Rank.Queen, Suit.Clubs),
          createCard(Rank.Jack, Suit.Hearts)
        ]),
        createHand('player2', [
          createCard(Rank.Ace, Suit.Diamonds),
          createCard(Rank.Ace, Suit.Clubs),
          createCard(Rank.King, Suit.Hearts),
          createCard(Rank.Queen, Suit.Spades),
          createCard(Rank.Jack, Suit.Diamonds)
        ])
      ];
  
      const result = PokerHandEvaluator.evaluateWinner(players);
  
      expect(result.winners.length).toBe(2);
      expect(result.winners.map(w => w.id)).toContain('player1');
      expect(result.winners.map(w => w.id)).toContain('player2');
      expect(result.losers.length).toBe(0);
      expect(result.handName).toBe('One Pair');
      expect(result.handRank).toBe(2);
    });
  
    test('correctly selects best five cards for each player', () => {
      const players = [
        createHand('player1', [
          createCard(Rank.Ace, Suit.Hearts),
          createCard(Rank.Ace, Suit.Spades),
          createCard(Rank.King, Suit.Diamonds),
          createCard(Rank.Queen, Suit.Clubs),
          createCard(Rank.Jack, Suit.Hearts),
          createCard(Rank.Ten, Suit.Spades),
          createCard(Rank.Nine, Suit.Diamonds)
        ]),
        createHand('player2', [
          createCard(Rank.King, Suit.Hearts),
          createCard(Rank.King, Suit.Spades),
          createCard(Rank.Ten, Suit.Diamonds),
          createCard(Rank.Nine, Suit.Clubs),
          createCard(Rank.Eight, Suit.Hearts),
          createCard(Rank.Seven, Suit.Spades),
          createCard(Rank.Six, Suit.Diamonds)
        ])
      ];
  
      const result = PokerHandEvaluator.evaluateWinner(players);
  
      expect(result.hands.length).toBe(2);
      result.hands.forEach(hand => {
        expect(hand.cards.length).toBe(5);
      });
    });

    test('correctly selects best five cards from a hand with three pairs', () => {
        const player = createHand('player1', [
          createCard(Rank.Ace, Suit.Hearts),
          createCard(Rank.Ace, Suit.Spades),
          createCard(Rank.King, Suit.Diamonds),
          createCard(Rank.King, Suit.Clubs),
          createCard(Rank.Queen, Suit.Hearts),
          createCard(Rank.Queen, Suit.Spades),
          createCard(Rank.Jack, Suit.Hearts)
        ]);
      
        const result = PokerHandEvaluator.evaluateWinner([player]);
      
        expect(result.hands[0].cards.length).toBe(5);
        expect(result.handName).toBe('Two Pair');
        expect(result.handRank).toBe(3);
        
        // Check that the best two pairs (Aces and Kings) and the highest kicker (Queen) are selected
        const selectedRanks = result.hands[0].cards.map(card => card.rank);
        expect(selectedRanks).toContain(Rank.Ace);
        expect(selectedRanks).toContain(Rank.King);
        expect(selectedRanks).toContain(Rank.Queen);
        expect(selectedRanks.filter(rank => rank === Rank.Ace).length).toBe(2);
        expect(selectedRanks.filter(rank => rank === Rank.King).length).toBe(2);
      });
      
      test('correctly compares two pair against three of a kind', () => {
        const players = [
          createHand('player1', [
            createCard(Rank.Ace, Suit.Hearts),
            createCard(Rank.Ace, Suit.Spades),
            createCard(Rank.King, Suit.Diamonds),
            createCard(Rank.King, Suit.Clubs),
            createCard(Rank.Queen, Suit.Hearts)
          ]),
          createHand('player2', [
            createCard(Rank.Queen, Suit.Diamonds),
            createCard(Rank.Queen, Suit.Clubs),
            createCard(Rank.Queen, Suit.Spades),
            createCard(Rank.Jack, Suit.Hearts),
            createCard(Rank.Ten, Suit.Hearts)
          ])
        ];
      
        const result = PokerHandEvaluator.evaluateWinner(players);
      
        expect(result.winners.length).toBe(1);
        expect(result.winners[0].id).toBe('player2');
        expect(result.handName).toBe('Three of a Kind');
        expect(result.handRank).toBe(4);
      });
  });