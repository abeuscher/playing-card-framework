// components/Card.tsx

import { CardClassMap, Card as CardType } from '@/types'

import Image from 'next/image'
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
    const rankClass = styles[`card-${CardClassMap[card.rank]}`]
    const faceClass = card.faceUp ? '' : styles['card-facedown']
    const hoverClass = isDragging ? styles['card-hover'] : ''
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass} ${hoverClass}`
  }
  const CardComponent = () => (
    <div className={getCardClass(card)}>
      <span></span>
    </div>
  )
  const ImageComponent = () => (
    <Image
      className={styles['card-hover']}
      src={`/images/svg/${CardClassMap[card.rank]}${card.suit.charAt(0).toLowerCase()}.svg`}
      alt={`${CardClassMap[card.rank]} of ${card.suit.charAt(0).toLowerCase()}`}
      width={100}
      height={150}
    />
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
