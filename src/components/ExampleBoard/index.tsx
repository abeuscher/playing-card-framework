'use client'

// Example usage in a parent component

import React, { useState } from 'react'

import CardStack from '@/components/CardStack'
import { CardStack as CardStackType } from '@/types'

const initialStack: CardStackType = {
  id: 'stack-1',
  cards: [
    { id: '1', suit: 'Hearts', rank: '6', faceUp: true },
    { id: '2', suit: 'Diamonds', rank: 'King', faceUp: false }
  ]
}
const secondInitialStack: CardStackType = {
  id: 'stack-2',
  cards: [{ id: '1', suit: 'Hearts', rank: '7', faceUp: true }]
}

const Example: React.FC = () => {
  const [stack, setStack] = useState<CardStackType>(initialStack)
  const [secondStack, setSecondStack] = useState<CardStackType>(secondInitialStack)

  const handleCardClick = (cardId: string) => {
    // Handle card click
    console.log('Card clicked:', cardId)
  }

  const handleCardDrop = (cardId: string, stackId: string) => {
    // Handle card drop
    console.log('Card dropped:', cardId, 'into stack:', stackId)
  }

  return (
    <div className="app">
      <CardStack stack={stack} onCardClick={handleCardClick} onCardDrop={handleCardDrop} />
      <CardStack stack={secondStack} onCardClick={handleCardClick} onCardDrop={handleCardDrop} />
    </div>
  )
}

export default Example
