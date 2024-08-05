import { Card, Rank } from '@/types/'

export default class PokerHandEvaluator {
  private static countRanks(cards: Card[]): Map<Rank, number> {
    const rankCounts = new Map<Rank, number>()
    cards.forEach((card) => {
      rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1)
    })
    return rankCounts
  }

  private static isFlush(cards: Card[]): boolean {
    return cards.every((card) => card.suit === cards[0].suit)
  }

  private static isStraight(cards: Card[]): boolean {
    const ranks = cards.map((card) => Object.values(Rank).indexOf(card.rank)).sort((a, b) => a - b)
    return ranks.every((rank, index) => index === 0 || rank === ranks[index - 1] + 1)
  }

  private static isRoyalFlush(cards: Card[]): boolean {
    return (
      this.isFlush(cards) &&
      this.isStraight(cards) &&
      cards.some((card) => card.rank === Rank.Ace) &&
      cards.some((card) => card.rank === Rank.King)
    )
  }

  private static isStraightFlush(cards: Card[]): boolean {
    return this.isFlush(cards) && this.isStraight(cards)
  }

  private static isFourOfAKind(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards)
    return Array.from(rankCounts.values()).includes(4)
  }

  private static isFullHouse(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards)
    return rankCounts.size === 2 && Array.from(rankCounts.values()).includes(3)
  }

  private static isThreeOfAKind(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards)
    return Array.from(rankCounts.values()).includes(3)
  }

  private static isTwoPair(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards)
    return (
      rankCounts.size === 3 &&
      Array.from(rankCounts.values()).filter((count) => count === 2).length === 2
    )
  }

  private static isOnePair(cards: Card[]): boolean {
    const rankCounts = this.countRanks(cards)
    return rankCounts.size === 4
  }

  private static isHighCard(cards: Card[]): boolean {
    return this.countRanks(cards).size === 5 && !this.isFlush(cards) && !this.isStraight(cards)
  }

  public static evaluateHand(cards: Card[]): { name: string; rank: number } {
    if (cards.length !== 5) {
      throw new Error('Input must be exactly 5 cards')
    }

    const handRankings: Array<{ check: (cards: Card[]) => boolean; name: string; rank: number }> = [
      { check: (cards) => this.isRoyalFlush(cards),    name: "Royal Flush",    rank: 10 },
      { check: (cards) => this.isStraightFlush(cards), name: "Straight Flush", rank: 9 },
      { check: (cards) => this.isFourOfAKind(cards),   name: "Four of a Kind", rank: 8 },
      { check: (cards) => this.isFullHouse(cards),     name: "Full House",     rank: 7 },
      { check: (cards) => this.isFlush(cards),         name: "Flush",          rank: 6 },
      { check: (cards) => this.isStraight(cards),      name: "Straight",       rank: 5 },
      { check: (cards) => this.isThreeOfAKind(cards),  name: "Three of a Kind",rank: 4 },
      { check: (cards) => this.isTwoPair(cards),       name: "Two Pair",       rank: 3 },
      { check: (cards) => this.isOnePair(cards),       name: "One Pair",       rank: 2 },
      { check: (cards) => this.isHighCard(cards),      name: "High Card",      rank: 1 }
    ];

    for (const { check, name, rank } of handRankings) {
      if (check(cards)) {
        return { name, rank }
      }
    }

    // This should never happen if all checks are implemented correctly
    throw new Error('Unable to evaluate hand')
  }

  public static evaluateWinner(players: Array<{ player: string; hand: Card[] }>): {
    winner: string
    handName: string
    handRank: number
  } {
    if (players.length === 0) {
      throw new Error('At least one player is required')
    }

    let winningPlayer = players[0].player
    let winningHand = this.evaluateHand(players[0].hand)
    let winningHandRank = winningHand.rank

    for (let i = 1; i < players.length; i++) {
      const currentPlayer = players[i].player
      const currentHand = this.evaluateHand(players[i].hand)

      if (currentHand.rank > winningHandRank) {
        winningPlayer = currentPlayer
        winningHand = currentHand
        winningHandRank = currentHand.rank
      }
      // In case of a tie, we're keeping the first player as the winner
      // You might want to implement a tie-breaking logic here
    }

    return {
      winner: winningPlayer,
      handName: winningHand.name,
      handRank: winningHand.rank
    }
  }
}
