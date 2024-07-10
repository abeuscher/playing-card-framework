// components/Card.tsx

import { Card as CardType } from '@/types';
import React from 'react';
import styles from './Card.module.scss';
import { useDrag } from 'react-dnd';

interface CardProps {
  card: CardType;
  onClick: () => void;
  onDrop: (event: React.DragEvent) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick, onDrop }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { id: card.id },
      canDrag: card.draggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [card.draggable]
  );

  const getCardClass = (card: CardType) => {
    console.log('Card:', card)
    const suitClass = styles[`card-${card.suit.toLowerCase()}`];
    const rankClass = styles[`card-${card.rank.toLowerCase()}`];
    const faceClass = card.faceUp ? '' : styles['card-facedown'];
    return `${styles.card} ${suitClass} ${rankClass} ${faceClass}`;
  };

  return (
    <div
      ref={card.draggable ? dragRef : null}
      className={getCardClass(card)}
      onClick={onClick}
      onDrop={onDrop}
    >
      <span></span>
    </div>
  );
};

export default Card;
