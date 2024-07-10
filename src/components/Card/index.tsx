// components/Card.tsx

import { Card as CardType } from '@/types'
import React from 'react'
import styles from './Card.module.scss'
import { useDrag } from 'react-dnd'

interface CardProps {
  card: CardType
  onClick: () => void
  onDrop: (event: React.DragEvent) => void
  draggable?: boolean
}

const Card: React.FC<CardProps> = ({ card, onClick, onDrop, draggable }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { id: card.id },
      canDrag: draggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [draggable]
  )

  const getCardClass = (card: CardType) => {
    console.log('Card:', card)
    const suitClass = styles[`card-${card.suit.toLowerCase()}`]
    const rankClass = styles[`card-${card.rank.charAt(0).toLowerCase()}`]
    const faceClass = card.faceUp ? '' : styles['card-facedown']
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass}`
  }
  const CardComponent = () => (
    <div className={getCardClass(card)} onClick={onClick} onDrop={onDrop}>
      <span></span>
    </div>
  )
  return draggable ? dragRef(<CardComponent />) : <CardComponent />
}

export default Card
