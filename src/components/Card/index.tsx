// components/Card.tsx

import { CardClassMap, Card as CardType } from '@/types'

import { dragCard } from '@/store/gameSlice'
import styles from './Card.module.scss'
import { useDrag } from 'react-dnd'

interface CardProps {
  card: CardType
  onCardDrag: () => void
  draggable?: boolean
}

const Card: React.FC<CardProps> = ({ card, onCardDrag, draggable }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { id: card.id },
      canDrag: draggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        onCardDrag({ cardId: card.id })
      }
    }),
    [draggable]
  )

  const getCardClass = (card: CardType) => {
    const suitClass = styles[`card-${card.suit.toLowerCase()}`]
    const rankClass = styles[CardClassMap[card.rank]]
    const faceClass = card.faceUp ? '' : styles['card-facedown']
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass}`
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
