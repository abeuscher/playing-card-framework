import { Card, Outcome, Rank, Suit } from '@/types/'

/**
 * Class for evaluating poker hands and determining winners.
 */
export default class PokerHandEvaluator {
  /**
   * Counts the occurrences of each rank in a hand of cards.
   * @param cards An array of Card objects.
   * @returns A Map with Rank as key and count as value.
   */
  private static countRanks(cards: Card[]): Map<Rank, number> {
    return cards.reduce((counts, card) => {
      counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
      return counts;
    }, new Map<Rank, number>());
  }

  /**
   * Checks if the hand contains a flush (5 or more cards of the same suit).
   * @param cards An array of Card objects.
   * @returns True if the hand contains a flush, false otherwise.
   */
  private static isFlush(cards: Card[]): boolean {
    const suitCounts = cards.reduce((counts, card) => {
      counts.set(card.suit, (counts.get(card.suit) || 0) + 1);
      return counts;
    }, new Map<Suit, number>());

    return Array.from(suitCounts.values()).some(count => count >= 5);
  }

 /**
 * Checks if the hand contains a straight (5 consecutive ranks).
 * @param cards An array of Card objects.
 * @returns True if the hand contains a straight, false otherwise.
 */
private static isStraight(cards: Card[]): boolean {
  const ranks = cards.map(card => Object.values(Rank).indexOf(card.rank))
    .sort((a, b) => a - b);
  
  // Remove duplicates manually
  const uniqueRanks: number[] = [];
  for (const rank of ranks) {
    if (uniqueRanks.length === 0 || rank !== uniqueRanks[uniqueRanks.length - 1]) {
      uniqueRanks.push(rank);
    }
  }

  // Check for Ace-low straight
  if (uniqueRanks.includes(12)) { // 12 is Ace
    uniqueRanks.unshift(-1); // Add a low Ace at the beginning
  }

  for (let i = 0; i <= uniqueRanks.length - 5; i++) {
    const subset = uniqueRanks.slice(i, i + 5);
    if (subset.every((rank, index) => index === 0 || rank === subset[index - 1] + 1)) {
      return true;
    }
  }

  return false;
}

  /**
   * Checks if the hand contains a royal flush.
   * @param cards An array of Card objects.
   * @returns True if the hand contains a royal flush, false otherwise.
   */
  private static isRoyalFlush(cards: Card[]): boolean {
    const royalRanks = [Rank.Ten, Rank.Jack, Rank.Queen, Rank.King, Rank.Ace];
    
    return Object.values(Suit).some(suit => {
      const sameSuitCards = cards.filter(card => card.suit === suit);
      return sameSuitCards.length >= 5 && 
             royalRanks.every(rank => sameSuitCards.some(card => card.rank === rank));
    });
  }

  /**
   * Checks if the hand contains a straight flush.
   * @param cards An array of Card objects.
   * @returns True if the hand contains a straight flush, false otherwise.
   */
  private static isStraightFlush(cards: Card[]): boolean {
    return this.isFlush(cards) && this.isStraight(cards);
  }

  /**
   * Checks if the hand contains four of a kind.
   * @param cards An array of Card objects.
   * @returns True if the hand contains four of a kind, false otherwise.
   */
  private static isFourOfAKind(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards);
    return Array.from(rankCounts.values()).includes(4);
  }

  /**
   * Checks if the hand contains a full house.
   * @param cards An array of Card objects.
   * @returns True if the hand contains a full house, false otherwise.
   */
  private static isFullHouse(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards);
    const counts = Array.from(rankCounts.values());
    return counts.includes(3) && counts.includes(2) || 
           counts.filter(count => count >= 3).length >= 2;
  }

  /**
   * Checks if the hand contains three of a kind.
   * @param cards An array of Card objects.
   * @returns True if the hand contains three of a kind, false otherwise.
   */
  private static isThreeOfAKind(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards);
    return Array.from(rankCounts.values()).includes(3);
  }

  /**
   * Checks if the hand contains two pairs.
   * @param cards An array of Card objects.
   * @returns True if the hand contains two pairs, false otherwise.
   */
  private static isTwoPair(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards);
    return Array.from(rankCounts.values()).filter(count => count === 2).length === 2;
  }

  /**
   * Checks if the hand contains one pair.
   * @param cards An array of Card objects.
   * @returns True if the hand contains one pair, false otherwise.
   */
  private static isOnePair(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards);
    return Array.from(rankCounts.values()).includes(2) && 
           rankCounts.size === cards.length - 1;
  }

  /**
   * Checks if the hand is a high card hand.
   * @param cards An array of Card objects.
   * @returns Always returns true as all hands that don't match other categories are high card hands.
   */
  private static isHighCard(cards: Card[]): boolean {
    return true;
  }

  /**
   * Evaluates a poker hand.
   * @param cards An array of Card objects representing a poker hand.
   * @returns An object containing the name and rank of the hand.
   * @throws Error if the input array has fewer than 5 cards.
   */
  public static evaluateHand(cards: Card[]): { name: string; rank: number } {
    if (cards.length < 5) {
      throw new Error('Hand must contain at least 5 cards');
    }

    const handRankings: Array<{ check: (cards: Card[]) => boolean; name: string; rank: number }> = [
      { check: this.isRoyalFlush,    name: "Royal Flush",    rank: 10 },
      { check: this.isStraightFlush, name: "Straight Flush", rank: 9 },
      { check: this.isFourOfAKind,   name: "Four of a Kind", rank: 8 },
      { check: this.isFullHouse,     name: "Full House",     rank: 7 },
      { check: this.isFlush,         name: "Flush",          rank: 6 },
      { check: this.isStraight,      name: "Straight",       rank: 5 },
      { check: this.isThreeOfAKind,  name: "Three of a Kind",rank: 4 },
      { check: this.isTwoPair,       name: "Two Pair",       rank: 3 },
      { check: this.isOnePair,       name: "One Pair",       rank: 2 },
      { check: this.isHighCard,      name: "High Card",      rank: 1 }
    ];

    for (const { check, name, rank } of handRankings) {
      if (check.call(this, cards)) {
        return { name, rank };
      }
    }

    // This should never happen if all checks are implemented correctly
    throw new Error('Unable to evaluate hand');
  }

  /**
   * Determines the winner among multiple players.
   * @param players An array of player objects, each containing a player name and hand.
   * @returns An object containing the winner's name, hand name, hand rank, and whether it's a tie.
   * @throws Error if no players are provided.
   */
  public static evaluateWinner(players: Array<{ player: string; hand: Card[] }>): Outcome {
    if (players.length === 0) {
      throw new Error('At least one player is required');
    }

    let winners = [players[0]];
    let winningHand = this.evaluateHand(players[0].hand);

    for (let i = 1; i < players.length; i++) {
      const currentHand = this.evaluateHand(players[i].hand);

      if (currentHand.rank > winningHand.rank) {
        winners = [players[i]];
        winningHand = currentHand;
      } else if (currentHand.rank === winningHand.rank) {
        winners.push(players[i]);
      }
    }

    return {
      winner: winners.map(w => w.player).join(', '),
      handName: winningHand.name,
      handRank: winningHand.rank,
      isTie: winners.length > 1
    };
  }
}