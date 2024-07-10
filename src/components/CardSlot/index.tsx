// components/CardSlot.tsx

import CardStack from './CardStack';
import { CardStack as CardStackType } from '@/types';
import React from 'react';
import styles from './CardSlot.module.scss';

interface CardSlotProps {
  stacks: CardStackType[];
  onCardClick: (cardId: string) => void;
  onCardDrop: (cardId: string, stackId: string) => void;
}

const CardSlot: React.FC<CardSlotProps> = ({ stacks, onCardClick, onCardDrop }) => {
  return (
    <div className={styles.cardSlot}>
      {stacks.map((stack) => (
        <CardStack
          key={stack.id}
          stack={stack}
          onCardClick={onCardClick}
          onCardDrop={onCardDrop}
        />
      ))}
    </div>
  );
};

export default CardSlot;
