import { Card, Rank, Suit } from '../types'

import PokerHandEvaluator from '../utils/pokerhandevaluator'

describe('PokerHandEvaluator', () => {
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
  })

  // Helper function to create a player's hand
  const createPlayerHand = (id: string, cards: Card[]): CardStack => ({
    id,
    cards,
    name: `Player ${id}`
  })

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
      ]

      const result = PokerHandEvaluator.evaluateWinner(players)

      expect(result.winners.length).toBe(1)
      expect(result.winners[0].id).toBe('2')
      expect(result.handName).toBe('Three of a Kind')
    })

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
      ]

      const result = PokerHandEvaluator.evaluateWinner(players)

      expect(result.winners.length).toBe(1)
      expect(result.winners[0].id).toBe('1')
      expect(result.handName).toBe('One Pair')
    })

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
      ]

      const result = PokerHandEvaluator.evaluateWinner(players)

      expect(result.winners.length).toBe(2)
      expect(result.winners.map((w) => w.id)).toEqual(expect.arrayContaining(['1', '2']))
      expect(result.handName).toBe('One Pair')
    })

    it('should throw an error when no players are provided', () => {
      expect(() => PokerHandEvaluator.evaluateWinner([])).toThrow('At least one player is required')
    })
  })
})

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
  })

  // Helper function to create a player's hand
  const createHand = (id: string, cards: Card[]): CardStack => ({
    id,
    cards,
    isHand: true,
    layout: { faceUp: true },
    rules: []
  })

  test('throws error when no players are provided', () => {
    expect(() => PokerHandEvaluator.evaluateWinner([])).toThrow('At least one player is required')
  })

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
    ]

    const result = PokerHandEvaluator.evaluateWinner(players)

    expect(result.winners.length).toBe(1)
    expect(result.winners[0].id).toBe('player1')
    expect(result.losers.length).toBe(1)
    expect(result.losers[0].id).toBe('player2')
    expect(result.handName).toBe('One Pair')
    expect(result.handRank).toBe(2)
  })

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
    ]

    const result = PokerHandEvaluator.evaluateWinner(players)

    expect(result.winners.length).toBe(2)
    expect(result.winners.map((w) => w.id)).toContain('player1')
    expect(result.winners.map((w) => w.id)).toContain('player2')
    expect(result.losers.length).toBe(0)
    expect(result.handName).toBe('One Pair')
    expect(result.handRank).toBe(2)
  })

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
    ]

    const result = PokerHandEvaluator.evaluateWinner(players)

    expect(result.hands.length).toBe(2)
    result.hands.forEach((hand) => {
      expect(hand.cards.length).toBe(5)
    })
  })

  test('correctly selects best five cards from a hand with three pairs', () => {
    const player = createHand('player1', [
      createCard(Rank.Ace, Suit.Hearts),
      createCard(Rank.Ace, Suit.Spades),
      createCard(Rank.King, Suit.Diamonds),
      createCard(Rank.King, Suit.Clubs),
      createCard(Rank.Queen, Suit.Hearts),
      createCard(Rank.Queen, Suit.Spades),
      createCard(Rank.Jack, Suit.Hearts)
    ])

    const result = PokerHandEvaluator.evaluateWinner([player])

    expect(result.hands[0].cards.length).toBe(5)
    expect(result.handName).toBe('Two Pair')
    expect(result.handRank).toBe(3)

    // Check that the best two pairs (Aces and Kings) and the highest kicker (Queen) are selected
    const selectedRanks = result.hands[0].cards.map((card) => card.rank)
    expect(selectedRanks).toContain(Rank.Ace)
    expect(selectedRanks).toContain(Rank.King)
    expect(selectedRanks).toContain(Rank.Queen)
    expect(selectedRanks.filter((rank) => rank === Rank.Ace).length).toBe(2)
    expect(selectedRanks.filter((rank) => rank === Rank.King).length).toBe(2)
  })

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
    ]

    const result = PokerHandEvaluator.evaluateWinner(players)

    expect(result.winners.length).toBe(1)
    expect(result.winners[0].id).toBe('player2')
    expect(result.handName).toBe('Three of a Kind')
    expect(result.handRank).toBe(4)
  })
  test('correctly handles a hand without four of a kind', () => {
    const hand = [
      createCard(Rank.Ace, Suit.Hearts),
      createCard(Rank.King, Suit.Spades),
      createCard(Rank.Queen, Suit.Diamonds),
      createCard(Rank.Jack, Suit.Clubs),
      createCard(Rank.Ten, Suit.Hearts)
    ]

    const result = (PokerHandEvaluator as any).getBestFourOfAKind(hand)

    expect(result.length).toBe(5)
    expect(result).toEqual(hand)
  })

  test('correctly handles a hand without a full house', () => {
    const hand = [
      createCard(Rank.Ace, Suit.Hearts),
      createCard(Rank.Ace, Suit.Spades),
      createCard(Rank.King, Suit.Diamonds),
      createCard(Rank.Queen, Suit.Clubs),
      createCard(Rank.Jack, Suit.Hearts)
    ]

    const result = (PokerHandEvaluator as any).getBestFullHouse(hand)

    expect(result.length).toBe(5)
    expect(result).toEqual(hand)
  })

  test('correctly selects best five cards for straight hands', () => {
    const players = [
      createHand('player1', [
        createCard(Rank.Six, Suit.Hearts),
        createCard(Rank.Seven, Suit.Spades),
        createCard(Rank.Eight, Suit.Diamonds),
        createCard(Rank.Nine, Suit.Clubs),
        createCard(Rank.Ten, Suit.Hearts),
        createCard(Rank.Jack, Suit.Spades),
        createCard(Rank.Queen, Suit.Diamonds)
      ]),
      createHand('player2', [
        createCard(Rank.Two, Suit.Hearts),
        createCard(Rank.Three, Suit.Spades),
        createCard(Rank.Four, Suit.Diamonds),
        createCard(Rank.Five, Suit.Clubs),
        createCard(Rank.Six, Suit.Hearts),
        createCard(Rank.King, Suit.Spades),
        createCard(Rank.Ace, Suit.Diamonds)
      ])
    ];
  
    const result = PokerHandEvaluator.evaluateWinner(players);
  
    expect(result.handName).toBe('Straight');
    expect(result.winners.length).toBe(1);
    expect(result.winners[0].id).toBe('player1');
    expect(result.hands.length).toBe(2);
    
    // Check winner's hand
    expect(result.hands[0].cards.length).toBe(5);
    expect(result.hands[0].cards.map(card => card.rank)).toEqual(
      expect.arrayContaining([Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen])
    );
    
    // Check loser's hand
    expect(result.hands[1].cards.length).toBe(5);
    expect(result.hands[1].cards.map(card => card.rank)).toEqual(
      expect.arrayContaining([Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six])
    );
  });
  test('correctly selects hands for all players when winner has a flush', () => {
    const players = [
      createHand('player1', [
        createCard(Rank.Two, Suit.Hearts),
        createCard(Rank.Five, Suit.Hearts),
        createCard(Rank.Eight, Suit.Hearts),
        createCard(Rank.Jack, Suit.Hearts),
        createCard(Rank.King, Suit.Hearts),
        createCard(Rank.Seven, Suit.Spades),
        createCard(Rank.Queen, Suit.Diamonds)
      ]),
      createHand('player2', [
        createCard(Rank.Two, Suit.Clubs),
        createCard(Rank.Three, Suit.Clubs),
        createCard(Rank.Jack, Suit.Diamonds),
        createCard(Rank.Queen, Suit.Spades),
        createCard(Rank.King, Suit.Clubs),
        createCard(Rank.Ace, Suit.Hearts)
      ])
    ];

    const result = PokerHandEvaluator.evaluateWinner(players);

    expect(result.handName).toBe('Flush');
    expect(result.winners.length).toBe(1);
    expect(result.winners[0].id).toBe('player1');
    expect(result.hands.length).toBe(2);
    
    // Check winner's hand (player1)
    expect(result.hands[0].id).toBe('player1');
    expect(result.hands[0].cards.length).toBe(5);
    expect(result.hands[0].cards.every(card => card.suit === Suit.Hearts)).toBe(true);
    
    // Check loser's hand (player2)
    expect(result.hands[1].id).toBe('player2');
    expect(result.hands[1].cards.length).toBe(5);
    // Expect the best 5 cards from player2's hand
    expect(result.hands[1].cards.map(card => card.rank)).toContain(Rank.Ace);
    expect(result.hands[1].cards.map(card => card.rank)).toContain(Rank.King);
  });

  test('correctly selects hands for all players when winner has a straight', () => {
    const players = [
      createHand('player1', [
        createCard(Rank.Six, Suit.Hearts),
        createCard(Rank.Seven, Suit.Spades),
        createCard(Rank.Eight, Suit.Diamonds),
        createCard(Rank.Nine, Suit.Clubs),
        createCard(Rank.Ten, Suit.Hearts),
        createCard(Rank.Two, Suit.Spades),
        createCard(Rank.Three, Suit.Diamonds)
      ]),
      createHand('player2', [
        createCard(Rank.Two, Suit.Clubs),
        createCard(Rank.Three, Suit.Hearts),
        createCard(Rank.Four, Suit.Diamonds),
        createCard(Rank.Jack, Suit.Clubs),
        createCard(Rank.Queen, Suit.Spades),
        createCard(Rank.King, Suit.Hearts)
      ])
    ];

    const result = PokerHandEvaluator.evaluateWinner(players);

    expect(result.handName).toBe('Straight');
    expect(result.winners.length).toBe(1);
    expect(result.winners[0].id).toBe('player1');
    expect(result.hands.length).toBe(2);
    
    // Check winner's hand (player1)
    expect(result.hands[0].id).toBe('player1');
    expect(result.hands[0].cards.length).toBe(5);
    expect(result.hands[0].cards.map(card => card.rank)).toEqual(expect.arrayContaining([Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten]));
    
    // Check loser's hand (player2)
    expect(result.hands[1].id).toBe('player2');
    expect(result.hands[1].cards.length).toBe(5);
    // Expect the best 5 cards from player2's hand
    expect(result.hands[1].cards.map(card => card.rank)).toContain(Rank.King);
    expect(result.hands[1].cards.map(card => card.rank)).toContain(Rank.Queen);
  });
})
