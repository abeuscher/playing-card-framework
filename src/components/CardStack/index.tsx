// components/CardStack.tsx

import Card from '@/components/Card'
import { CardStack as CardStackType } from '@/types'
import styles from './CardStack.module.scss'
import { useDrop } from 'react-dnd'

interface CardStackProps {
  stack: CardStackType
  onCardDrag: (cardId: string) => void
  onCardDrop: (stackId: string) => void
}

const CardStack: React.FC<CardStackProps> = ({ stack, onCardDrag, onCardDrop }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'CARD',
      drop: () => {
        onCardDrop(stack.id)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }),
    [stack.id]
  )

  return dropRef(
    <div className={`${styles.cardStack} ${isOver && canDrop ? styles.highlight : ''}`}>
      {stack.cards.map((card) => (
        <Card key={card.id} card={card} onCardDrag={onCardDrag} draggable={true} />
      ))}
    </div>
  )
}

export default CardStack
