// components/Card.tsx

import { CardClassMap, Card as CardType } from '@/types'

import styles from './Card.module.scss'
import { useDrag } from 'react-dnd'

interface CardProps {
  card: CardType
  onCardDrag: (cardId: string) => void
  draggable?: boolean
}

const Card: React.FC<CardProps> = ({ card, onCardDrag, draggable }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: () => {
      onCardDrag(card.id)
      return { cardId: card.id }
    },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const getCardClass = (card: CardType) => {
    const suitClass = styles[`card-${card.suit.toLowerCase()}`]
    const rankClass = styles[CardClassMap[card.rank]]
    const faceClass = card.faceUp ? '' : styles['card-facedown']
    const hoverClass = isDragging ? styles['card-hover'] : ''
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass} ${hoverClass}`
  }
  const CardComponent = () => (
    <div className={getCardClass(card)}>
      <span></span>
    </div>
  )
  return draggable ? (
    dragRef(
      <div>
        <CardComponent />
      </div>
    )
  ) : (
    <div>
      <CardComponent />
    </div>
  )
}

export default Card
