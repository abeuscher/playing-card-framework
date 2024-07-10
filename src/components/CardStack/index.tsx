// components/CardStack.tsx

import { CardStack as CardStackType, Card as CardType } from '@/types';

import Card from '@/components/Card';
import styles from './CardStack.module.scss';
import { useDrop } from 'react-dnd';

interface CardStackProps {
  stack: CardStackType;
  onCardClick: (cardId: string) => void;
  onCardDrop: (cardId: string, stackId: string) => void;
}

const CardStack: React.FC<CardStackProps> = ({ stack, onCardClick, onCardDrop }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: { id: string }) => {
      onCardDrop(item.id, stack.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [stack.id]);

  return (
    <div ref={dropRef} className={`${styles.cardStack} ${isOver && canDrop ? styles.highlight : ''}`}>
      {stack.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardStack;
