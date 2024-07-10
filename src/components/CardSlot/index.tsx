// components/CardSlot.tsx

import CardStack from '@/components/CardStack'
import { CardStack as CardStackType } from '@/types'
import styles from './CardSlot.module.scss'

interface CardSlotProps {
  stacks: CardStackType[]
  onCardDrag: (cardId: string) => void
  onCardDrop: (destinationId: string) => void
}

const CardSlot: React.FC<CardSlotProps> = ({ stacks, onCardDrag, onCardDrop }) => {
  return (
    <div className={styles.cardSlot}>
      {stacks.map((stack) => (
        <CardStack key={stack.id} stack={stack} onCardDrag={onCardDrag} onCardDrop={onCardDrop} />
      ))}
    </div>
  )
}

export default CardSlot
