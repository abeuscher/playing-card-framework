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
    const hoverClass = isDragging ? styles['card-hover'] : styles['card-nohover']
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass} ${hoverClass}`
  }
  const wrapperClass = isDragging ? styles['card-wrapper-dragging'] : styles['card-wrapper']
  const CardComponent = () => (
    <div className={getCardClass(card)}>
      <span></span>
    </div>
  )
  const ImageComponent = () =>
    card.faceUp ? (
      <Image
        className={getCardClass(card)}
        src={`/images/svg/${CardClassMap[card.rank]}${card.suit.charAt(0).toLowerCase()}.svg`}
        alt={`${CardClassMap[card.rank]} of ${card.suit.charAt(0).toLowerCase()}`}
        title={`${CardClassMap[card.rank]} of ${card.suit.charAt(0).toLowerCase()}`}
        width={100}
        height={150}
      />
    ) : (
      <Image
        className={getCardClass(card)}
        src={`/images/svg/b.svg`}
        alt="Card Back"
        width={100}
        height={150}
      />
    )

  return draggable ? (
    dragRef(
      <div className={wrapperClass}>
        {card.faceUp ? (
          <Image
            className={getCardClass(card)}
            src={`/images/svg/${CardClassMap[card.rank]}${card.suit.charAt(0).toLowerCase()}.svg`}
            alt={`${card.rank} of ${card.suit}`}
            title={`${card.rank} of ${card.suit}`}
            width={100}
            height={150}
          />
        ) : (
          <Image
            className={getCardClass(card)}
            src={`/images/svg/b.svg`}
            alt="Card Back"
            width={100}
            height={150}
          />
        )}
      </div>
    )
  ) : (
    <div>
      {card.faceUp ? (
        <Image
          className={getCardClass(card)}
          src={`/images/svg/${CardClassMap[card.rank]}${card.suit.charAt(0).toLowerCase()}.svg`}
          alt={`${CardClassMap[card.rank]} of ${card.suit.charAt(0).toLowerCase()}`}
          width={100}
          height={150}
        />
      ) : (
        <Image
          className={getCardClass(card)}
          src={`/images/svg/b.svg`}
          alt="Card Back"
          width={100}
          height={150}
        />
      )}
    </div>
  )
}

export default Card
